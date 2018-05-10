var http = require('http'),
vote = require('./vote');
let v1 = vote("animal",["dog","cat","fish"]);

v1.votenow("dog");
v1.votenow("dog");
v1.votenow("dog");
v1.votenow("dog");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.restart_votes();
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("fish");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");
v1.votenow("cat");



http.createServer(function(req,res){
  res.writeHead(200);
  res.write(v1.logarray.toString());
  res.end();
})..listen(process.env.PORT || 3000);;
console.log('listening on port 3000');
