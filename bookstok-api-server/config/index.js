module.exports = {
  mysql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};


// module.exports = {
//   mysql: {
//     host: '13.124.253.233',
//     port: '3306',
//     database: 'bookstock',
//     user: 'bookstock',
//     password: 'Bookstock12$$'
//   }
// };
