require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')//
const path = require('path')
port =3000
const app = express()
const user_routes=require('./routes/users')
const category_route = require('./routes/categories')
const post_route = require("./routes/posts")
const userroute = require("./routes/user")
const multer=require("multer")
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/inkspire')
    .then(() => {
        console.log('connected to mongodb server')
        app.listen(port, () => {
            console.log(`App is running on port: ${port} `)
        })
    }).catch((err) => console.log(err))

// application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);

// starts with(^) / or ends with($) / or is index or index.html then 
app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//express defined middleware
app.use(express.json())

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.name);
//     },
// });

// const upload = multer({ storage: storage });
// app.post("/upload", upload.single("file"), (req, res) => {
//     res.status(200).json("File has been uploaded");
// } )

// routes
app.use('/users', user_routes)
app.use('/categories', category_route)
app.use('/posts', post_route)
app.use('/user', userroute)


// error handling middleware
// when there is value in err parameter then it gets executed

app.use((err, req, res, next) => {
    console.log(err.stack)  
    if (res.statusCode == 200) res.status(500)
    res.json({ "err": err.message })
})

module.exports = app