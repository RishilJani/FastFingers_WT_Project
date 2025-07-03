const express = require('express');
const mongoose = require('mongoose');
const User = require("./User");
const bodyParser = require('body-parser');
const cors = require('cors');

const connectionString = "mongodb+srv://Rishil:RVJani@cluster0.7mv6j.mongodb.net/Project";
const port = 4221;
mongoose.connect(connectionString).then(() => {
    console.log("database connected");
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());

    // starting point just for testing
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/login.html");
    });

    // get all user's data
    app.get("/user/:username", async (req, res) => {
        const ans = await User.findOne({ username: req.params.username });
        res.send(ans);
    });

    // get speed by id(username)
    app.get("/speed/:username", async (req, res) => {
        const ans = await User.findOne({ username: req.params.username });
        if (ans != undefined) {
            res.send(ans.speed);
        } else {
            res.send("User Does Not Exits");
        }
    });

    // get accuracy by id(username)
    app.get("/accuracy/:username", async (req, res) => {
        const ans = await User.findOne({ username: req.params.username });
        if (ans != undefined) {
            res.send(ans.accuracy);
        } else {
            res.send("User Does Not Exits");
        }
    });

    app.get("/userdata/:username", async (req,res)=>{

        const ans = await User.findOne({username : req.params.username});
        if(ans != undefined){
            res.send(ans.userData);
        }else{
            res.send("User Does Not Exits");
        }
    });

    // to insert speed and accuracy into a user
    app.put("/user/:us", async (req, res) => {
        console.log("putting " );
        const ans = await User.findOne({ username: req.params.us });
        
        if (ans !== undefined) {
            let sp = (Number)(req.body.speed);
            let ac = (Number)(req.body.accuracy);
            let dt = getDate();
            
            us = { speed : sp , accuracy : ac, currentDate : dt };

            console.log("us Speed = " + us.speed);
            
            ans.userData.push(us);
            const a = await ans.save();

            res.send(a.userData);
        } else {
            res.status(404).json({ error : "User does not exist" });
        }
    });



    // to delete a user
    app.delete("/user/:us", async (req, res) => {
        const ans = await User.deleteOne({ username: req.params.us });
        res.send(ans);
    });

    // for varification ( login )
    app.post("/login", async (req, res) => {
        // let abc = {...req.body};

        const un = req.body.username.trim();
        const pa = req.body.password.trim();

        const ans = await User.findOne({ username: un });
        if (ans == undefined) {
            res.send({ "res": "User does not exist" });
        }
        else {
            if (ans.password == pa) {
                res.send({ "res": "true" });
            } else {
                res.send({ "res": "false" });
            }
        }
    });

    // insert a user ( signup )
    app.post("/signup", async (req, res) => {
        console.log("signing up....");
        const un = req.body.username.trim();
        const pa = req.body.password.trim();
        console.log("un = " + un + " pass = " + pa);
        const per = await User.findOne({ username: un });
        if (per == undefined) {
            us = new User({ ...req.body });
            const ans = await us.save();
            res.send({ "res": "true" });
        }
        else {
            res.send({ "res": "User Alredy Exists" });
        }
    });

    app.listen(port, () => {
        console.log("server started at ", port);
    });
});

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function UserData(sp, ac,date){
    return { speed : sp , accuracy : ac, currentDate : date };
}