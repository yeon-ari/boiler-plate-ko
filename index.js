const express = require('express')
const app = express()
const port = 3000

const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://nayeon0729:1212@boilerplate.yyinpuz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB Connected...'))


app.get('/',(req,res)=>res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))