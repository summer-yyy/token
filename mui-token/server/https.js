var https = require("https");
var options = {
  "method": "POST",
  "hostname": [
    "transfer",
    "swft",
    "pro"
  ],
  "path": [
    "api",
    "v1",
    "getBaseInfo"
  ],
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache"
  }
};
​
var req = https.request(options, function (res) {
  var chunks = [];
​
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
​
  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
​
req.write(JSON.stringify({ depositCoinCode: 'BTC', receiveCoinCode: 'ETH' }));
req.end();