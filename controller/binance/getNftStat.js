const { default: axios } = require("axios");

  async function getNaemListNFT() {

    let p = `title, COUNT(title) as count, AVG(amount) as average, minimum
    FROM products
    LEFT JOIN
        (
            select C.title as title2, MIN(CAST(C.amount as MONEY)) as minimum
            FROM products C
            WHERE
                C.tradeType = 0 AND
                C.status = 1 AND
                C.currency LIKE 'BUSD'
            GROUP BY title
        )
    ON title = title2
    WHERE
        tradeType = 0 AND
        status = 4 AND
        currency LIKE 'BUSD' AND
        setStartTime > ${Date.now() - 4 * 24 * 60 * 60 * 1000}
    GROUP BY title
    ORDER BY count
    DESC
    LIMIT 1000`;
    SQL_CLIENT = axios.create({
        method: 'get',
        url: `https://d3lmyxedw4itd2.cloudfront.net/select/${p}`,
    });
    const res = await SQL_CLIENT.request({
    }).then(res=> {
        // console.log(res);
        return res.data
    }).catch(e=> {
        console.log(e);
    });
    return res
  }

  module.exports = {getNaemListNFT}