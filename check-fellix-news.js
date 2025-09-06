const { pool } = require('./database-mysql');

async function checkDatabase() {
  try {
    console.log('=== CHECKING DATABASE ===');
    
    // Check all news
    const [allNews] = await pool.execute('SELECT id, title, status, created_at FROM news ORDER BY created_at DESC');
    console.log('\nTotal news in database:', allNews.length);
    
    if (allNews.length > 0) {
      console.log('\n=== ALL NEWS ===');
      allNews.forEach((news, index) => {
        console.log(`${index + 1}. ${news.title} (Status: ${news.status})`);
      });
    }
    
    // Check specifically for Fellix news
    const [fellixNews] = await pool.execute('SELECT id, title, status, created_at FROM news WHERE title LIKE ?', ['%Fellix%']);
    console.log('\n=== FELLIX NEWS ===');
    console.log('Fellix news found:', fellixNews.length);
    
    if (fellixNews.length === 0) {
      console.log('\n*** PROBLEM IDENTIFIED ***');
      console.log('Berita Fellix tidak ada di database MySQL!');
      console.log('Kemungkinan berita hanya ada di database SQLite.');
    } else {
      fellixNews.forEach((news, index) => {
        console.log(`${index + 1}. ${news.title} (Status: ${news.status})`);
      });
    }
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await pool.end();
  }
}

checkDatabase();