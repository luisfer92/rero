const mongoose=require('mongoose');
const ATLAS_DATABASE_USR=process.env.ATLAS_DATABASE_USR;
console.log(process.env)
console.log(ATLAS_DATABASE_USR)
const old='mongodb://localhost/rerovaji'
mongoose.connect(old, { useNewUrlParser: true ,useUnifiedTopology: true})
.then(db=>{
    console.log('Conexion establecida con la base de datos')
})
.catch(err=>console.log(err))




module.exports=mongoose