const pool = require('./pool');

const userModel = {

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
    },
    // 관리자페이지 기능1 (랭킹업데이트) 테스트용 (분리예정)
    async mainpageRankingSet() {
        try {
            await pool.query(
                `UPDATE auction a
                LEFT JOIN (
                    SELECT aId, COUNT(*) as checked_count
                    FROM suggestAuc
                    WHERE checked = 1
                    GROUP BY aId
                ) AS subquery ON a.auctionId = subquery.aId
                SET a.star = IFNULL(subquery.checked_count, 0);`);
            await pool.query(
                `UPDATE auction
                SET
                suggestion = star*10 + viewCount;`
            )
            console.log("OK");
        } catch (err) {
            throw new Error('DB Error');
        }
    }
}

module.exports = userModel;