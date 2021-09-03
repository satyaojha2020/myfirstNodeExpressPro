
const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const requests = require('requests');
// built-in middleware
// console.log(path.join(__dirname,'../public/index.html'));
const staticPath = path.join(__dirname,'../public');
const templatepath = path.join(__dirname,'../templates')
const partialspath = path.join(__dirname,'../templates/partials')
// setting view engine
app.set("view engine","hbs");

app.set('views',templatepath);

hbs.registerPartials(partialspath);
// app.use(express.static(staticPath));

app.get('/',(req,res) =>{
    res.render("index",{title:"Tere Mere Sapne"});
})
app.get('/about',(req,res) =>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=4ef4fd7e1a355582fff7f0aa31943d75`)
    .on('data',  (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrdata = [objdata];
        console.log(arrdata);
    res.send(`City is ${arrdata[0].name} Temperature is ${arrdata[0].main.temp}`);
    // res.end(homefile);
    })
    .on('end',  (err)=> {
    if (err) return console.log('connection closed due to errors', err);
    
    console.log('end');
    });        
})

app.get('*',(req,res) =>{
    res.send('This is not what i wanted')

})

app.listen(8000, ()=> {
    console.log('listening nthe port at 8000')
})