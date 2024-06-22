const express = require('express')
const bp=require('body-parser')
const mongoose=require('mongoose')
const empc=require('./models/model.js')
const URL="mongodb+srv://admin:admin123@cluster0.dk6rn1s.mongodb.net/gfgdb?retryWrites=true&w=majority&appName=Cluster0";
var app=express()
app.use(bp.json())

app.post('/adduser',(req,res)=>{
        const user=new empc({...req.body})
        user.save().then(()=> console.log('user added'))
        res.send('user addded')
})
app.get('/loaddata/:id',async(req,res)=>{
    const uid =parseInt(req.params.id)
    const users=await empc.findById(uid)
    res.send(users)
})
const startServer =async()=>{
    await mongoose.connect(URL)
    app.listen(3000,()=>{
        console.log('server is ready...!')
    })
}


startServer()