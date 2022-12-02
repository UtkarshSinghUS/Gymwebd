const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const db = require('./config/mongoose');
const user = require('./models/user');

 //console.log (path.join(__dirname,"../public"));

const staticPath = path.join(__dirname,"../public");
const partialsPath = path.join(__dirname,"../src/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));

app.set("view engine","hbs");

hbs.registerPartials(partialsPath);


app.get("/",(req,res)=> {
    res.render("index")
    });
 
// app.get("/",(req,res)=> {
// res.sendFile(path.join(__dirname,"../public", "home.html"));
// });
app.get("/home",(req,res)=>{
    res.render("index")
    });

app.get("/contactus",(req,res)=>{
    res.render("contactus")
    });
app.get("/pricing",(req,res)=>{
    res.render("pricing")
    });
app.get("/signin",(req,res)=>{
    res.render("signin")
    });
    app.get("/aboutus",(req,res)=>{
        res.render("aboutus")
        });

        // app.post('/create', function(req, res){
//     return res.render('Create', {});
// });



        // console.log(req.body.firstname);
        // req.send(req.body.firstname);

// app.post('/create', function(req, res){
//     return res.render('Create', {});
// });


app.post("/signin", async(req, res) => {
    try{
        // console.log(req.body.firstname);
        // req.send(req.body.firstname);

        const newuser = new user({
            email: req.body.email,
            pass: req.body.pass,
        })

        const created = await newuser.save();
        res.status(201).render("signin")
    } catch(error){
        res.status(400).send(error);
    }
})
// app.post("/contactus", async(req, res) => {
//     try{
//         // console.log(req.body.firstname);
//         // req.send(req.body.firstname);

//         const newuser = new user({
//             email: req.body.email,
//             pass: req.body.pass,
//         })

//         const created = await newuser.save();
//         res.status(201).render("contactus")
//     } catch(error){
//         res.status(400).send(error);
//     }
// })


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public", "error.html"));

});

app.listen(8000,()=>{
console.log("listing to port 8000")
});