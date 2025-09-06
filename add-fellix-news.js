const { dbHelpers } = require('./database');

// Data berita baru
const newsData = {
    title: 'Fellix Fathul Ruzain, Kebanggaan SMAIT Baitul Jannah, Raih Penghargaan Atlet Berprestasi dari PORSEROSI',
    slug: 'fellix-fathul-ruzain-penghargaan-atlet-berprestasi-porserosi',
    content: `<p><strong>Bandar Lampung</strong> — Keluarga besar SMA Islam Terpadu (SMAIT) Baitul Jannah kembali diliputi kebahagiaan dan kebanggaan. Salah satu siswanya, Ananda Fellix Fathul Ruzain, telah mendapatkan penghargaan bergengsi sebagai atlet berprestasi dari Persatuan Olahraga Sepatu Roda Indonesia (PORSEROSI).</p>

<p>Penghargaan ini diberikan secara khusus sebagai bentuk apresiasi atas dedikasi dan kontribusi luar biasa Fellix dalam mengharumkan nama bangsa di kancah internasional. Keberhasilannya meraih Medali Perak pada ajang Freestyle Skate Asian Championship di Korea Selatan menjadi bukti nyata dari talenta dan kerja kerasnya yang patut diacungi jempol.</p>

<p>Prestasi ini menjadi cerminan dari semangat juang yang tinggi dan pantang menyerah. Di tengah kesibukan sebagai pelajar, Fellix mampu menyeimbangkan waktu untuk latihan intensif dan berhasil menorehkan prestasi yang tidak hanya membanggakan sekolah, tetapi juga Lampung dan seluruh Indonesia. Keberhasilannya ini menunjukkan bahwa dengan tekad kuat, setiap impian bisa diwujudkan.</p>

<p>SMAIT Baitul Jannah berharap, penghargaan ini dapat menjadi awal dari pencapaian-pencapaian luar biasa lainnya bagi Fellix di masa depan. Semangat dan prestasinya diharapkan terus menginspirasi seluruh siswa-siswi lainnya untuk berani mengejar mimpi dan memberikan kontribusi positif di bidang yang mereka geluti.</p>

<p>Kami mendoakan semoga Ananda Fellix selalu diberi kemudahan, kesuksesan, serta menjadi kebanggaan yang terus menyala bagi kita semua. Selamat!</p>`,
    excerpt: 'Fellix Fathul Ruzain, siswa SMAIT Baitul Jannah, meraih penghargaan atlet berprestasi dari PORSEROSI atas keberhasilannya meraih Medali Perak pada Freestyle Skate Asian Championship di Korea Selatan.',
    featured_image: '/uploads/news/Fellix Fathul Ruzain.jpg',
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