const express =require('express');
const router=express.Router(); 

const Horario=require('../models/horario');
const Local=require('../models/local')


router.get('/', async (req,res)=>{
    const horarios=await Horario.find()
    res.json(horarios)
})


router.post('/',async (req,res)=>{
    const horario_data=req.body
    const horario=new Horario(horario_data)
    await horario.save(async (err,h)=>{
        const local=await Local.findById(h.local_id)
        local.horarios.push(h._id)
        local.save()
       console.log(local)
    })
    res.json(horario)
})

router.delete('/:id',async (req,res)=>{
    const horario=await Horario.findByIdAndRemove(req.params.id)
    const local=await Local.findById(horario.local_id)
    local.horarios.pop(horario.__id)
    await local.save()
    res.json({status:"ok"})
})




module.exports=router