const express =require('express');
const router=express.Router();

const Trabajador=require('../models/trabajador')
const Horario=require('../models/horario')
const Local=require('../models/local')



router.get('/',async (req,res)=>{
    const ids=req.query.id
    var locales=[]
    
    if(ids){
        locales = await Local.find().where('_id').in(ids).exec();
    }else{
        
        if(req.permiso.canAny){
            locales=await Local.find()
        }else{
            const own_locales=req.usuario_logeado._own_locales
            locales = await Local.find().where('_id').in(own_locales).exec();
        }

    }
   

    
    
    res.json(locales)
    
    
})



router.get('/:id',async(req,res)=>{
    const local= await Local.findById(req.params.id)
    .populate('plantilla')
        .populate({
            path:'horarios',
            options:{limit:10}
        })
    
    res.json(local)
})


router.post('/', async (req,res)=>{
    const local=new Local(req.body)
    await local.save()
    res.json(local)
})


router.delete('/:id', async (req,res)=>{
    const local=await Local.findByIdAndDelete(req.params.id)
    const horarios_borrados=await Horario.remove({_id:{$in:local.horarios}})
    const trabajadores_borrados=await Trabajador.remove({_id:{$in:local.plantilla}})
    res.json({status:"ok",horarios_borrados,trabajadores_borrados})
})

router.delete('/:id/horarios', async (req,res)=>{
    const local=await Local.findById(req.params.id)
    const horarios_borrados= await Horario.remove({_id:{$in:local.horarios}})
    local.horarios=[]
    local.save()
    res.json({status:"ok",horarios_borrados})
})

router.delete('/:id/plantilla', async (req,res)=>{
    const local=await Local.findById(req.params.id)
    const trabajadores_borrados= await Trabajador.remove({_id:{$in:local.plantilla}})
    console.log(trabajadores_borrados)
    local.plantilla=[]
    local.save()
    res.json({status:"ok",trabajadores_borrados})
})



module.exports=router