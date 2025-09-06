const { dbHelpers } = require('./database');

// Data berita baru
const newsData = {
    title: 'Siswi SMAIT Baitul Jannah, Syakira Siffa Ekiya, Sabet Empat Medali di Kejuaraan Renang Tingkat Provinsi',
    slug: 'syakira-siffa-ekiya-sabet-empat-medali-kejuaraan-renang',
    content: `<p><strong>Bandar Lampung</strong> — Syakira Siffa Ekiya, siswi kelas XII Hamzah bin Abdul Mutholib dari Sekolah Menengah Atas Islam Terpadu (SMAIT) Baitul Jannah, kembali mengukir prestasi membanggakan. Dalam Kejuaraan Fun Swimming Invitasi Renang Lampung Piala Gubernur 2025, Syakira berhasil meraih total empat medali, yang terdiri dari satu medali emas dan tiga medali perak, sekaligus mengharumkan nama sekolah di kancah provinsi.</p>

<p>Perolehan medali yang diraih Syakira menunjukkan dominasinya di berbagai gaya renang. Ia berhasil menyabet medali dalam kategori:</p>

<p>🥇 <strong>Medali Emas:</strong> Cabang 25M Gaya Bebas Putri</p>
<p>🥈 <strong>Medali Perak:</strong> Cabang 25M Gaya Dada Putri</p>
<p>🥈 <strong>Medali Perak:</strong> Cabang 50M Gaya Kupu-kupu Putri</p>
<p>🥈 <strong>Medali Perak:</strong> Cabang 25M Gaya Kupu-kupu Putri</p>

<p>Prestasi gemilang ini bukanlah hal yang mudah. Syakira dikenal memiliki etos kerja dan disiplin latihan yang sangat tinggi. Setiap medali yang ia raih adalah buah dari kerja keras, dedikasi, serta latihan intensif yang ia jalani selama berbulan-bulan, bahkan sambil menyeimbangkan dengan kegiatan akademisnya.</p>

<p>Dukungan penuh datang dari pihak sekolah dan keluarga. Kepala SMAIT Baitul Jannah dan seluruh jajaran guru serta staf mengucapkan selamat dan bangga atas pencapaian luar biasa ini. "Prestasi Syakira adalah bukti nyata bahwa semangat juang dan ketekunan mampu menghasilkan pencapaian luar biasa. Kami berharap ini menjadi inspirasi bagi seluruh siswa-siswi SMAIT Baitul Jannah untuk terus menggali potensi diri," ujar salah satu perwakilan guru.</p>

<p>Dengan torehan ini, Syakira Siffa Ekiya membuktikan bahwa kombinasi antara pendidikan formal dan pengembangan bakat non-akademis dapat berjalan seiring. Pencapaian ini diharapkan menjadi motivasi besar baginya untuk terus mengukir prestasi lebih tinggi di masa mendatang, baik di tingkat nasional maupun internasional.</p>`,
    excerpt: 'Syakira Siffa Ekiya, siswi kelas XII SMAIT Baitul Jannah, meraih empat medali (1 emas, 3 perak) dalam Kejuaraan Fun Swimming Invitasi Renang Lampung Piala Gubernur 2025, mengharumkan nama sekolah di tingkat provinsi.',
    featured_image: '/uploads/news/syakira-prestasi-renang.jpg',
    author_id: 1,
    status: 'published'
};

// Tambahkan berita ke database menggunakan Promise
dbHelpers.createNews(newsData)
    .then(result => {
        console.log('Berita berhasil ditambahkan ke database!');
        console.log('ID berita:', result.id);
        console.log('Slug:', newsData.slug);
        
        // Log aktivitas
        return dbHelpers.logActivity(1, 'create_news', `Menambahkan berita: ${newsData.title}`);
    })
    .then(() => {
        console.log('Aktivitas berhasil dicatat.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });