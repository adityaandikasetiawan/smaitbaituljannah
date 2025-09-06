const express = require('express');
const { dbHelpers } = require('./database');

// Simulasi route berita untuk debugging
async function debugBeritaRoute() {
    try {
        console.log('=== DEBUGGING BERITA ROUTE ===');
        
        // Test database connection
        console.log('1. Testing database connection...');
        const allNews = await dbHelpers.getAllNews();
        console.log('   Total news in database:', allNews.length);
        
        // Test published news filter
        console.log('\n2. Testing published news filter...');
        const publishedNews = await dbHelpers.getAllNews({ status: 'published', limit: 20 });
        console.log('   Published news count:', publishedNews.length);
        
        if (publishedNews.length > 0) {
            console.log('\n3. Published news details:');
            publishedNews.forEach((news, index) => {
                console.log(`   ${index + 1}. Title: ${news.title}`);
                console.log(`      Status: ${news.status}`);
                console.log(`      Created: ${news.created_at}`);
                console.log(`      Published: ${news.published_at}`);
                console.log(`      Featured Image: ${news.featured_image}`);
                console.log('   ---');
            });
        } else {
            console.log('   No published news found!');
        }
        
        // Test template data structure
        console.log('\n4. Template data structure:');
        const templateData = {
            title: 'Berita Terbaru - SMAIT Baituljannah',
            news: publishedNews || []
        };
        console.log('   Template data:', JSON.stringify(templateData, null, 2));
        
        // Check if news array is properly passed
        console.log('\n5. News array check:');
        console.log('   news exists:', !!templateData.news);
        console.log('   news is array:', Array.isArray(templateData.news));
        console.log('   news length:', templateData.news.length);
        
    } catch (error) {
        console.error('Error in debug:', error);
    }
}

debugBeritaRoute();