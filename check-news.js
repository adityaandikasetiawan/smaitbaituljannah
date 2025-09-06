const { dbHelpers } = require('./database');

async function checkNews() {
    try {
        const news = await dbHelpers.getAllNews();
        console.log('Total berita:', news.length);
        
        if (news.length > 0) {
            console.log('\nDaftar berita:');
            news.forEach((n, index) => {
                console.log(`${index + 1}. ${n.title}`);
                console.log(`   Status: ${n.status}`);
                console.log(`   Slug: ${n.slug}`);
                console.log(`   Tanggal: ${n.created_at}`);
                console.log('---');
            });
        } else {
            console.log('Tidak ada berita di database.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

checkNews();