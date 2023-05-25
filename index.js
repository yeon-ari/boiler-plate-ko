const express = require('express')
const app = express()
const port = 3000

const config = require('./config/key')

const bodyParser = require('body-parser');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose=require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/',(req,res)=>res.send('Hello World!'))


//회원가입을 위한 route
app.post('/register', (req, res)=>{
    //회원가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다.
    const user = new User(req.body)

    try{
        user.save()
        .then(()=>{
            return res.status(200).json({success:true});
        })
        .catch((err)=>{
            return res.json({success:false,err});
        })
    } catch (err){
        console.log(err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
