let data = require('@begin/data');
var option = {
  table:"test",
  key:"content"
}

exports.handler = async function http(req) {
  var param = req.queryStringParameters;
  if(param && param.content){
    await data.set({...option,content:param.content});
    return {
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: "ok"
    }
  }else{
    var res = await data.get({...option});
    return {
      headers: {
        'content-type': 'text/html; charset=utf8'
      },
      body: JSON.stringify(res)
    }
  
  }
}
