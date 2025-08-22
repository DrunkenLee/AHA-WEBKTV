# Volume Synchronization Feature

## Fitur yang Ditambahkan

Telah ditambahkan sinkronisasi volume dari API response ke KTV Player dengan fitur-fitur berikut:

### 1. Sinkronisasi Volume Otomatis
- Volume player akan secara otomatis tersinkronisasi dengan nilai volume dari API response setiap kali timer polling berjalan (setiap 1 detik)
- Volume yang diterima dari API akan langsung diterapkan ke Windows Media Player

### 2. Command Volume
- Menambahkan support untuk command "volume" dari API
- Ketika menerima command "volume", aplikasi akan mengeset volume sesuai nilai yang diterima

### 3. Perubahan pada API Response
- Menambahkan field `Volume` (int?) pada class `ApiResponse`
- Volume range: 0-100 (persentase)

### 4. Fitur Tambahan
- Default volume diset ke 50% saat aplikasi dimulai
- Console logging untuk tracking perubahan volume
- Validasi input volume (harus dalam range 0-100)

## Struktur API Response yang Diperlukan

```json
{
  "data": {
    "id": 1,
    "roomName": "Room 1",
    "uniqueId": "ORDER0013_1755620061577_CC3AM9",
    "status": true,
    "command": "volume", // atau command lain
    "path": "path/to/media.mp4",
    "voc": 1,
    "duration": 180,
    "volume": 75, // Field baru untuk volume (0-100)
    "createdAt": "2025-08-21T10:00:00Z",
    "updatedAt": "2025-08-21T10:00:00Z"
  }
}
```

## Cara Kerja

1. **Polling Timer**: Setiap 1 detik aplikasi akan melakukan GET request ke API
2. **Volume Sync**: Setelah menerima response, volume akan disinkronisasi secara otomatis
3. **Command Processing**: Jika command adalah "volume", akan memproses perubahan volume
4. **Validation**: Volume yang diterima akan divalidasi dalam range 0-100
5. **Apply to Player**: Volume baru akan diterapkan ke Windows Media Player

## Testing

Untuk testing fitur ini:

1. Jalankan aplikasi KTV Player
2. Pastikan API endpoint mengembalikan field `volume` dalam response
3. Ubah nilai volume melalui API (0-100)
4. Lihat console output untuk konfirmasi perubahan volume
5. Volume player akan berubah sesuai dengan nilai dari API

## Log Messages

- `Volume synchronized to: {volume}%` - Volume berhasil disinkronisasi
- `Volume command received: {volume}%` - Command volume diterima dan diproses
