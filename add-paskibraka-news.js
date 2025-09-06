const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smait_baituljannah'
};

async function addPaskibrakaNNews() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
    // News data
    const newsData = {
      title: 'Siswa SMAIT Baitul Jannah Terpilih sebagai Paskibraka Tingkat Kota, Wujud Karakter Kedisiplinan',
      slug: 'paskibraka-akbar-khairinnissah',
      excerpt: 'M. Akbar Habibie dan Khairinnissah W. berhasil terpilih sebagai anggota Paskibraka Tingkat Kota Bandar Lampung Tahun 2025, membuktikan kualitas pendidikan karakter SMAIT Baitul Jannah.',
      content: `Bandar Lampung — SMA Islam Terpadu (SMAIT) Baitul Jannah kembali menorehkan prestasi membanggakan melalui dua siswanya, M. Akbar Habibie dan Khairinnissah W., yang berhasil terpilih dan bertugas sebagai anggota Pasukan Pengibar Bendera Pusaka (Paskibraka) Tingkat Kota Bandar Lampung Tahun 2025. Terpilihnya mereka merupakan sebuah kehormatan dan kebanggaan besar bagi sekolah, membuktikan kualitas pendidikan karakter yang diterapkan.

Proses seleksi Paskibraka dikenal sangat ketat, mencakup tes fisik, akademik, dan mental. M. Akbar Habibie dan Khairinnissah W. berhasil melewati setiap tahapan dengan gemilang, menunjukkan ketangguhan dan kedisiplinan yang luar biasa. Selama masa pelatihan, mereka menjalani serangkaian kegiatan yang mengasah kemampuan baris-berbaris, kekompakan tim, serta pembentukan mental yang kuat.

Prestasi ini menjadi cerminan dari komitmen sekolah dalam membentuk pribadi yang tidak hanya unggul secara akademis, tetapi juga memiliki karakter yang matang dan bertanggung jawab. Kepala Sekolah dan seluruh jajaran guru serta staf SMAIT Baitul Jannah mengucapkan selamat dan apresiasi setinggi-tingginya kepada keduanya.

"Kami sangat bangga dengan Akbar dan Khairinnissah. Tugas mereka sebagai Paskibraka tidak hanya sebatas mengibarkan bendera, tetapi juga membawa nama baik sekolah. Pengalaman ini akan menjadi bekal berharga bagi mereka untuk mengemban amanah dan menjadi pemimpin di masa depan," ujar Kepala SMAIT Baitul Jannah (H. Farida, M.Pd,I)

Semoga pengalaman berharga ini dapat menginspirasi seluruh siswa-siswi SMAIT Baitul Jannah untuk terus berprestasi dan berkontribusi positif bagi bangsa dan negara. Selamat dan sukses selalu untuk M. Akbar Habibie dan Khairinnissah W.`,
      featured_image: 'M. Akbar Habibie.jpg',
      author_id: 1,
      status: 'published',
      published_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Insert news into database
    const insertQuery = `
      INSERT INTO news (
        title, slug, excerpt, content, featured_image, author_id, status, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      newsData.title,
      newsData.slug,
      newsData.excerpt,
      newsData.content,
      newsData.featured_image,
      newsData.author_id,
      newsData.status,
      newsData.published_at,
      newsData.created_at,
      newsData.updated_at
    ];
    
    const [result] = await connection.execute(insertQuery, values);
    
    console.log('✅ Berita Paskibraka berhasil ditambahkan ke database!');
    console.log('📰 ID Berita:', result.insertId);
    console.log('📝 Judul:', newsData.title);
    console.log('🔗 Slug:', newsData.slug);
    console.log('🖼️ Gambar:', newsData.featured_image);
    
  } catch (error) {
    console.error('❌ Error adding Paskibraka news:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the function
addPaskibrakaNNews();