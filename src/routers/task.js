const express = require('express')
const router  = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth,  async (req, res) => {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
  })
    

// GET /tasks?completed=true
 router.get('/tasks', auth, async (req, res) => {
   
   try {
        const tasks = await Task.find({owner: req.user._id
           
        })
        res.send(tasks)
     } catch (e) {
         res.status(500).send()
     }
 })

// GET /tasks?completed=true
// router.get('/tasks', auth, async (req, res) => {
//     const match = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     try {
//         await req.user.populate({
//             path: 'tasks',
//             match
//         }).execPopulate()
//         res.send(req.user.tasks)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send()
//     }
// })

 router.get('/tasks/:id', auth, async (req, res) => {
            const _id = req.params.id
            try{
                const task = await Task.findOne({_id, owner: req.user._id})
                if(!task){
                    return  res.status(404).send()
                 }
                 res.send(task)
            }
          catch(e){
             res.status(500).send()
                 }
             })

 

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completion']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
   if(!isValidOperation){
       return res.status(400).send({error: "invalid update"})
   }
    
        try{
            const task =  await Task.findOne({_id, owner: req.user._id})
            if(!task){
                return  res.status(404).send()
                 }
                 updates.forEach((update) => task[update] = req.body[update])

            await task.save()
       
      // const task =  await Task.findByIdAndUpdate(_id, req.body ,{new: true ,runValidators: true})
        
        res.send(task)
        }
        catch(e){
        res.status(500).send()
                    
       }
    })
   

   
   router.delete('/tasks/:id',auth,  async (req, res) => {
        const _id = req.params.id
        try{
            const task = await Task.findOneAndDelete({_id, owner:req.user._id})
            if(!task){
                return  res.status(404).send()
             }
             res.send(task)
        }
      catch(e){
         res.status(500).send()
             }
         })

         module.exports = router
