const mongoose=require('mongoose');
const shortid = require('shortid');


const {Schema}=mongoose


const contrato_schema=new Schema({
    inicio:Date,
    fin:Date,
    horas:Number,
})

const trabajador_schema=new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    contrato:{type:contrato_schema},
    activo:{type:Boolean,default:true},
    alias:{type:String,unique:true,default:shortid.generate()},

    local_id:{type:Schema.Types.ObjectId,ref:"Local"}
})


module.exports=mongoose.model('Trabajador',trabajador_schema);