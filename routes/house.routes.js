import {Router} from "express"
import House from "../models/House.model.js"
import isAuthenticatedMiddleware from'../middlewares/isAuthenticatedMiddleware.js'

const housesRouter = Router()

housesRouter.post('/house', isAuthenticatedMiddleware, async(req,res) =>{
    const payload = req.body
    try{
      const newHouse = await House.create(payload)
      return res.status(201).json(newHouse)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error not create house"})
    }
})

housesRouter.get('/viewhouse', async(req, res)=> {
    try{
    const houses = await House.find({}).populate("userId")
    return res.status(200).json(houses)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
})
housesRouter.get('/viewhouse:id',isAuthenticatedMiddleware, async(req, res)=> {
    const{id} = req.params
    try{
    const house = await House.findById(id)
    return res.status(200).json(house)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
})
housesRouter.put('/updatehouse/:id', isAuthenticatedMiddleware, async(req,res) =>{
    const payload = req.body
    const{id} = req.params
    try{
      const updateHouse = await House.findOneAndUpdate({_id: id},payload, {new:true})
      return res.status(200).json(updateHouse)
    }catch{
        console.log(error)
        return res.status(500).json({message:"'Internal Server Error"})
    }
})

housesRouter.delete('/delete/:id', isAuthenticatedMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await House.findOneAndDelete({_id: id})
        return res.status(200).json({message:"House Deleted"})      
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})
    

export default housesRouter