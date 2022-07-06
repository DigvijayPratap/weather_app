const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
const fetch=require("node-fetch");  // install "npm install node-fetch@2"
//import fetch from 'node-fetch';  /// to use it write " "type":"module" " in package.json file

const port=8000;

const views_path=path.join(__dirname,"../templates/views");
const public_path=path.join(__dirname,"../public");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.urlencoded({extended:false}));

app.use(express.static(public_path));
app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path); 

app.get('/',(req,res)=>{
  res.render("index");
});
app.post('/index',async (req,res)=>{
    
     try{
        const city=req.body.city;
        const apiKey="9e36a7890f19cd0deaf5ef2f15a6a9a8";
    //const res1=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80a197171d4590a2d624c2de68fcbf46`)
    const res1=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data=await res1.json();
    const tem=data.main.temp;
    //const city=data.name;
    //console.log(city);
    //res.send(data);
  
  //console.log (city)
  //console.log( tem)
  //console.log( data.weather[0].icon)
  //console.log(data.weather[0].description)
  //console.log(data.main.humidity)
  //console.log(data.wind.speed)
  const ct= data.name;
  const temp= tem
  const  icon=data.weather[0].icon
  const desc=data.weather[0].description
  const humidi=data.main.humidity
  const speed=data.wind.speed
  //res.send(data);
   res.render("index",{
       city:ct,
       temp:temp,
       icon:icon,
       description:desc,
       humidity:humidi,
       windSpeed:speed
      
   })
    
    }catch(err){
        const mess="Something Went Wronge             OR             You Have Entered Wronge Name";
        res.render("index1",{message:mess});
    }
})

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})