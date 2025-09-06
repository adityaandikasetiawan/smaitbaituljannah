# Panduan Deployment SMAIT Baituljannah

Panduan ini menjelaskan cara mengkonfigurasi dan menjalankan aplikasi SMAIT Baituljannah agar dapat diakses melalui domain `smaitbaituljannah.sch.id`.

## Prasyarat

- Server Linux (Ubuntu/Debian)
- Node.js (versi 16 atau lebih baru)
- NPM atau Yarn
- Nginx
- PM2 (Process Manager untuk Node.js)
- SSL Certificate untuk domain

## Langkah-langkah Deployment

### 1. Persiapan Server

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Node.js dan NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 secara global
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 2. Konfigurasi Aplikasi

#### a. File Environment (.env)
File `.env` sudah dikonfigurasi dengan pengaturan production.

#### b. Install Dependencies
```bash
cd /var/www/html/smaitbaituljannah
npm install --production
```

### 3. Konfigurasi Nginx

#### a. Copy konfigurasi virtual host
```bash
sudo cp nginx-smaitbaituljannah.conf /etc/nginx/sites-available/smaitbaituljannah.sch.id
```

#### b. Aktifkan site
```bash
sudo ln -s /etc/nginx/sites-available/smaitbaituljannah.sch.id /etc/nginx/sites-enabled/
```

#### c. Test dan restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Certificate

#### Menggunakan Let's Encrypt (Certbot)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d smaitbaituljannah.sch.id -d www.smaitbaituljannah.sch.id
```

### 5. Menjalankan Aplikasi

#### Menggunakan script startup
```bash
# Jalankan aplikasi
./start-production.sh

# Hentikan aplikasi
./stop-production.sh
```

### 6. Konfigurasi DNS

Pastikan DNS record untuk domain sudah dikonfigurasi:

```
Type: A
Name: smaitbaituljannah.sch.id
Value: [IP_ADDRESS_SERVER]

Type: A
Name: www.smaitbaituljannah.sch.id
Value: [IP_ADDRESS_SERVER]
```

## Monitoring dan Maintenance

### Perintah PM2:
```bash
# Cek status aplikasi
pm2 status

# Lihat logs
pm2 logs smaitbaituljannah

# Restart aplikasi
pm2 restart smaitbaituljannah
```

### Log Files:
- Application logs: `/var/www/html/smaitbaituljannah/logs/`
- Nginx access log: `/var/log/nginx/smaitbaituljannah.access.log`
- Nginx error log: `/var/log/nginx/smaitbaituljannah.error.log`

## Troubleshooting

### 1. Aplikasi tidak dapat diakses
- Cek status PM2: `pm2 status`
- Cek logs aplikasi: `pm2 logs smaitbaituljannah`
- Cek status Nginx: `sudo systemctl status nginx`

### 2. SSL Certificate Error
- Cek tanggal expired certificate
- Renew certificate: `sudo certbot renew`

### 3. Permission Issues
- Pastikan ownership file benar: `sudo chown -R www-data:www-data /var/www/html/smaitbaituljannah`

## Security Features

- HTTPS enabled
- Security headers configured
- Secure cookies enabled
- Hidden server tokens
- Firewall protection

## Support

Untuk bantuan teknis, hubungi administrator sistem.