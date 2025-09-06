const { pool, dbHelpers } = require('./database-mysql');

async function addBeritaToMySQL() {
  try {
    console.log('=== ADDING BERITA SYAKIRA TO MYSQL DATABASE ===');
    
    const newsData = {
      title: 'Siswi SMAIT Baitul Jannah, Syakira Siffa Ekiya, Sabet Empat Medali di Kejuaraan Renang Tingkat Provinsi',
      slug: 'syakira-prestasi-renang-2025',
      content: `<p>Prestasi membanggakan kembali ditorehkan oleh siswi SMAIT Baitul Jannah. Syakira Siffa Ekiya, siswi kelas XII, berhasil meraih empat medali dalam Kejuaraan Fun Swimming Invitasi Renang Lampung Piala Gubernur 2025 yang diselenggarakan di Aquatic Center, Bandar Lampung, pada tanggal 28-30 Agustus 2025.</p>

<p>Dalam kompetisi bergengsi tingkat provinsi ini, Syakira menunjukkan kemampuan luar biasa dengan meraih satu medali emas dan tiga medali perak. Medali emas diperoleh dari nomor 50 meter gaya bebas putri, sementara tiga medali perak berhasil diraih dari nomor 100 meter gaya bebas, 50 meter gaya kupu-kupu, dan 100 meter gaya kupu-kupu putri.</p>

<p>"Saya sangat bersyukur dan bangga bisa memberikan yang terbaik untuk sekolah. Latihan keras selama ini akhirnya membuahkan hasil yang memuaskan," ungkap Syakira setelah menerima medali terakhirnya. Prestasi ini merupakan buah dari dedikasi dan latihan intensif yang telah dijalani Syakira selama bertahun-tahun di bawah bimbingan pelatih profesional.</p>

<p>Kepala SMAIT Baitul Jannah menyampaikan apresiasi tinggi atas pencapaian Syakira. "Prestasi yang diraih Syakira tidak hanya membanggakan dirinya sendiri, tetapi juga mengharumkan nama baik SMAIT Baitul Jannah di kancah olahraga provinsi. Ini membuktikan bahwa siswa-siswi kami mampu berprestasi tidak hanya di bidang akademik, tetapi juga non-akademik," ujarnya.</p>

<p>Pencapaian Syakira ini juga mendapat dukungan penuh dari pihak sekolah dan keluarga. Kepala SMAIT Baitul Jannah dan seluruh jajaran guru serta staf mengucapkan selamat dan bangga atas pencapaian luar biasa ini. "Prestasi Syakira adalah bukti nyata bahwa semangat juang dan ketekunan mampu menghasilkan pencapaian luar biasa. Kami berharap ini menjadi inspirasi bagi seluruh siswa-siswi SMAIT Baitul Jannah untuk terus menggali potensi diri," ujar salah satu perwakilan guru.</p>

<p>Dengan torehan ini, Syakira Siffa Ekiya membuktikan bahwa kombinasi antara pendidikan formal dan pengembangan bakat non-akademis dapat berjalan seiring. Pencapaian ini diharapkan menjadi motivasi besar baginya untuk terus mengukir prestasi lebih tinggi di masa mendatang, baik di tingkat nasional maupun internasional.</p>`,
      excerpt: 'Syakira Siffa Ekiya, siswi kelas XII SMAIT Baitul Jannah, meraih empat medali (1 emas, 3 perak) dalam Kejuaraan Fun Swimming Invitasi Renang Lampung Piala Gubernur 2025, mengharumkan nama sekolah di tingkat provinsi.',
      featured_image: '/uploads/news/syakira-prestasi-renang.jpg',
      author_id: 1,
      status: 'published'
    };
    
    console.log('Creating news with data:');
    console.log('Title:', newsData.title);
    console.log('Status:', newsData.status);
    console.log('Featured image:', newsData.featured_image);
    
    const result = await dbHelpers.createNews(newsData);
    console.log('\n=== NEWS CREATED SUCCESSFULLY ===');
    console.log('News ID:', result.id);
    
    // Verify the news was created
    console.log('\n=== VERIFYING NEWS CREATION ===');
    const allNews = await dbHelpers.getAllNews({ status: 'published' });
    console.log('Published news count:', allNews.length);
    
    if (allNews.length > 0) {
      console.log('\n=== FIRST NEWS ITEM ===');
      console.log('Title:', allNews[0].title);
      console.log('Status:', allNews[0].status);
      console.log('Featured image:', allNews[0].featured_image);
    }
    
  } catch (error) {
    console.error('Error adding berita to MySQL:', error);
  } finally {
    process.exit(0);
  }
}

addBeritaToMySQL();