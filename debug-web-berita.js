const express = require('express');
const { dbHelpers } = require('./database');
const { getAllNews } = dbHelpers;

// Test koneksi database yang sama dengan web app
async function testWebBerita() {
  try {
    console.log('=== TESTING WEB BERITA DATABASE CONNECTION ===');
    
    // Test dengan filter yang sama seperti di route berita
    const filters = { status: 'published', limit: 20 };
    console.log('Calling getAllNews with filters:', filters);
    
    const news = await getAllNews(filters);
    
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
      console.log('\n=== NO NEWS FOUND ===');
      console.log('This explains why berita page shows "Belum Ada Berita"');
    }
    
    // Test tanpa filter untuk melihat semua berita
    console.log('\n=== TESTING WITHOUT FILTERS ===');
    const allNews = await getAllNews({});
    console.log('All news count:', allNews ? allNews.length : 0);
    
    if (allNews && allNews.length > 0) {
      console.log('\n=== ALL NEWS STATUS ===');
      allNews.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title} - Status: ${item.status}`);
      });
    }
    
  } catch (error) {
    console.error('Error testing web berita:', error);
  }
}

testWebBerita();