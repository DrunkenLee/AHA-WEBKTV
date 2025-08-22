using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace AHAKTVPLAYER
{
    public partial class Form1 : Form
    {
        private string uniqueId = "ORDER0013_1755620061577_CC3AM9"; // Ganti dengan uniqueId room Anda
        private string lastPlayedPath = null;
        private int currentVolume = 70; // Default volume 70%
        private bool isUpdatingDuration = false; // Flag to prevent multiple duration updates

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Agar video selalu mengikuti ukuran form
            mplayer1.Dock = DockStyle.Fill;
            mplayer1.uiMode = "none"; // Sembunyikan control default

            // Set initial volume
            try
            {
                mplayer1.settings.volume = currentVolume;
            }
            catch (System.Runtime.InteropServices.COMException comEx)
            {
                Console.WriteLine($"COM Exception setting initial volume: {comEx.Message}");
            }

            // Test API connection
            TestAPIConnection();

            PlaylistTimer.Enabled = true;
            PlaylistTimer.Start();
        }

        // Test API connection
        private async void TestAPIConnection()
        {
            try
            {
                string testUrl = $"http://localhost:3000/active-listeners/unique/{uniqueId}";
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(testUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine("API connection test successful");
                    }
                    else
                    {
                        Console.WriteLine($"API connection test failed: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"API connection test error: {ex.Message}");
            }
        }

        // Method untuk sinkronisasi volume
        private void SyncVolume(int? apiVolume)
        {
            if (apiVolume.HasValue && apiVolume.Value >= 0 && apiVolume.Value <= 100)
            {
                if (currentVolume != apiVolume.Value)
                {
                    try
                    {
                        currentVolume = apiVolume.Value;
                        mplayer1.settings.volume = currentVolume;
                        Console.WriteLine($"Volume synchronized to: {currentVolume}%");
                    }
                    catch (System.Runtime.InteropServices.COMException comEx)
                    {
                        Console.WriteLine($"COM Exception setting volume: {comEx.Message}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error setting volume: {ex.Message}");
                    }
                }
            }
        }

        // Method untuk update duration ke API
        private async Task UpdateDurationToAPI()
        {
            if (isUpdatingDuration) return; // Prevent multiple simultaneous updates

            try
            {
                isUpdatingDuration = true;
                Console.WriteLine("Starting duration update...");

                // Wait for media to stabilize
                await Task.Delay(1500);

                // Check if player is in a valid state
                if (mplayer1 == null)
                {
                    Console.WriteLine("Media player is null");
                    return;
                }

                int currentState = -1;
                try
                {
                    currentState = (int)mplayer1.playState;
                }
                catch (System.Runtime.InteropServices.COMException comEx)
                {
                    Console.WriteLine($"COM Exception getting playState for duration: {comEx.Message}");
                    return;
                }

                if (currentState != 3) // Not playing
                {
                    Console.WriteLine($"Media not in playing state. Current state: {currentState}");
                    return;
                }

                // Check if currentMedia is available
                if (mplayer1.currentMedia == null)
                {
                    Console.WriteLine("CurrentMedia is null");
                    return;
                }

                // Get duration in seconds from Windows Media Player
                double durationInSeconds = 0;
                try
                {
                    durationInSeconds = mplayer1.currentMedia.duration;
                    Console.WriteLine($"Raw duration from WMP: {durationInSeconds}");
                }
                catch (System.Runtime.InteropServices.COMException comEx)
                {
                    Console.WriteLine($"COM Exception accessing duration: {comEx.Message}");
                    return;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"General exception accessing duration: {ex.Message}");
                    return;
                }

                int duration = (int)Math.Round(durationInSeconds);

                if (duration > 0)
                {
                    string url = $"http://localhost:3000/active-listeners/unique/{uniqueId}/command";
                    var updateData = new
                    {
                        duration = duration
                    };

                    string jsonData = JsonConvert.SerializeObject(updateData);
                    Console.WriteLine($"Sending duration update to: {url}");
                    Console.WriteLine($"Payload: {jsonData}");

                    using (var client = new HttpClient())
                    {
                        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                        HttpResponseMessage response = await client.PutAsync(url, content);

                        if (response.IsSuccessStatusCode)
                        {
                            Console.WriteLine($"Duration updated to API: {duration} seconds");
                        }
                        else
                        {
                            string responseContent = await response.Content.ReadAsStringAsync();
                            Console.WriteLine($"Failed to update duration: {response.StatusCode} - {responseContent}");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"Duration is invalid: {duration} seconds");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating duration to API: {ex.Message}");
            }
            finally
            {
                isUpdatingDuration = false;
            }
        }

        public class ApiResponse
        {
            public int? Id { get; set; }
            public string RoomName { get; set; }
            public string UniqueId { get; set; }
            public bool? Status { get; set; }
            public string Command { get; set; }
            public string Path { get; set; }
            public int? Voc { get; set; }
            public int? Duration { get; set; }
            public int? Volume { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
        }

        public class WrapperResponse
        {
            public ApiResponse data { get; set; }
        }

        public async Task<string> PostDataAsync(string url, string jsonData)
        {
            using (var client = new HttpClient())
            {
                var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    // Handle the error or throw an exception
                    return null;
                }
            }
        }

        private async void PlaylistTimer_Tick(object sender, EventArgs e)
        {
            try
            {
                // === HENTIKAN PLAYER JIKA MEDIA SUDAH SELESAI ===
                // WMP akan mengubah state ke wmppsMediaEnded (8) ketika file selesai diputar.
                int currentPlayState = -1;
                try
                {
                    currentPlayState = (int)mplayer1.playState;
                }
                catch (System.Runtime.InteropServices.COMException comEx)
                {
                    Console.WriteLine($"COM Exception getting playState: {comEx.Message}");
                    return;
                }

                if (currentPlayState == 8) // wmppsMediaEnded
                {
                    // Pastikan benar-benar stop & bersihkan state agar tidak memutar ulang.
                    try
                    {
                        mplayer1.Ctlcontrols.stop();
                        mplayer1.fullScreen = false;
                        mplayer1.URL = string.Empty;   // clear URL supaya tidak auto-resume
                        lastPlayedPath = null;
                        isUpdatingDuration = false; // Reset duration flag
                    }
                    catch { /* swallow */ }

                    return; // keluar dari timer tick; tidak perlu proses command server
                }

                string basePath = "C:\\PATHLAGU\\";
                string url = "http://localhost:3000/active-listeners/unique/" + uniqueId;
                string jsonData = "{\"command\":null}";

                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        string resultString = await response.Content.ReadAsStringAsync();

                        var wrapper = JsonConvert.DeserializeObject<WrapperResponse>(resultString);
                        ApiResponse result = wrapper?.data;

                        if (result == null)
                        {
                            Console.WriteLine("Deserialization failed or response is not as expected.");
                            return;
                        }

                        // Sinkronisasi volume dari API response
                        SyncVolume(result.Volume);

                        switch (result.Command)
                        {
                            case "play":
                                string mediaPath = basePath + result.Path;
                                Console.WriteLine("Play command received. Full path: " + mediaPath);

                                if (!File.Exists(mediaPath))
                                {
                                    Console.WriteLine("File NOT found: " + mediaPath);
                                    break;
                                }

                                // Additional file validation
                                try
                                {
                                    FileInfo fileInfo = new FileInfo(mediaPath);
                                    Console.WriteLine($"File size: {fileInfo.Length} bytes");
                                    Console.WriteLine($"File extension: {fileInfo.Extension}");
                                }
                                catch (Exception fileEx)
                                {
                                    Console.WriteLine($"Error getting file info: {fileEx.Message}");
                                }

                                // Get current state safely
                                int playState = -1;
                                string currentUrl = "";
                                try
                                {
                                    playState = (int)mplayer1.playState;
                                    currentUrl = mplayer1.URL ?? "";
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception getting player state: {comEx.Message}");
                                    break;
                                }

                                // Jika file sama dan sedang pause, resume
                                if (currentUrl == mediaPath && playState == 2) // wmppsPaused
                                {
                                    Console.WriteLine("Resuming paused video.");
                                    try
                                    {
                                        mplayer1.Ctlcontrols.play();
                                        mplayer1.fullScreen = true;
                                        // Update duration if not already done for this file
                                        if (!isUpdatingDuration && lastPlayedPath != mediaPath)
                                        {
                                            lastPlayedPath = mediaPath;
                                            _ = Task.Run(UpdateDurationToAPI);
                                        }
                                    }
                                    catch (System.Runtime.InteropServices.COMException comEx)
                                    {
                                        Console.WriteLine($"COM Exception resuming: {comEx.Message}");
                                    }
                                    break;
                                }

                                // Jika file sama dan sedang playing, tidak perlu diulang
                                if (currentUrl == mediaPath && playState == 3) // wmppsPlaying
                                {
                                    Console.WriteLine("Already playing this video.");
                                    // Still update duration if it hasn't been updated for this file
                                    if (!isUpdatingDuration && lastPlayedPath != mediaPath)
                                    {
                                        Console.WriteLine("Updating duration for currently playing media...");
                                        lastPlayedPath = mediaPath;
                                        _ = Task.Run(UpdateDurationToAPI); // Fire and forget
                                    }
                                    break;
                                }

                                // Jika file beda atau belum play, play baru
                                string res = await PostDataAsync(url, jsonData);
                                try
                                {
                                    Console.WriteLine($"Starting new media: {mediaPath}");

                                    // Stop any current playback first to reset state
                                    try
                                    {
                                        mplayer1.Ctlcontrols.stop();
                                        await Task.Delay(500); // Give it time to stop
                                    }
                                    catch (Exception stopEx)
                                    {
                                        Console.WriteLine($"Exception stopping before new media: {stopEx.Message}");
                                    }

                                    // Set URL and play
                                    mplayer1.URL = mediaPath;
                                    await Task.Delay(300); // Small delay after setting URL

                                    mplayer1.Ctlcontrols.play();
                                    mplayer1.fullScreen = true;
                                    lastPlayedPath = mediaPath;

                                    Console.WriteLine($"Successfully started playing: {mediaPath}");

                                    // Update duration in background after media starts
                                    _ = Task.Run(UpdateDurationToAPI);
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception starting playback: {comEx.Message}");
                                    Console.WriteLine($"HRESULT: {comEx.HResult:X8}");

                                    // Try to reset the player state
                                    try
                                    {
                                        mplayer1.URL = string.Empty;
                                        await Task.Delay(1000);
                                        mplayer1.URL = mediaPath;
                                        mplayer1.Ctlcontrols.play();
                                        Console.WriteLine("Retry successful after COM exception");
                                    }
                                    catch (Exception retryEx)
                                    {
                                        Console.WriteLine($"Retry failed: {retryEx.Message}");
                                    }
                                }
                                break;

                            case "stop":
                                try
                                {
                                    mplayer1.Ctlcontrols.stop();
                                    mplayer1.fullScreen = false;
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception stopping: {comEx.Message}");
                                }
                                break;

                            case "pause":
                                try
                                {
                                    mplayer1.Ctlcontrols.pause();
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception pausing: {comEx.Message}");
                                }
                                break;

                            case "next":
                                try
                                {
                                    mplayer1.Ctlcontrols.next();
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception next: {comEx.Message}");
                                }
                                break;

                            case "prev":
                                try
                                {
                                    mplayer1.Ctlcontrols.previous();
                                }
                                catch (System.Runtime.InteropServices.COMException comEx)
                                {
                                    Console.WriteLine($"COM Exception previous: {comEx.Message}");
                                }
                                break;

                            case "add":
                                await PostDataAsync(url, jsonData);
                                break;

                            case "volume":
                                if (result.Volume.HasValue)
                                {
                                    SyncVolume(result.Volume);
                                    Console.WriteLine($"Volume command received: {result.Volume}%");
                                }
                                break;

                            default:
                                break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching data: " + ex.Message);
            }
        }

    }
}
