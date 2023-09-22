const pool = require('./pool');

// 이미지 URL을 데이터베이스에 입력합니다
const imageUrl = `/images/${req.file.filename}`; // Assuming 'public' is your static files directory
const sql = 'INSERT INTO images (url) VALUES (?)';

try {
    await new Promise((resolve, reject) => {
    db.query(sql, [imageUrl], (err, result) => {
        if (err) {
        console.error('Error inserting image URL into the database:', err);
        reject(err);
        } else {
        console.log('Image URL inserted into the database');
        resolve(result);
        }
    });
    });

    res.json({ message: 'Image uploaded and URL saved successfully' });
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
