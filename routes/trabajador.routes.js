const express =require('express');
const router=express.Router();


const Trabajador=require('../models/trabajador')
const Horario=require('../models/horario')
const Local=require('../models/local')

router.get('/',async (req,res)=>{
   const trabajadores= await Trabajador.find()
   res.json(trabajadores)
});


router.post('/',async (req,res)=>{
    const trabajador_data=req.body
    var trabajador={}
    console.log(Trabajador.exists({alias:trabajador_data.alias}))
    if(!await Trabajador.exists({alias:trabajador_data.alias})){
         trabajador=new Trabajador(trabajador_data)

         await trabajador.save(async (err)=>{
            
            if(!err){
                const local=await Local.findOne({_id:trabajador.local_id})
                local.plantilla.push(trabajador._id)
                await local.save()
            }else{
                
                trabajador={error:"no se ha podido guardar el trabajador"}
            }
        })

    }else{
        trabajador={error:"alias en uso el trabajador ya existe"}
    }
    
    
    

    res.json(trabajador)
})


router.put('/:id',async (req,res)=>{

    const trabajador=await Trabajador.findByIdAndUpdate(req.params.id,req.body)
    console.log(trabajador)
    res.json({status:"ok"})
})


router.delete('/:id',async (req,res)=>{
    const trabajador=await Trabajador.findByIdAndRemove(req.params.id)
    const local=await Local.findById(trabajador.local_id)
    local.plantilla.pop(trabajador.__id)
    await local.save()
    res.json({status:"ok"})
})


router.delete('/reset/all',async(req,res)=>{
    const trabajadores_borrados=await Trabajador.remove({});

     res.json({status:"ok",trabajadores_borrados})
})


module.exports=router