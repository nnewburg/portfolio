"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
const ENV         = process.env.ENV || "development";
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const PORT = 8080;
const path = require('path');
const bcrypt = require('bcrypt');

app.set("view engine", "ejs");

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/barChart/'),
                      path.join(__dirname, 'views/battleship/'),
                      path.join(__dirname, 'views/tinyApp/'),
                      path.join(__dirname, 'views/pizzaShack/'),
                      path.join(__dirname, 'views/resourceWall/')]);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");



app.use("/api/users", usersRoutes(knex));


app.get("/", (req, res) => {
     return res.render("index");
  })

app.get("/aboutme", (req, res) => {
     return res.render("index");
  })

app.get("/resume", (req, res) => {
     return res.render("resume");
  })

app.get("/projects", (req, res) => {
     return res.render("projects");
  })

app.get("/barChart", (req, res) => {
     return res.render("barChartIndex");
  })


app.get("/battleship", (req, res) => {
     return res.render("battleshipIndex");
  })

// Seperated Routes for each Order
const orderRoutes = require("./routes/orders");
const itemRoutes = require("./routes/items");
const allOrderRoutes = require("./routes/allOrders")

// Mount all order routes
app.use("/api/orders", orderRoutes(knex));

// Mount all order routes
app.use("/api/items", itemRoutes(knex));

app.use("/api/allOrders", allOrderRoutes(knex));



app.get("/pizzashack", (req, res) => {

    if(req.session.user){

      if (req.session.user.admin){
        res.redirect("/pizzashack/admin")
     }
    }
      // if(req.session.user){
      //    res.redirect("/admin")
      // }

      let templateVars = {user: req.session.user};
      if(req.session.user){
        return res.render("pizzashack_index", templateVars);
      } else {
         return res.render("pizzashack_index", templateVars)
      }
  })

app.get("/pizzashack/login", (req, res) => {
   if(req.session.user){
    if ("admin" in req.session.user){
      res.redirect("/pizzashack_admin")
    }
  }

  // let templateVars = {user: req.session.user};
  res.render("pizzashack_login")
})

app.get("/pizzashack/checkOut", (req, res) => {
   if(req.session.user.admin == true){
     res.redirect("/pizzashack/admin")
   }

  let templateVars = {user: req.session.user};
  res.render("pizzashack_checkOut", templateVars)
})

app.get("/pizzashack/admin", (req, res) => {
  let templateVars = {user: req.session.user}
  res.render("pizzashack_admin", templateVars)
})

app.post("/pizzashack/login", (req, res) => {

  // if(req.body.email === "" || req.body.password === "" || req.body.name === "" || req.body.phone === ""){
  //   return res.status(400).send("<h1>Status Code: 403<h1> Cannot register with an empty email or password</h1>");
  // }

  let cryptedPword = bcrypt.hashSync(req.body.password, 10)

  if(req.body.adminPword == "PizzaShack"){
    knex("pizzashack_users").insert({email: req.body.email, password: cryptedPword, name: req.body.name, admin:true}).then(result => {
    knex("pizzashack_users").where({email: req.body.email}).then(result => {
    req.session.user = result[0]

    res.redirect("/pizzashack/admin")
   })
  })
  }
  else{
    knex("pizzashack_users").insert({email: req.body.email, password: cryptedPword, name: req.body.name, phone: req.body.phone, admin:false}).then(result => {
     knex("pizzashack_users").where({email: req.body.email}).then(result => {
      req.session.user = result[0]

      res.redirect("/pizzashack")
     })
    })
  }
})

app.post("/pizzashack/logout", (req, res) => {
  knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).update({currentOrder: false}).then(result =>{
    req.session.user = null
    console.log(req.session.user)
    res.redirect("/pizzashack")
  })
})

app.post("/pizzashack/addItem", (req, res) => {
  console.log("added ---" + req.body.id)
  knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).then(result =>{
    if(!result[0]){
      knex("pizzashack_orders").insert({user_id: req.session.user.id, currentOrder: true, orderCompleted: false}).then(result => {
        knex("pizzashack_orders").where({currentOrder:true}).update({itemsOrdered:req.body.id}).then(result => {
          res.redirect("/pizzashack")
        })
      })
    }
    else {
      knex.select('itemsOrdered').from("pizzashack_orders").where({currentOrder: true}).then(result => {
        if(result[0].itemsOrdered){
          knex("pizzashack_orders").where({currentOrder:true}).update({itemsOrdered:result[0].itemsOrdered + ',' + req.body.id}).then(result => {
            res.redirect("/pizzashack")
          })
        }
        else{
          knex("pizzashack_orders").where({currentOrder:true}).update({itemsOrdered:req.body.id}).then(result => {
            res.redirect("/pizzashack")
          })
        }
      })
      }
  })
})

app.post("/pizzashack/decrementItem", (req,res) => {
console.log("removed ---" + req.body.id)
  let str = req.body.id + ","
    knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).then(result =>{
      knex("pizzashack_orders").where({currentOrder:true}).update({itemsOrdered:result[0].itemsOrdered.replace(str, "")}).then(result => {
        res.redirect("/pizzashack")
      })
    })
})

app.post("/pizzashack/removeItem", (req, res) => {
   knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).then(result => {
      let parse = req.body.id.slice(6, req.body.id.length)
      knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).then(result => {
        let matrix = result[0].itemsOrdered.split(',')
        let removed = matrix.filter(word => word !== parse)
        removed = removed.join(",")
        knex("pizzashack_orders").where({currentOrder:true}).update({itemsOrdered:removed}).then(result => {
      })
    })
    })
      res.redirect("/pizzashack")
})

app.post("/pizzashack/confirmOrder", (req, res) => {

  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  knex("pizzashack_orders").where({user_id: req.session.user.id, currentOrder: true}).update({Phone: req.session.user.phone, totalCost: req.body.totCost, currentOrder: false, orderCompleted:true, Date: date }).then(result =>{
    // twilioClient.messages.create({
    //   to: '+1' + req.session.user.phone,
    //   from: '+12563673421',
    //   body: 'Your order from PizzaShack has been placed'
    // }).then(result => {
      res.redirect("/pizzashack")
    // })
  })
})




//Route to the urls index,
//The target of the create urls_new ejs page generates its
//short URL and adds the input longURL as well as userID
app.post("/tinyApp/urls", (req, res) => {
  let shortURL = generateRandomString();

  knex("tinyapp_urls").insert({longurl: req.body.longURL,shorturl: shortURL, userid:req.session.user_id}).then(result => {
    res.redirect('/tinyApp/urls/' + shortURL);
  })
});

//Route to the delete functionality,
//Disables someone from deleting links who is not the owner
app.post("/tinyApp/urls/:shortURL/delete", (req,res) =>{

  knex('tinyapp_urls').where({shorturl: req.params.shortURL }).del().then(result => {
    res.redirect('/tinyApp/urls/');
  })
});

//Route to the page to update shortURLS checks if the current cookie is a registered user
//if not redirects them back to the index
app.post("/tinyApp/urls/:id", (req,res) =>{

  knex("tinyapp_urls").where({shorturl: req.params.id}).update({longurl: req.body.updatedURL}).then(result => {
    res.redirect('/tinyApp/urls/');
  })
});

//login route with proper error messages retrieves the email and password
//from the login form and compares them to the users database
app.post("/tinyApp/login", (req,res) =>{
  let loginEmail = req.body.email;
  let loginPassword = req.body.password;

knex("tinyapp_users").where({email: req.body.email}).then(result => {

    if(result.length){
      if(bcrypt.compareSync(loginPassword, result[0].password)){
        req.session.user_id = result[0].cookieid;
        return res.redirect("tinyApp/urls/");
      } else {
          return res.status(403).send("<h1>Status Code: 403<h1>Wrong Password</h1>");
      }
    } else {
       return res.status(403).send("<h1>Status Code: 403<h1>Email not found</h1>");
    }
  })
})

//logout route, clears the current cookie and redirects to the index page
app.post("/tinyApp/logout", (req,res) =>{
  req.session = null;
  res.redirect('urls/');
});

//register route firstly creating a randomID for the new user
//two if statements to ensure the password or email are not empty
//retrieving the email and password from the form on the register template
//hashing the password when it is stored in the database
//setting the cookie to random ID
app.post("/tinyApp/register", (req, res) =>{
  let randomID = generateRandomString();
  let ogPassword = req.body.password;

  if(req.body.email === "" || req.body.password === ""){
    return res.status(400).send("<h1>Status Code: 403<h1>Cannot register with an empty email or password</h1>");
  }

 knex('tinyapp_users').where({email: req.body.email}).then(result =>{

  let makeAccnt = result.length
  if(result.length){
      return res.status(400).send("<h1>Status Code: 403<h1>E-mail is already taken</h1>");
  }
  else{
        knex('tinyapp_users').insert({cookieid:randomID, email: req.body.email, password: bcrypt.hashSync(ogPassword, 10)}).then(result =>{
          req.session.user_id = randomID;
          res.redirect('urls/');
        })
      }
      })
})

//generate a random id 6 characters in length consisting of alphanumeric numbers except _
function generateRandomString() {
  let alphaNumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let output = "";

  for(let i = 0; i < 6; i++) {
    output += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
  }
  return output;
}

//root get renders the index page
app.get("/tinyApp", (req, res) => {
  if(req.session.user_id){
    res.redirect('/tinyApp/urls');
  }
  else{
    res.redirect('/tinyApp/login');
  }
});

app.get("/tinyApp/urls", (req, res) => {

if(req.session.user_id){
  knex("tinyapp_users").where({cookieid: req.session.user_id}).then(result => {
    let userID = result[0].cookieid
    let email = result[0].email
    knex("tinyapp_urls").where({userid: userID}).then(result => {
      let filteredDB = {}
      for(let short of result){
        filteredDB[short.shorturl] = short.longurl
      }
       let templateVars = {user: email, urls: filteredDB };
       res.render("urls_index", templateVars);
    })

    })
} else{
    res.redirect('/tinyApp/login');
}
});

//get route to render the create new shortURL only for the currently logged in user
//otherwise redirects to login menu
app.get("/tinyApp/urls/new", (req, res) => {

  knex("tinyapp_users").where({cookieid: req.session.user_id}).then(result => {
    let userID = result[0].cookieid
    let email = result[0].email
    knex("tinyapp_urls").where({userid: userID}).then(result => {
      let filteredDB = {}
      for(let short of result){
        filteredDB[short.shorturl] = short.longurl
      }
       let templateVars = {user: email, urls: filteredDB };
    if(req.session.user_id !== undefined){
       res.render("urls_new", templateVars);
     } else {
        return res.render("pleaselogin", templateVars);
     }
    })

  })
});

//route to show a specific tiny URLS page
app.get("/tinyApp/urls/:shortURL", (req, res) => {
  knex("tinyapp_urls").where({shorturl: req.params.shortURL}).then(result => {
    let templateVars = {user: result[0].userid, shortURL: result[0].shorturl, longURL: result[0].longurl };
    res.render("urls_show", templateVars);
  })
});

//get route that redirects the user to the Long URL
app.get("/tinyApp/u/:shortURL", (req, res) => {
let templateVars = {user: users[req.session.user_id], urls: urlDatabase };
  knex("tinyapp_urls").where({shorturl: req.params.shortURL}).then(result => {
    if(result[0]){
      res.redirect(result[0].longurl);
  } else {
    res.render("nosuchURL", templateVars)
  }
  })

});

//get route to the register page
app.get("/tinyApp/register", (req, res) => {
  let templateVars = {user: req.session.user_id  };
  res.render("register", templateVars);
});

//get route to the login menu
app.get("/tinyApp/login", (req, res) => {
  let templateVars = {user: req.session.user_id  };
  res.render("login", templateVars);
});

app.get("/resourcewall", (req, res) => {
    let templateVars = {user: req.session.user};
  if(req.session.user){
    res.redirect(`/resourceWall_resources/${req.session.user.id}`)
  } else {
    res.redirect(`/resourceWall_resources`)
  }

  })

app.get("/resourceWall_resources", (req, res) => {
  let templateVars = {user: req.session.user};
  res.render("resourceWall_index", templateVars);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

