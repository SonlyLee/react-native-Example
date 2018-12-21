var express = require('express');
var app = express();
var request = require("request");    //网络请求模块
var bodyParse = require("body-parser");
const https = require('https');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", '*')
    next();
})
app.all('*', (req, res) => {
    console.log(req.url)
    if (req.url.indexOf('today')!==-1) {
        https.get("https://interface.meiriyiwen.com/article/today?dev=1", function (resProxy) {
            if (resProxy.statusCode === 200) {
                console.log(resProxy)
                resProxy.pipe(res);
            }
        })
    }
    if(req.url.indexOf('date=')!==-1){
        var time = req.url.split('&')[1].split('=')[1]
        https.get(`https://interface.meiriyiwen.com/article/day?dev=1&date=${time}`, function (resProxy) {
            if (resProxy.statusCode === 200) {
                resProxy.pipe(res);
            }
        })
    }
    if(req.url.indexOf('random')!==-1){
        https.get(`https://interface.meiriyiwen.com/article/random?dev=1`, function (resProxy) {
            if (resProxy.statusCode === 200) {
                resProxy.pipe(res);
            }
        })
    }
})



app.listen(3000, '10.232.52.183', function () {
    console.log('Node start...')
});