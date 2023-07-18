/*********************************************************************************
* WEB322 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Sheetal singh Student ID: 167431212 Date: 17-07-2023
*
*
********************************************************************************/

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const data = require("./modules/officeData.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/employees', function (req, res) {
    data.getAllEmployees().then((employees) => {
        res.render('employees', {employees: employees});
    }).catch((err) => {
        res.render('employees', {message: 'no results'});
    });
});

app.get('/employees/add', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'addEmployee.html'));
});

app.post('/employees/add', function(req, res){
    data.addEmployee(req.body)
    .then(function() {
        res.redirect('/employees');
    })
    .catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/description', function(req, res){
    res.render('description', {
        layout: 'main'
    });
});


app.get("/PartTimer", (req,res) => {
    data.getPartTimers().then((data)=>{
        res.json(data);
    });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
});





data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});

