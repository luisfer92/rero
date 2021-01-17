const mongoose=require('mongoose');
const crypto=require('crypto')

var jwt = require('jsonwebtoken');

const {roles}=require ('../security/controlAcceso');

//CAMBIAR ESTA MIERDA
var {secret}=require('../security/controlAcceso')




const {Schema}=mongoose

const usuario_schema=new Schema({

    nombre:{type: String, lowercase: true, required: true, match: [/^[a-zA-Z0-9]+$/, 'no valido'], unique:true},
    correo:{type: String, lowercase: true, required: true, match: [/\S+@\S+\.\S+/, 'no valido'],unique:true},
    password:{type:String,required:true},
    validado:{type:Boolean,default:false},
    rol:{type:String,enum:roles,default:"BASE"},
    salt:{type:String},

    _own_locales:[{type:Schema.Types.ObjectId, ref:"Local"}],
    _own_trabajadores:[{type:Schema.Types.ObjectId, ref:"Trabajador"}],
    _own_horarios:[{type:Schema.Types.ObjectId, ref:"Horario"}]

},{timestamps:true})


usuario_schema.methods.setPassword=function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

usuario_schema.methods.validatePassword=function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password===hash
}

usuario_schema.methods.generateJWT=function(){
    const today=new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const token={
        id: this._id,
        correo: this.correo,
        exp: parseInt(exp.getTime() / 1000),
    }
    return jwt.sign(token, secret);
};

usuario_schema.methods.toJson=function(){
    
   
    return {
        _id:this._id,
        id:this.id,
        rol:this.rol,
        nombre:this.nombre,
        correo:this.correo,
        contrato:this.contrato,
        validado:this.validado,
        token:this.generateJWT(),
        _own_locales:this._own_locales,
        _own_horarios:this._own_horarios,
        _own_trabajadores:this._own_trabajadores,
        createdAt:this.createdAt,
        updatedAt:this.updatedAt 
    }
}


module.exports=mongoose.model('Usuario',usuario_schema)







