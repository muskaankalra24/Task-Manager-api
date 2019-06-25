const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()


const port = process.env.PORT 
app.use(express.json())

// without middleware -  new request-> run route handler
// with middleware    - new request->do something->run route handler

// app.use((req, res , next)=>{
//     if(req.method ==='GET'){
//         res.send(' get requests are disable')
//     }else{
//         next()
//     }

// })

// app.use((req, res , next)=>{
    
//         res.status(503).send(' site is under maintennace')
    

// })
app.use(userRouter)
app.use(taskRouter)



// const jwt = require('jsonwebtoken')
// const myFunction = async()=>{
//     const token = jwt.sign({_id:'abc123'}, 'thisismynew',{expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token,'thisismynew')
//     console.log(data)
// }

// myFunction()
// const Task = require('./models/task')
// const main = async () => {
//      const task = await Task.findById('5d0db4f3d25373438752254f')
//      await task.populate('owner').execPopulate()
//      console.log(task.owner)
// }

//      main()

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         //if(!file.originalname.endsWith('.pdf')){
//             if(!file.originalname.match(/\.(doc|docx)$/)){
//                 return cb(new Error('Please upload a word document'))
//             }
//             //return cb(new Error('Please upload a PDF'))
 
//     cb(undefined, true)
//     }
// })
    

// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// },(error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })



app.listen(port, () => {
 console.log('Server is up on port'+ port)
 })


