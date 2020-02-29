// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
var MongoClient = require('mongodb').MongoClient;
var pass = process.env.PASS;
var url = `mongodb://xzy_dev:${pass}@www.shibonas.cn:3006/xzy_dev`
var conn = function(url){
  return new Promise((resolve,reject)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) reject(err);
      else resolve(db);
    })
  })
}
var toArray = function(data){
  return new Promise((resolve,reject)=>{
    data.toArray((err,res)=>{
      if(err)reject(err)
      else resolve(res);
    })
  })
}

exports.handler = async (event, context) => {
  try {
    var con = await conn(url);
    var db = con.db('db1');
    var col = db.collection('test');
    var res = await toArray(col.find({}));
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}


// HTTP function
exports.handler = async function http(req) {
  // queryStringParameters 
  // body
  // path
  // headers
  console.log(req)
  
  try {
    var con = await conn(url);
    var db = con.db('db1');
    var col = db.collection('test');
    var res = await toArray(col.find({}));
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
  
//   return {
//     headers: {
//       'content-type': 'text/html; charset=utf8'
//     },
//     body: html
//   }
}
