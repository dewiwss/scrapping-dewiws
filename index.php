<?php
// File json yang akan dibaca (full path file)
$file = "data/detikList.json";

// Mendapatkan file json
$list_berita = file_get_contents($file);

// Mendecode detikList.json
$data = json_decode($list_berita, true);

// Membaca data array menggunakan foreach
foreach ($data as $d) {
    echo $d['judul']. "<br>";
    echo "<a href=".$d['url'].">".$d['url']."</a><br>";
    echo $d['publised']. "<br>";
    echo "<br>";
}