# SMAIT Baituljannah - Sistem Informasi Sekolah

Sistem informasi sekolah untuk SMAIT Baituljannah yang dibangun dengan Node.js, Express, dan EJS templating engine.

## Features

- 🏠 **Homepage** - Halaman utama sekolah dengan informasi lengkap
- 📝 **Pendaftaran Siswa** - Sistem pendaftaran siswa baru online
- 👤 **Portal Siswa** - Portal khusus untuk siswa dan orang tua
- 📰 **Berita Sekolah** - Sistem manajemen berita dan pengumuman
- 🔐 **Admin Panel** - Panel administrasi untuk pengelolaan data
- 📱 **Responsive Design** - Antarmuka yang mobile-friendly
- 🔒 **Security** - Keamanan dengan Helmet.js dan CSRF protection

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (Development), MySQL (Production - XAMPP)
- **Template Engine**: EJS
- **Authentication**: Express Session, bcryptjs
- **Security**: Helmet.js, express-validator
- **Styling**: Bootstrap 5, Custom CSS
- **Performance**: Compression middleware

## Installation

1. **Setup Project**
   ```bash
   cd smaitbaituljannah
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   
   **Untuk Development (SQLite):**
   Database SQLite akan dibuat otomatis di `data/smait_baituljannah.db`
   
   **Untuk Production (MySQL dengan XAMPP):**
   - Pastikan XAMPP MySQL berjalan
   - Database `smait_baituljannah` akan dibuat otomatis
   - Konfigurasi default: host=localhost, user=root, password=(kosong)
   
   **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=smait-baituljannah-secret
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
smaitbaituljannah/
├── app.js                    # Main application file
├── database.js               # SQLite database configuration
├── database-mysql.js         # MySQL database configuration (XAMPP)
├── package.json              # Dependencies and scripts
├── ecosystem.config.js       # PM2 production configuration
├── data/                     # Database files
│   └── smait_baituljannah.db # SQLite database
├── views/                    # EJS templates
│   ├── *.ejs                # Page templates
│   └── partials/            # Reusable components
├── public/                   # Static assets
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   └── img/                 # Image assets
└── README.md                # Project documentation
```

## Available Routes

**Public Routes:**
- `GET /` - Homepage
- `GET /daftar-siswa` - Pendaftaran siswa baru
- `GET /portal-siswa` - Portal siswa
- `GET /berita` - Halaman berita
- `GET /konsultasi` - Konsultasi online

**Admin Routes:**
- `GET /admin/login` - Admin login
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/registrations` - Kelola pendaftaran
- `GET /admin/news` - Kelola berita
- `GET /admin/settings` - Pengaturan sistem

## Authentication

The application includes a complete authentication system:

- **Registration**: Users can create accounts with email and password
- **Login**: Secure login with bcrypt password hashing
- **Sessions**: Express sessions for user state management
- **Protection**: Route protection middleware for authenticated areas

## Security Features

- **Helmet.js**: Security headers and XSS protection
- **CSRF Protection**: Cross-site request forgery prevention
- **Password Hashing**: bcrypt for secure password storage
- **Session Security**: HTTP-only cookies and secure session configuration
- **Input Validation**: express-validator for form validation

## Performance Optimizations

- **Gzip Compression**: Reduced response sizes
- **Static File Caching**: Efficient asset delivery
- **Minified Assets**: Optimized CSS and JavaScript
- **Image Optimization**: Compressed images for faster loading

## Deployment

### Environment Variables

For production deployment, set these environment variables:

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-production-secret-key
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use a strong `SESSION_SECRET`
- [ ] Enable HTTPS in production
- [ ] Configure proper logging
- [ ] Set up process management (PM2)
- [ ] Configure reverse proxy (Nginx)
- [x] Set up database (SQLite/MySQL)
- [x] Configure XAMPP MySQL connection
- [ ] Configure file uploads (if needed)

### Deployment Platforms

**Heroku**
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=your-secret
git push heroku main
```

**Railway**
```bash
railway login
railway new
railway up
```

**DigitalOcean App Platform**
- Connect your GitHub repository
- Set environment variables in the dashboard
- Deploy automatically on push

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

### Adding New Features

1. Create new routes in `app.js`
2. Add corresponding EJS templates in `views/pages/`
3. Update navigation in `views/partials/header.ejs`
4. Add any required middleware or validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.