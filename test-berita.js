const { dbHelpers } = require('./database');

async function testBerita() {
    try {
        console.log('=== TESTING DATABASE CONNECTION ===');
        
        // Test getAllNews dengan filter published
        console.log('Calling getAllNews with published filter...');
        const publishedNews = await dbHelpers.getAllNews({ status: 'published', limit: 20 });
        
        console.log('Published news result:');
        console.log('Type:', typeof publishedNews);
        console.log('Is array:', Array.isArray(publishedNews));
        console.log('Length:', publishedNews ? publishedNews.length : 0);
        
        if (publishedNews && publishedNews.length > 0) {
            console.log('\nFirst published news:');
            console.log(JSON.stringify(publishedNews[0], null, 2));
        } else {
            console.log('No published news found');
        }
        
        // Test getAllNews tanpa filter
        console.log('\n=== TESTING ALL NEWS ===');
        const allNews = await dbHelpers.getAllNews();
        console.log('All news length:', allNews ? allNews.length : 0);
        
        if (allNews && allNews.length > 0) {
            console.log('\nAll news:');
            allNews.forEach((news, index) => {
                console.log(`${index + 1}. ${news.title} - Status: ${news.status}`);
            });
        }
        
    } catch (error) {
        console.error('Error testing berita:', error);
    }
}

testBerita();