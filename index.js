import express from 'express'

const app = express();

app.get("/",(req,resp)=>{
    const users=['anil','bruce','sam','john','peter']
    let data =`<ul>`;
    for(let i=0; i<users.length; i++){

        data+= `<li><a href="/user/${users[i]}">${users[i]}</a></li>`
        console.log(users[i]);
    }
    data+=`</ul>`
    resp.send(data)

})

app.get("/user/:name",(req,resp)=>{
    console.log(req.params.name);
    const userName=req.params.name;
    resp.send(`this is ${userName}'s profile page`)

})

app.listen(3200)