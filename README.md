# BP - Konverter Mata Uang

****BP - Konverter Mata Uang**** adalah alat untuk melakukan konversi mata uang secara cepat langsung dari browser Google Chrome dan browser berbasis Chromium lainnya. Ekstensi ini menggunakan API dari [exchangerate.host](https://exchangerate.host/) untuk mendapatkan data nilai tukar mata uang terkini.

---

## Versi Rilis Stabil
v1.1.0

## Mata Uang yang Tersedia

- ****Dolar AS (USD)****
- ****Yuan Cina (CNY)****
- ****Euro (EUR)****
- ****Rupiah (IDR)****
- ****Yen Jepang (JPY)****
- ****Pound sterling (GBP)****

---

## Cara Mengunduh Ekstensi

Untuk mengunduh versi terbaru dari ekstensi ini, silakan kunjungi halaman GitHub resmi ekstensi [di sini](https://github.com/bennyesp/bp-konverter-mata-uang).

---

## Setup API

Ekstensi ini membutuhkan ****API Key**** dari exchangerate.host untuk mengambil data nilai tukar mata uang. Anda harus memiliki ****akses key**** pribadi untuk dapat menggunakannya.

### 1. Membuat Akun di exchangerate.host
1. Kunjungi [halaman utama exchangerate.host](https://exchangerate.host/).
2. Pilih opsi ****"GET FREE KEY"**** untuk membuat akun gratis.
3. Isi data akun seperti nama, email, dan kata sandi, lalu selesaikan proses pendaftaran.

### 2. Mengambil API Access Key
1. Setelah berhasil mendaftar, login ke akun Anda.
2. Setelah login, Anda akan diarahkan ke ****Dashboard****.
3. Di dashboard, cari tulisan ****"Your API Access Key"**** dan salin kode yang tertera.

### 3. Mengkonfigurasi API Key
1. Buka folder ekstensi yang sudah Anda unduh.
2. Cari dan buka file bernama `key-template.js`.
3. Masukkan API Key yang sudah Anda salin tadi ke dalam file tersebut dengan format:
    ```js
    export const access_key = {
        nama_api: "access_key"
    }
    ```
4. Setelah itu, ubah nama file `key-template.js` menjadi `key.js`.

Dengan langkah-langkah di atas, ekstensi Anda akan siap untuk mengambil data nilai tukar mata uang dari API.

---

## Cara Menginstal Ekstensi di Chrome

1. ****Buka Chrome**** dan klik ikon ****tiga titik**** di kanan atas untuk membuka menu.
2. Pilih ****Extensions (Ekstensi)**** dari menu.
3. Di halaman ****Ekstensi****, aktifkan ****Developer Mode**** dengan mengklik tombol ****"Developer mode"**** di kanan atas.
4. Klik tombol ****"Load Unpacked" (Muatan Tidak Dikemas)****.
5. Arahkan ke folder tempat Anda mengekstrak ekstensi ini dan pilih folder tersebut.
6. Ekstensi Anda akan muncul di daftar ekstensi aktif di Chrome.

---

## Cara Menggunakan Ekstensi

Setelah ekstensi berhasil dipasang, Anda dapat menggunakannya langsung dari toolbar Chrome. Klik ikon ekstensi di toolbar, pilih mata uang asal dan tujuan, dan ekstensi akan menampilkan nilai tukar mata uang terkini berdasarkan data yang diambil dari API.

---

Dengan perubahan di atas, ekstensi ini semakin memudahkan pengguna untuk mengonversi mata uang dengan tampilan yang lebih baik dan dukungan mata uang lebih banyak.

---