const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const templatesPath=path.join(__dirname,'../templates')
app.use(express.json())
app.set('view engine', 'hbs')
app.set("views",templatesPath)

app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render("signup")
})
app.get('/login',(req,res)=>{
    res.render("login")
})
app.post("/signup",async(req,res)=>{
const data={
    name:req.body.name,
    password:req.body.password
}
await collection.insertMany([data])
res.render("home")
    
})
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.render("wrong")
        }
    }
    catch{
        res.send("wrong details")
    }     
})
app.listen(3005,()=>{
    console.log("port1 connected")
})
