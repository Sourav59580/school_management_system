var express=require('express')
var bodyParser=require('body-parser')
var mysql=require('mysql')
var cookieParser=require('cookie-parser')
var app=express()
app.use(cookieParser())
app.set('view engine','ejs')
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))
app.listen(3000,(req,res)=>{
console.log("server is running on 3000 port")
})
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'school_management'
})

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/admin',(req,res)=>{
    res.render('admin')
})
app.get('/student',(req,res)=>{
    res.render('student')
})
app.get('/teacher',(req,res)=>{
    res.render('teacher')
})
app.post('/Register',(req,res)=>{
    var username=req.body.username
    var email=req.body.email
    var password=req.body.password
    var phone=req.body.phone
    var category=req.body.category
    console.log(req.body.category);
    var putData='insert into signup (USERNAME, EMAIL, PASSWORD, PHONE,CATEGORY) value(?,?,?,?,?)'
    connection.query(putData, [username, email, password, phone,category], (error,result)=>{
        if( error) throw error
        res.redirect('/')   
    })
})
app.post('/dashboard',(req,res)=>{
    var email=req.body.email
    var password=req.body.password
    var getData='select * from signup where EMAIL=?'
    connection.query(getData, [email], (error,result)=>{
        if(error) throw error
        else if(result[0].PASSWORD==password)
        {
            var responseCategory=result[0].CATEGORY
            console.log(responseCategory)
            res.cookie('cookieEmail' , email , {maxAge:900000000,httpOnly:true})
            var userData={
                username : result[0].USERNAME,
                email: result[0].EMAIL,
                password: result[0].PASSWORD
                
            }
            var cookieEmail=req.cookies.cookieEmail
            var getData='select * from signup where EMAIL =?'
            connection.query(getData, [cookieEmail], (error,result)=>{
            if ( error ) throw error
            var userAllData=result
            console.log(userAllData)
            if(responseCategory=='Admin')
            res.render('admin' , {userData,userAllData})
            else if(responseCategory=='Student')
            res.render('student' , {userData,userAllData})
            else if(responseCategory=='Teacher')
            res.render('teacher' , {userData,userAllData})

        //   res.sendFile(__dirname+'/views/index.html')
            
        })
        
    }})
})

//admin login process
// app.post('/dashboard', (req, res)=>{
//         var email = req.body.email
//         var password = req.body.password
    
//         if( email == 'abc@gmail.com')
//         {
//             if( password == 670)
//             {   
//                 res.redirect('admin')   
//             }
//         }
//     })

//start logout process
app.post('/logout',(req,res)=>{
    console.log(req.cookies.cookieEmail)
    res.clearCookie('cookieEmail')
    res.redirect('/')
    
})


















