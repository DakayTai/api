const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 8080;
// Ganti rps thread proxynya sesuai yg mau di pakai
const rps = "15";
const thread = "8";
const proxy = "proxy.txt";


app.get('/start', (req, res) => {
    const { key, host, port, time, method } = req.query;
    
    // Validasi parameter
    if (!key || !host || !port || !time || !method) {
        return res.status(400).json({ error: 'Parameter tidak lengkap' });
    }

    // Memulai proses child untuk menjalankan perintah
    const child = spawn('node', [method, host, time, rps, thread, proxy]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    res.status(200).json({ message: 'Perintah diterima dan diproses' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});