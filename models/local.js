const mongoose=require('mongoose');

const {Schema}=mongoose



const local_schema=new Schema({
    direccion:{type:String,required:true},
    alias:{type:String,unique:true,required:true},

    horarios:[{type:Schema.Types.ObjectId, ref:"Horario"}],
    plantilla:[{type:Schema.Types.ObjectId, ref:"Trabajador"}],

})


module.exports=mongoose.model('Local',local_schema);




