const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-belal:Test123@cluster0.d3d6s.mongodb.net/DrinksDB",{useNewUrlParser: true,useUnifiedTopology: true});

const sumSchema ={

sum:Number,
date:String

};
let currentDate = new Date().toJSON().slice(0,10).split('-').reverse().join('-');
console.log(currentDate);

const Sums = mongoose.model("sums", sumSchema);

app.route("/sum")
.get(function(req,res) {

  Sums.findOne({date:currentDate},function(err,foundSum) {
    if (!err) {
      res.send(foundSum);

    }else {
      res.send(err);
    }
  })
})
.post(function(req,res) {
  Sums.findOne({date:currentDate},function(err,foundSum) {
  if (!err) {

       if (foundSum===null) {
        //update current sum
       const total = req.body.sum;
        const newSum = new Sums({
          sum:total,
          date:currentDate
        });
        newSum.save(function (err) {
          if (!err) {
            res.send("data send sucsesfully");

          }else {
            res.send(err);
          }
        });

      } else {

        res.send("existing date");
      }

}else {
  res.send(err);
}
  })
})
.patch(function(req,res) {
  Sums.update(
    {date:currentDate},
    {$set:req.body},
    function (err) {
      if(!err)
      {
        res.send("update done");
      }
      else {
        res.send(err);
      }
    }
  );

});

/////////////////////////////////////////////////////////// host//////////////////////

const hostSchema ={

sum:Number,
date:String

};


const Hosts = mongoose.model("hosts", hostSchema);

app.route("/hosts")
.get(function(req,res) {

  Hosts.findOne({date:currentDate},function(err,foundhost) {
    if (!err) {
      res.send(foundhost);

    }else {
      res.send(err);
    }
  })
})
.post(function(req,res) {
  Hosts.findOne({date:currentDate},function(err,foundhost) {
  if (!err) {

       if (foundhost===null) {
        //update current sum
       const totalHost = req.body.sum;
        const newHost = new Hosts({
          sum:totalHost,
          date:currentDate
        });
        newHost.save(function (err) {
          if (!err) {
            res.send("data send sucsesfully");

          }else {
            res.send(err);
          }
        });

      } else {

        res.send("existing date");
      }

}else {
  res.send(err);
}
  })
})
.patch(function(req,res) {
  Hosts.update(
    {date:currentDate},
    {$set:req.body},
    function (err) {
      if(!err)
      {
        res.send("update done");
      }
      else {
        res.send(err);
      }
    }
  );

});

////////////////////////////////////////////////////////////empDrinks/////////


const empSchema ={

type:String,
quantity:String,
todayDate:String

};


const Empdrinks = mongoose.model("empdrinks", empSchema);

app.route("/empDrinks")
.get(function(req,res) {

  Empdrinks.find({todayDate:currentDate},function(err,foundDrink) {
    if (!err) {
      res.send(foundDrink);

    }else {
      res.send(err);
    }
  })
})
.post(function(req,res) {

       const drinkType = req.body.type;
       const drinkQuantity = req.body.quantity;
        const newDrink = new Empdrinks({
          type:drinkType,
          quantity:drinkQuantity,
          todayDate:currentDate
        });
        newDrink.save(function (err) {
          if (!err) {
            res.send("data send sucsesfully");

          }else {
            res.send(err);
          }
        });


});


//////////////////////////////////////////////hostDrinks//////////////////
const hostDrinksSchema ={

type:String,
quantity:String,
todayDate:String

};


const Hostdrinks = mongoose.model("hostdrinks", hostDrinksSchema);

app.route("/hostdrinks")
.get(function(req,res) {

  Hostdrinks.find({todayDate:currentDate},function(err,foundDrink) {
    if (!err) {
      res.send(foundDrink);

    }else {
      res.send(err);
    }
  })
})
.post(function(req,res) {

       const drinkType = req.body.type;
       const drinkQuantity = req.body.quantity;
        const newDrink = new Hostdrinks({
          type:drinkType,
          quantity:drinkQuantity,
          todayDate:currentDate
        });
        newDrink.save(function (err) {
          if (!err) {
            res.send("data send sucsesfully");

          }else {
            res.send(err);
          }
        });


});






/////////////////////////////////////////////////////////////////
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server started success");
});
