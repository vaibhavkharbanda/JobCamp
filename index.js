const express= require('express');
const app= express();
const port =1122;
const expressLayouts= require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const session=require('express-session');
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



//using sass(css) as middleware 
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));



app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

//use static files
app.use(express.static('./assets'));


//Setup view engine
app.set('view engine','ejs');
app.set('views', './views');



//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

app.set('case sensitive routing',false);


//creating passport session with encr. key
app.use(session({
    name:'Job Camp',
    
    secret:'anykeygen',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //Store session cookies in MongoDB 
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/jobPortal',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mogodb store setup OK');
        }
    )
}));

//user passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use noty js / flash
app.use(flash());
app.use(customMware.setFlash);

//use express routers   
app.use('/',require('./routes'));



//Starting up the server on port ""
app.listen(port,function(err){
    if(err){
        console.log(`Error in opening the port:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});
