const express =require('express');
const router=express.Router(); 

const Horario=require('../models/horario');
const Local=require('../models/local')
const Trabajador=require('../models/trabajador')
const Usuario=require('../models/usuario')


router.get('/',async (req,res)=>{
    res.json({
        locales:await Local.find({}),
        Horarios:await Horario.find({}),
        Trabajadores: await Trabajador.find({}),
        Usuarios:await Usuario.find({})

    })
    
})


module.exports=router