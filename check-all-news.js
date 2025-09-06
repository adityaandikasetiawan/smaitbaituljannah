const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smait_baituljannah',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkAllNews() {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, content, featured_image, status, created_at FROM news ORDER BY created_at DESC'
    );
    
    console.log('=== SEMUA BERITA DI DATABASE ===');
    
    rows.forEach((row, index) => {
      console.log(`\n${index + 1}. ID: ${row.id}`);
      console.log(`   Title: ${row.title}`);
      console.log(`   Image: ${row.featured_image}`);
      console.log(`   Status: ${row.status}`);
      console.log(`   Created: ${row.created_at}`);
      console.log(`   Content Preview: ${row.content ? row.content.substring(0, 100) + '...' : 'No content'}`);
    });
    
    console.log(`\nTotal berita: ${rows.length}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkAllNews();