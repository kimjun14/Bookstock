const pool = require('./pool');

const userModel = {
    // 마이페이지 기능 테스트용 (분리예정)
    async mypageRecentSearch(data) {
        try {
            const [result] = await pool.query(
                `SELECT * FROM auction 
                WHERE auctionId 
                in (?) 
                order by auctionId DESC`, [data]);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 메인페이지 기능 테스트용 (분리예정)
    async mainpageRecentSearch() {
        try {
            const [result] = await pool.query(
                `SELECT auctionId,bookTitle,bookAuthor,auctionPrice,bookImgSrc 
                FROM auction 
                WHERE done = false 
                ORDER by auctionId DESC 
                LIMIT 6`);
            return result;
        } catch (err) {
            throw new Error('DB Error');
        }
    },
    // 메인페이지 기능2 (랭킹) 테스트용 (분리예정)
    async mainpageRankingSearch() {
        try {
            const [result] = await pool.query(
                `SELECT auctionId,bookTitle,bookAuthor,viewCount,bookImgSrc 
                FROM auction 
                where done = false 
                order by viewCount DESC 
                limit 12`);
            return result;
        } catch (err) {
            throw new Error('DB Error');
        }
    }
}

module.exports = userModel;