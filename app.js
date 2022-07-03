const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { application } = require("express");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const app = express();

var questions =[];
var questionse =[]

mongoose.connect("mongodb+srv://surajkadamr:Suraj3015@quizdatabase.gbtmflt.mongodb.net/quizDB");

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const quizSchema = new mongoose.Schema({
    _id:Number,
    level:Number,
    topicNumber:Number,
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    correct:String,
    language:String
},{_id:false});


quizSchema.plugin(AutoIncrement);

const QuizE =  mongoose.model("englishQuestion",quizSchema);
const QuizK =  mongoose.model("kannadaQuestion",quizSchema);



app.get("/",function(req,res){
    res.render("login",{erroe:""});  
})
app.post("/",function(req,res){
    if((req.body.username)==="sumukhaesolutions" && (req.body.password)==="surajkadamr"){
        res.redirect("/home");
    }else{
        res.render("login",{erroe:"Invalid username or password"})
    }
})

app.get("/home",function(req,res){
    QuizE.countDocuments({}, function(err, c) {
        var rle=c;
    QuizK.countDocuments({},function(err,c1){
        var rlk=c1;
    QuizK.countDocuments({topicNumber:1},function(err,t1k){
        var tlk=t1k;
    QuizK.countDocuments({topicNumber:2},function(err,t2k){
        var t2k=t2k;
    QuizK.countDocuments({topicNumber:3},function(err,t3k){
        var t3k=t3k;
    QuizE.countDocuments({topicNumber:1},function(err,t1e){
        var tle=t1e;
    QuizE.countDocuments({topicNumber:2},function(err,t2e){
        var t3e=t3e;
    QuizE.countDocuments({topicNumber:3},function(err,t3e){
        var t3e=t3e;
        res.render("home",{rlk:rlk,rle:rle,t1k:t1k,t2k:t2k,t3k:t3k,t1e:t1e,t2e:t2e,t3e:t3e});
        })})})})})})})})})



app.post("/home",function(req,res){
    QuizE.countDocuments({}, function(err, c) {
        var rle=c;
    QuizK.countDocuments({},function(err,c1){
        var rlk=c1;
    QuizK.countDocuments({topicNumber:1},function(err,t1k){
        var tlk=t1k;
    QuizK.countDocuments({topicNumber:2},function(err,t2k){
        var t2k=t2k;
    QuizK.countDocuments({topicNumber:3},function(err,t3k){
        var t3k=t3k;
    QuizE.countDocuments({topicNumber:1},function(err,t1e){
        var tle=t1e;
    QuizE.countDocuments({topicNumber:2},function(err,t2e){
        var t3e=t3e;
    QuizE.countDocuments({topicNumber:3},function(err,t3e){
        var t3e=t3e;
        res.render("home",{rlk:rlk,rle:rle,t1k:t1k,t2k:t2k,t3k:t3k,t1e:t1e,t2e:t2e,t3e:t3e});
        })})})})})})})})})

app.get("/add",function(req,res){
    res.render("add",{title:"Add Question"});
});


app.get("/kannada",function(req,res){
    QuizK.find({},function(err,results){
        res.render("questions",{results:results})   
    })
})

app.post("/delete",function(req,res){
    const deleteId = req.body.delete;
    const hidden = req.body.hidden;

    if(hidden==="Kannada"){
        QuizK.deleteOne({_id : deleteId}, function (err) {
            if (!err) {
              console.log("Success");
              res.redirect("/kannada");
            }else{
                console.log(err);
            }})
    }else{
        QuizE.deleteOne({_id : deleteId}, function (err) {
            if (!err) {
                res.redirect("/english");
            }})}
        })


app.get("/english",function(req,res){
    QuizE.find({},function(err,results){
        res.render("questions",{results:results})   
    })
})


app.post("/add",function(req,res){
    const topicnum = req.body.topic;
    const qlevel = req.body.qlevel;
    const question =_.lowerCase(req.body.Question);
    const o1 = _.lowerCase(req.body.o1);
    const o2 = _.lowerCase(req.body.o2);
    const o3 =_.lowerCase(req.body.o3);
    const o4 =_.lowerCase(req.body.o4);
    const correct = _.lowerCase(req.body.correct);
    const lan =_.capitalize(req.body.lan);

    if(lan==="Kannada"){
        const quiz = new QuizK({
            level:qlevel,
            topicNumber:topicnum,
            question:question,
            option1:o1,
            option2:o2,
            option3:o3,
            option4:o4,
            correct:correct,
            language:lan
        });
    
        quiz.save(function(err){
            if(!err){
                res.render("sucess");
            }else{
                console.log(err);
            }
        });
    }else{
        const quiz = new QuizE({
            level:qlevel,
            topicNumber:topicnum,
            question:question,
            option1:o1,
            option2:o2,
            option3:o3,
            option4:o4,
            correct:correct,
            language:lan
        });
    
        quiz.save(function(err){
            if(!err){
                res.render("sucess");
            }else{
                console.log(err);
            }
        });
    }
    
})


app.get("/generatequestions",function(req,res){
    res.render("generatepage")
})

app.post("/generatequestions",function(req,res){
    const tn = _.lowerCase(req.body.tn);
    const t1 = _.lowerCase(req.body.t1);
    const t2 = _.lowerCase(req.body.t2);
    const t3 = _.lowerCase(req.body.t3);
    const lan =_.lowerCase(req.body.lan);

    if(lan==="kannada"){
        // Get the count of all users
        QuizK.count({topicNumber :1}).exec(function (err, count) {


        for (let i = 0; i < t1; i++) {
            var random = Math.floor(Math.random() * count)
            QuizK.findOne({topicNumber :1}).skip(random).exec(
                function (err, result) {
                console.log(result);
                questions.push(result); 
            })
        }
    })

    QuizK.count({topicNumber :2}).exec(function (err, count) {


        for (let i = 0; i < t2; i++) {
            var random = Math.floor(Math.random() * count)
            QuizK.findOne({topicNumber :2}).skip(random).exec(
                function (err, result) {
                questions.push(result) 
            })
        }
    })
    QuizK.count({topicNumber :3}).exec(function (err, count) {


        for (let i = 0; i < t3; i++) {
            var random = Math.floor(Math.random() * count)
            QuizK.findOne({topicNumber :3}).skip(random).exec(
                function (err, result) {
                questions.push(result)
            })
        }
    })
    res.render("link",{link:"/generateapik"});
      
    }else{

        QuizE.count({topicNumber :1}).exec(function (err, count) {
    
            for (let i = 0; i < t1; i++) {
                var random = Math.floor(Math.random() * count)
                QuizE.findOne({topicNumber :1}).skip(random).exec(
                    function (err, result) {
                    console.log(result);
                    questionse.push(result); 
                })
            }
        })
    
        QuizE.count({topicNumber :2}).exec(function (err, count) {
    
    
            for (let i = 0; i < t2; i++) {
                var random = Math.floor(Math.random() * count)
                QuizE.findOne({topicNumber :2}).skip(random).exec(
                    function (err, result) {
                    questionse.push(result) 
                })
            }
        })
        QuizE.count({topicNumber :3}).exec(function (err, count) {
    
    
            for (let i = 0; i < t3; i++) {
                var random = Math.floor(Math.random() * count)
                QuizE.findOne({topicNumber :3}).skip(random).exec(
                    function (err, result) {
                    questionse.push(result)
                })
            }
        })
        res.render("link",{link:"/generateapie"});
    }
})


// 

// app.post("/update",function(req,res){
//     const topicnum = req.body.topic;
//     const qlevel = req.body.qlevel;
//     const question =_.lowerCase(req.body.Question);
//     const o1 = _.lowerCase(req.body.o1);
//     const o2 = _.lowerCase(req.body.o2);
//     const o3 =_.lowerCase(req.body.o3);
//     const o4 =_.lowerCase(req.body.o4);
//     const correct = _.lowerCase(req.body.correct);
//     const lan =_.capitalize(req.body.lan);
//     const hid = req.body.hidden;

//     if(lan==="Kannada"){
//         QuizK.findByIdAndUpdate(hid,{
//             level:qlevel,
//             topicNumber:topicnum,
//             question:question,
//             option1:o1,
//             option2:o2,
//             option3:o3,
//             option4:o4,
//             correct:correct,
//             language:lan
//         },function(err){
//             if(err){
//                 console.log(err);
//             }else{
//                 res.redirect("/kannada");
//             }
//         })
//     }else{
//         QuizE.findByIdAndUpdate(hid,{
//             level:qlevel,
//             topicNumber:topicnum,
//             question:question,
//             option1:o1,
//             option2:o2,
//             option3:o3,
//             option4:o4,
//             correct:correct,
//             language:lan
//         },function(err){
//             if(err){
//                 console.log(err);
//             }else{
//                 res.redirect("/english");
//             }
//         })  
//     }
// })

app.get("/generateapik",function(req,res){
    res.render("generateapi",{results:questions,i:0})
})


app.get("/generateapie",function(req,res){
    res.render("generateapi",{results:questionse,i:0})
})

app.post("/end",function(req,res){
    questions=[];
    questionse=[];
    res.redirect("/home");
})

app.get("/logout",function(req,res){
    res.render("logout");
})

app.listen(3000,function(req, res){
    console.log("Server is running on port 3000");
});