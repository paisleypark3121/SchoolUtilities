
const express = require('express');

const https = require('https');
//require('ejs');
const app=express();
const bodyParser = require("body-parser");
var port=process.env.PORT || 3000;

app.use( express.static( "public" ) );

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// app.get('/', function(req,res) {
//   res.send('HELLO WORLD');
//   //res.render('main.ejs');
// });

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

app.post('/test', function(req,res) {
  const offset=100;
  var Name = req.body.Name;
  var Surname = req.body.Surname;

  Name=Name.split(" ").join("");
  Surname=Surname.split(" ").join("");
  var Full=Surname+Name.toLowerCase();
  Full+=Full;
  //console.log(Full);
  
  var ip1=(Full.charCodeAt(0)-66).toString();
  ip1+=(Full.charCodeAt(1)-66).toString();
  ip1+=(Full.charCodeAt(2)-66).toString();
  ip1+=offset;
  ip1=(parseInt(ip1) % 256).toString();

  var ip2=(Full.charCodeAt(3)-66).toString();
  ip2+=(Full.charCodeAt(4)-66).toString();
  ip2+=(Full.charCodeAt(5)-66).toString();
  ip2+=offset;
  ip2=(parseInt(ip2) % 256).toString();

  var ip3=(Full.charCodeAt(6)-66).toString();
  ip3+=(Full.charCodeAt(7)-66).toString();
  ip3+=(Full.charCodeAt(8)-66).toString();
  ip3+=offset;
  ip3=(parseInt(ip3) % 256).toString();

  var ip4=(Full.charCodeAt(9)-66).toString();
  ip4+=(Full.charCodeAt(10)-66).toString();
  ip4+=(Full.charCodeAt(11)-66).toString();
  ip4=(parseInt(ip4) % 256).toString();

  var cidr=parseInt(ip1[0]);
  if (ip1[1])
    cidr+=parseInt(ip1[1])
  if (ip1[2])
    cidr+=parseInt(ip1[2])
  var hosts1=cidr % 1000;
  var hosts2=hosts1+123;
  var hosts3=hosts2+185;
  if (hosts1<30)
    hosts1+=100;
  if (hosts2<30)
    hosts2+=100;
  if (hosts3<30)
    hosts3+=100;
  cidr=cidr % 3;
  
  var _cidr1="/24";
  var _cidr2="/24";
  var _cidr3="/24";
  if (cidr==0) {
    _cidr1="/8";
    _cidr2="/16";
    _cidr3="/24";
  }
  else if (cidr==1) {
    _cidr1="/16";
    _cidr2="/24";
    _cidr3="/8";
  }
  else if (cidr==2) {
    _cidr1="/24";
    _cidr2="/8";
    _cidr3="/16";
  }
    
  var response="<b> Compito di "+Name+" "+Surname+"</b><br><br>";
  response+="<b>#1</b> - IP: "+ip1+"."+ip2+"."+ip3+"."+ip4+" "+_cidr1+"<br>";
  response+="<b>#2</b> - IP: "+ip2+"."+ip3+"."+ip4+"."+ip1+" "+_cidr2+"<br>";
  response+="<b>#3</b> - IP: "+ip3+"."+ip4+"."+ip1+"."+ip2+" "+_cidr3+"<br>";
  response+="<b>#4</b> - HOSTS: "+hosts1.toString()+"<br>";
  response+="<b>#5</b> - HOSTS: "+hosts2.toString()+"<br>";
  response+="<b>#6</b> - HOSTS: "+hosts3.toString()+"<br>";

  res.send(response);
  
});


app.listen(port);