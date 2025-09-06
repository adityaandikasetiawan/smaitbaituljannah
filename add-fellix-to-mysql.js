const mysql = require('mysql2/promise');

async function addFellixNews() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smait_baituljannah',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        console.log('Connecting to MySQL database...');
        
        // Insert berita Fellix
        const [result] = await pool.execute(
            `INSERT INTO news (title, slug, content, excerpt, featured_image, author_id, status, published_at, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
            [
                'Prestasi Membanggakan Fellix Fathul Ruzain di Kompetisi Matematika Tingkat Nasional',
                'prestasi-fellix-fathul-ruzain-matematika',
                'Siswa SMA IT Baitul Jannah, Fellix Fathul Ruzain, berhasil meraih juara 2 dalam Kompetisi Matematika Tingkat Nasional yang diselenggarakan di Jakarta. Prestasi ini membanggakan dan menunjukkan kualitas pendidikan di SMA IT Baitul Jannah.',
                'Fellix Fathul Ruzain meraih juara 2 dalam Kompetisi Matematika Tingkat Nasional.',
                '/uploads/news/Fellix Fathul Ruzain.jpg',
                1,
                'published'
            ]
        );
        
        console.log('Berita Fellix berhasil ditambahkan dengan ID:', result.insertId);
        
        // Verifikasi data yang baru ditambahkan
        const [rows] = await pool.execute(
            'SELECT * FROM news WHERE title LIKE ?',
            ['%Fellix%']
        );
        
        console.log('Verifikasi - Berita Fellix ditemukan:', rows.length);
        if (rows.length > 0) {
            console.log('Detail berita:', {
                id: rows[0].id,
                title: rows[0].title,
                status: rows[0].status,
                published_at: rows[0].published_at,
                created_at: rows[0].created_at
            });
        }
        
    } catch (error) {
        console.error('Error adding Fellix news:', error);
    } finally {
        await pool.end();
        console.log('Database connection closed.');
    }
}

addFellixNews();