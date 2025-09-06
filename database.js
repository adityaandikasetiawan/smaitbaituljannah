const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'data', 'smait_baituljannah.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Admin users table
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Student registrations table
  db.run(`CREATE TABLE IF NOT EXISTS student_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_lengkap TEXT NOT NULL,
    tempat_lahir TEXT NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin TEXT NOT NULL,
    agama TEXT NOT NULL,
    alamat TEXT NOT NULL,
    no_telepon TEXT,
    email TEXT,
    asal_sekolah TEXT NOT NULL,
    alamat_sekolah TEXT NOT NULL,
    tahun_lulus INTEGER NOT NULL,
    nama_ayah TEXT NOT NULL,
    nama_ibu TEXT NOT NULL,
    pekerjaan_ayah TEXT NOT NULL,
    pekerjaan_ibu TEXT NOT NULL,
    no_telepon_ortu TEXT NOT NULL,
    email_ortu TEXT,
    program_pilihan TEXT NOT NULL,
    motivasi TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // News table
  db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id INTEGER,
    status TEXT DEFAULT 'draft',
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES admin_users(id)
  )`);

  // Activity logs table
  db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER,
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin_users(id)
  )`);

  // Insert default admin user (password: admin123)
  const bcrypt = require('bcryptjs');
  const defaultPassword = bcrypt.hashSync('admin123', 10);
  
  db.run(`INSERT OR IGNORE INTO admin_users (username, email, password, full_name, role) 
    VALUES (?, ?, ?, ?, ?)`, 
    ['admin', 'admin@smaitbaituljannah.sch.id', defaultPassword, 'Administrator', 'admin']
  );
});

// Database helper functions
const dbHelpers = {
  // Admin functions
  findAdminByUsername: (username, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.get('SELECT * FROM admin_users WHERE username = ?', [username], callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  },

  findAdminByEmail: (email, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.get('SELECT * FROM admin_users WHERE email = ?', [email], callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM admin_users WHERE email = ?', [email], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  },

  createAdmin: (userData, callback) => {
    const { username, email, password, full_name, role = 'admin' } = userData;
    const bcrypt = require('bcryptjs');
    
    if (callback) {
      // Callback version for backward compatibility
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.run(
        'INSERT INTO admin_users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, full_name, role],
        callback
      );
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        db.run(
          'INSERT INTO admin_users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
          [username, email, hashedPassword, full_name, role],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ 
                id: this.lastID, 
                username, 
                email, 
                full_name, 
                role,
                changes: this.changes 
              });
            }
          }
        );
      });
    }
  },

  authenticateAdmin: (username, password, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, admin) => {
        if (err) {
          return callback(err, null);
        }
        
        if (!admin) {
          return callback(null, null);
        }
        
        const bcrypt = require('bcryptjs');
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) {
            return callback(err, null);
          }
          
          if (isMatch) {
            callback(null, admin);
          } else {
            callback(null, null);
          }
        });
      });
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, admin) => {
          if (err) {
            return reject(err);
          }
          
          if (!admin) {
            return resolve(null);
          }
          
          const bcrypt = require('bcryptjs');
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) {
              return reject(err);
            }
            
            if (isMatch) {
              resolve(admin);
            } else {
              resolve(null);
            }
          });
        });
      });
    }
  },

  // Student registration functions
  createStudentRegistration: (studentData, callback) => {
    const {
      namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat,
      noTelepon, email, asalSekolah, alamatSekolah, tahunLulus,
      namaAyah, namaIbu, pekerjaanAyah, pekerjaanIbu, noTeleponOrtu, emailOrtu,
      programPilihan, motivasi
    } = studentData;

    if (callback) {
      // Callback version for backward compatibility
      db.run(
        `INSERT INTO student_registrations (
          nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, alamat,
          no_telepon, email, asal_sekolah, alamat_sekolah, tahun_lulus,
          nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, no_telepon_ortu, email_ortu,
          program_pilihan, motivasi
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat,
          noTelepon, email, asalSekolah, alamatSekolah, tahunLulus,
          namaAyah, namaIbu, pekerjaanAyah, pekerjaanIbu, noTeleponOrtu, emailOrtu,
          programPilihan, motivasi
        ],
        callback
      );
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO student_registrations (
            nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, alamat,
            no_telepon, email, asal_sekolah, alamat_sekolah, tahun_lulus,
            nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, no_telepon_ortu, email_ortu,
            program_pilihan, motivasi
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat,
            noTelepon, email, asalSekolah, alamatSekolah, tahunLulus,
            namaAyah, namaIbu, pekerjaanAyah, pekerjaanIbu, noTeleponOrtu, emailOrtu,
            programPilihan, motivasi
          ],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id: this.lastID, changes: this.changes });
            }
          }
        );
      });
    }
  },

  getAllStudentRegistrations: (callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.all('SELECT * FROM student_registrations ORDER BY created_at DESC', callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM student_registrations ORDER BY created_at DESC', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  },

  getStudentRegistrationById: (id, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.get('SELECT * FROM student_registrations WHERE id = ?', [id], callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM student_registrations WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  },

  updateStudentRegistrationStatus: (id, status, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.run(
        'UPDATE student_registrations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id],
        callback
      );
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.run(
          'UPDATE student_registrations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [status, id],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ changes: this.changes, lastID: this.lastID });
            }
          }
        );
      });
    }
  },

  deleteStudentRegistration: (id, callback) => {
    db.run('DELETE FROM student_registrations WHERE id = ?', [id], callback);
  },

  getRegistrationStats: (callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.get(`
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
          COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
          COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
          COUNT(CASE WHEN DATE(created_at) = DATE('now') THEN 1 END) as today
        FROM student_registrations
      `, callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.get(`
          SELECT 
            COUNT(*) as total,
            COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
            COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
            COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
            COUNT(CASE WHEN DATE(created_at) = DATE('now') THEN 1 END) as today
          FROM student_registrations
        `, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  },

  getRecentRegistrations: (limit, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.all(
        'SELECT * FROM student_registrations ORDER BY created_at DESC LIMIT ?',
        [limit],
        callback
      );
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.all(
          'SELECT * FROM student_registrations ORDER BY created_at DESC LIMIT ?',
          [limit],
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    }
  },

  getStudentRegistrations: (filters, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      let query = 'SELECT * FROM student_registrations WHERE 1=1';
      const params = [];
      
      if (filters.status && filters.status !== '') {
        query += ' AND status = ?';
        params.push(filters.status);
      }
      
      if (filters.program && filters.program !== '') {
        query += ' AND program_pilihan = ?';
        params.push(filters.program);
      }
      
      query += ' ORDER BY created_at DESC';
      
      db.all(query, params, callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM student_registrations WHERE 1=1';
        const params = [];
        
        if (filters.status && filters.status !== '') {
          query += ' AND status = ?';
          params.push(filters.status);
        }
        
        if (filters.program && filters.program !== '') {
          query += ' AND program_pilihan = ?';
          params.push(filters.program);
        }
        
        query += ' ORDER BY created_at DESC';
        
        db.all(query, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  },

  updateRegistrationStatus: (id, status, callback) => {
    db.run(
      'UPDATE student_registrations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id],
      callback
    );
  },

  // Additional admin functions
  getAllAdmins: (callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.all('SELECT id, username, email, full_name, role, created_at FROM admin_users ORDER BY created_at DESC', callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.all('SELECT id, username, email, full_name, role, created_at FROM admin_users ORDER BY created_at DESC', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  },

  deleteAdmin: (adminId, callback) => {
    if (callback) {
      // Callback version for backward compatibility
      db.run('DELETE FROM admin_users WHERE id = ?', [adminId], callback);
    } else {
      // Promise version
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM admin_users WHERE id = ?', [adminId], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        });
      });
    }
  },

  // News functions
  createNews: (newsData) => {
    const { title, slug, content, excerpt, featured_image, author_id, status = 'draft' } = newsData;
    return new Promise((resolve, reject) => {
      const published_at = status === 'published' ? new Date().toISOString() : null;
      
      db.run(
        'INSERT INTO news (title, slug, content, excerpt, featured_image, author_id, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, slug, content, excerpt, featured_image, author_id, status, published_at],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...newsData });
          }
        }
      );
    });
  },

  getAllNews: (filters = {}) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT n.*, au.username as author_name, au.full_name as author_full_name 
        FROM news n 
        LEFT JOIN admin_users au ON n.author_id = au.id 
        WHERE 1=1
      `;
      const params = [];
      
      if (filters.status && filters.status !== 'all') {
        query += ' AND n.status = ?';
        params.push(filters.status);
      }
      
      if (filters.author_id) {
        query += ' AND n.author_id = ?';
        params.push(filters.author_id);
      }
      
      query += ' ORDER BY n.created_at DESC';
      
      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }
      
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getNewsById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT n.*, au.username as author_name, au.full_name as author_full_name FROM news n LEFT JOIN admin_users au ON n.author_id = au.id WHERE n.id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  getNewsBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT n.*, au.username as author_name, au.full_name as author_full_name FROM news n LEFT JOIN admin_users au ON n.author_id = au.id WHERE n.slug = ? AND n.status = "published"',
        [slug],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  updateNews: (id, newsData) => {
    const { title, slug, content, excerpt, featured_image, status } = newsData;
    return new Promise((resolve, reject) => {
      let query = 'UPDATE news SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, status = ?';
      let params = [title, slug, content, excerpt, featured_image, status];
      
      // Update published_at if status changes to published
      if (status === 'published') {
        query += ', published_at = CASE WHEN published_at IS NULL THEN datetime("now") ELSE published_at END';
      }
      
      query += ', updated_at = datetime("now") WHERE id = ?';
      params.push(id);
      
      db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },

  deleteNews: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM news WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },

  getNewsStats: () => {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN status = 'published' THEN 1 END) as published,
          COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft,
          COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived,
          COUNT(CASE WHEN DATE(created_at) = DATE('now') THEN 1 END) as today
        FROM news
      `, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  // Activity log functions
  logActivity: (admin_id, action, description, ip_address, user_agent) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO activity_logs (admin_id, action, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
        [admin_id, action, description, ip_address, user_agent],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }
};

module.exports = { db, dbHelpers };