using System;
using System.IO;
using System.Windows.Forms;
using FFmpeg.AutoGen;

namespace AHAKTVPLAYER
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            // Set the directory where FFmpeg binaries are located
            var ffmpegBinaryPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ffmpeg_binaries");

            // Set environment variable so that FFmpeg can find its binaries
            Environment.SetEnvironmentVariable("PATH", $"{Environment.GetEnvironmentVariable("PATH")};{ffmpegBinaryPath}");

            // This is necessary to ensure that the dependencies are found
            // Assuming that FFmpeg.AutoGen looks for dependencies in the PATH
            // If there are specific methods in FFmpeg.AutoGen to set the binaries path, use them instead

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
