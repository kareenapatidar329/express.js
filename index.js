/**import mongoose from 'mongoose'
import express from 'express'
import studentModel from './model/studentModel.js';

const app = express();
app.use(express.json());
try {
    await mongoose.connect("mongodb://localhost:27017/school");
    console.log("_____connected_____");
} catch (error) {
    console.log("DB Error:", error);
}

app.get("/",async(req,resp)=>{

    const studentData= await studentModel.find();
    resp.send(studentData)
})

app.post("/save",async(req,resp)=>{
    console.log(req.body);

    const {name,age,email}=req.body;
    if(!req.body || !name || !age || !email){
    return resp.send({
        message:"data not stored",
        success:false,
        storedInfo:null
    })
    }

    const studentData = await studentModel.create(req.body);
    resp.send({
        message:"data stored",
        success:true,
        storedInfo:studentData
    })

    
})
app.put("/update/:id",async(req,resp)=>{
    const id= req.params.id;

    console.log(req.body,id);

    const studentData = await studentModel.findByIdAndUpdate(id,{
        ...req.body
    })
    resp.send({
        message:'data updated',
        success:true,
        info:studentData
    })
})

    app.delete("/delete/:id",async(req,resp)=>{
    const id= req.params.id;

    const studentData = await studentModel.findByIdAndDelete(id)
    resp.send({
        message:'data deleted',
        success:true,
        info:studentData
    })
})
app.listen(3200)

//async function dbConnection(){
// await mongoose.connect("mongodb://localhost:27017/school");
// const schema= mongoose.Schema({
//   name:String,
//   age:Number,
//   email:String,
//})


// const studetnModel=mongoose.model("student",schema)
// const result = await studentModel.find();
// console.log(result);


//}
//dbConnection();**/

/**import express from 'express'
import cors from 'cors'

const app=express();

app.use(cors());
app.get("/",(req,resp)=>{
    resp.send({
        name:"anil",
        age:29,
        email:"anil@test.com"
    })
})

app.listen(3200)**/

/**import express from 'express'
import multer from 'multer';

const app = express();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
})
const upload= multer(storage)

app.get("/",(req,resp)=>{
    resp.send(`
        <form action='/upload' method="post" enctype="multipart/form-data">
        <input type="file" name="myfile"/>
        <button>Upload file</button>
        </form>
        `)
})

app.post("/upload", upload.single('myfile'), (req, resp) => {
    resp.send({
        message: 'file uploaded',
        file: req.file
    })
})

app.listen(3200)**/

/**import { MongoClient } from "mongodb";

const password = encodeURIComponent("micro@11");
const url = `mongodb+srv://kpatidar97544_db_user:${password}@cluster0.54kvigr.mongodb.net/?appName=Cluster0`;
const database="school";
const collection="student";
const client=new MongoClient(url);
client.connect().then(()=>{
    console.log("_____connect_____")
})
async function dbConnection(){
    const db= client.db(database)
    const collectResult = db.collection(collection);
    const result = await collectResult.find().toArray();
    console.log(result);
}
dbConnection()**/
//😊for session and cookies
/**import express from 'express'
import session from 'express-session';

const app = express();

app.set("view engine",'ejs')

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'apple',
    resave: false,
    saveUninitialized: true
}))


app.get("/login",(req,resp)=>{
    resp.render("Login")
})

app.post("/profile",(req,resp)=>{
    //resp.setHeader('set-Cookie',"login=true")
    //resp.setHeader('set-Cookie',"name="+req.body.name)
    req.session.data= req.body;
    console.log(req.session.data);
    resp.render("profile",{ data: req.session.data});
})
//😊for cookies
/**app.get("/",(req,resp)=>{
    let cookiesData= req.get('cookies');
    cookiesData = cookiesData.split(";")
    cookiesData= cookiesData[1].split("=");
    console.log(cookiesData[1]);

    resp.render("home",{name:cookiesData[1]})
})//😊for cookies

app.get("/",(req,resp)=>{
    const data = req.session.data;
    console.log("data",data);
    resp.render("home",{data})
})
app.listen(3200)**/

import express from 'express'
import nodemailer from 'nodemailer'

const app = express();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'webanilsidhu@gmail.com',
        pass: 'micro@11'
    }
});

//app.use(express.urlencoded({extended:false}))//for use
app.use(express.json()) //for thunder

app.set('view engine','ejs')
app.get("/mail",(req,resp)=>{
    resp.render("mail")

})

app.post("/submit-email",(req,resp)=>{
    console.log(req.body);

    const mailOptions ={
        from:'webanilsidhu@gmail.com',
        to: 'webanilsidhu@gmail.com',
        subject:req.body.subject,
        text:req.body.mail
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            req.send("email operation failed, try again")
        }else{
            resp.send("mail send")
        }

    })

    resp.send("email send")

})
app.listen(3200)