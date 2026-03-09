/**import express from 'express'
import path from 'path'

const app = express();


app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.get("/",(req,resp)=>{
    const filePath = path.resolve("view/home.html");
    resp.sendFile(filePath)
})

app.get("/login",(req,resp)=>{
    resp.send(`
        <form action="/submit" method="post">
        <input type="text" placeholder="enter email" name="email"/>
        <input type="password" placeholder="enter password" name="password"/>
        <button type="submit">Login</button>
        </form>

        `)
})

app.post("/users",(req,resp)=>{
    resp.send("user login details are :",req.body);

    resp.send("submit Page")
})

app.post("/submit",(req,resp)=>{
    resp.send("submit Page")
})


app.listen(3200)**/

/**import express from 'express'
import morgan from 'morgan'
const app = express();

app.use(morgan('dev'))
app.get("/",(req,resp)=>{
    resp.send("Home Page")
})

app.get("/users",(req,resp)=>{
    resp.send("users Page")
})

app.get("/wait",(req,resp)=>{
    setTimeout(()=>{
        resp.send("result after 1 second")
    },1000);
})
app.listen(3200)**/

/**import express from 'express'
const app = express();

app.get("/",(req,resp)=>{
    resp.send("Home page")
})

app.get("/users",(req,resp)=>{
    resp.send("users page")
})

app.get("/error",(req,resp)=>{
    const error = new Error('')
    error.status = 404;
    next(error)
});

function errorHandling(error,req,resp,next){
    resp.status(error.status || 500).send(error.message || "Internal Server Error")
}
app.use(errorHandling)
app.listen(3200)**/

/**import express from 'express'
const app = express();

app.set('view engine','ejs')
app.get("/",(req,resp)=>{
    resp.render('home',{name: 'Anil', Ytchannel: 'Code step by step'})
})

app.listen(3200)**/

/**import express from 'express'
const app = express();

app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')
app.get('/add-user',(req,resp)=>{
    resp.render('addUser')

});

app.post('/submit-user',(req,resp)=>{
    console.log(req.body);
resp.render('SubmitUser')
});

app.get("/users",(req,resp)=>{
    const users=['anil','sunil','mohit','bruce']
    const isLogin = true;
    resp.render("users", { users: users, isLogin:true });
})

app.listen(3200)**/

import express from 'express'
import {handelUsers} from './controller/userController.js';
const app = express();

app.set('view engine','ejs')
app.get('/users',handelUsers)

app.listen(3200);
