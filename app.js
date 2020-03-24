const express = require('express'),
app = express(),
dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser'),
methodOverride = require('method-override'),
compression = require('compression'),
shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses if this request header is present
      return false;
    }
    // fallback to standard compression
    return compression.filter(req, res);
  };
  
//import models
const { User } = require('./sequelize');

app.set('trust proxy', 1);
app.set('view engine','ejs');
app.use(compression({
    filter:shouldCompress,
    threshold: 3
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.disable('x-powered-by');

//REST APIs
app.get('/',(req, res)=>{
    res.render('index'); 
});
//create
app.post('/user',(req, res)=>{
    console.log(req.body);
    const firstname = req.body.firstname.trim(),
    lastname = req.body.lastname.trim();
    if(firstname.length == 0 || lastname.length == 0){
        res.send({'err': 'Empty Fields!!'});
    }else{
            User.create({ firstname: firstname, lastname: lastname }).then(user => {
                console.log("user's auto-generated ID:", user.id);
                res.send(user);           
            }).catch(err=>{
                res.send({'err': 'Same username found!!'});
            });
    }
 

});
//read
app.get('/user',(req,res)=>{
    User.findAll().then(users => {
        console.log("All users:", JSON.stringify(users,null,4));
        res.send(users);
      });
});
//update
app.put('/user',(req, res)=>{
    console.log(req.body.firstname);
     User.update({ lastname: req.body.lastname }, {
                where: {
                firstname: req.body.firstname
                }
            }).then((done) => {
                console.log("Done " + done);
                if(Number(done) === 0){
                    res.send({'err': 'No such user found!!'});
                }else{
                    res.sendStatus(200);
                }
            });
});
//delete
app.delete('/user',(req, res)=>{
     User.destroy({
            where: {
              firstname: req.body.firstname
            }
          }).then((done) => {
            console.log("Done");
            if(Number(done) === 0){
                res.send({'err': 'No such user found!!'});

            }else{
                res.sendStatus(200);
            }
          });
});

app.listen(process.env.PORT,(req, res)=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});