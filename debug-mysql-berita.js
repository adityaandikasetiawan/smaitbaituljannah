const { pool, dbHelpers } = require('./database-mysql');

// Test koneksi database MySQL yang sama dengan web app
async function testMySQLBerita() {
  try {
    console.log('=== TESTING MYSQL BERITA DATABASE CONNECTION ===');
    
    // Test dengan filter yang sama seperti di route berita
    const filters = { status: 'published', limit: 20 };
    console.log('Calling getAllNews with filters:', filters);
    
    const news = await dbHelpers.getAllNews(filters);
    
    console.log('\n=== RESULTS ===');
    console.log('Type of news:', typeof news);
    console.log('Is array:', Array.isArray(news));
    console.log('Number of news found:', news ? news.length : 0);
    
    if (news && news.length > 0) {
      console.log('\n=== FIRST NEWS ITEM ===');
      console.log('Title:', news[0].title);
      console.log('Status:', news[0].status);
      console.log('Published at:', news[0].published_at);
      console.log('Featured image:', news[0].featured_image);
    } else {
      console.log('\n=== NO NEWS FOUND IN MYSQL ===');
      console.log('This explains why berita page shows "Belum Ada Berita"');
    }
    
    // Test tanpa filter untuk melihat semua berita
    console.log('\n=== TESTING WITHOUT FILTERS ===');
    const allNews = await dbHelpers.getAllNews({});
    console.log('All news count:', allNews ? allNews.length : 0);
    
    if (allNews && allNews.length > 0) {
      console.log('\n=== ALL NEWS STATUS ===');
      allNews.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title} - Status: ${item.status}`);
      });
    }
    
    // Test koneksi database
    console.log('\n=== TESTING DATABASE CONNECTION ===');
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM news');
    console.log('Total news in MySQL database:', rows[0].count);
    connection.release();
    
  } catch (error) {
    console.error('Error testing MySQL berita:', error);
  } finally {
    process.exit(0);
  }
}

testMySQLBerita();