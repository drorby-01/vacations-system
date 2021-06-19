const connection = require("mysql2");

const db = connection.createConnection({
  host: "localhost",
  user: "root",
  database: "vacation",
  password: "123456",
});



function execute(sql) {
  return new Promise((resolve, reject) => {
    db.execute(sql, (err, result) => {
      if (err) reject(err.message);
      else resolve(result);
    });
  });
}

function exceuteWithParameters(sql,parameters){
    return new Promise((resolve,reject)=>{
        db.execute(sql,parameters,(err,result)=>{
            if(err) reject(err.message);
            else resolve(result);
        })
    })
}

module.exports = {execute,exceuteWithParameters}