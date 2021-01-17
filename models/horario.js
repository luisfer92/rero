const mongoose=require('mongoose');

const {Schema}=mongoose


const turno_schema=new Schema({
    inicio:Date,
    fin:Date,
    horas:{type:Number,default:0}
    
})

const dia_schema=new Schema({
    turnos:[turno_schema],
    horas:{type:Number,default:0},
    libre:{type:Boolean,default:false}
})

const semana_schema=new Schema({
    trabajador_alias:{type:String,required:true},
    lunes:{type:dia_schema},
    martes:{type:dia_schema},
    miercoles:{type:dia_schema},
    jueves:{type:dia_schema},
    viernes:{type:dia_schema},
    sabado:{type:dia_schema},
    domingo:{type:dia_schema},
    horas:{type:Number,default:0},
    horas_extra:{type:Number,default:0},
    
})


const horario_schema=new Schema({
    inicio:{type:Date,required:true},
    fin:{type:Date,required:true},
    local_id:{type:Schema.Types.ObjectId,ref:"Local"},
    cuadrantes:[semana_schema]
})


module.exports=mongoose.model('Horario',horario_schema)