const mongoose=require('mongoose');
const ATLAS_DATABASE_USR=process.env.ATLAS_DATABASE_USR;
console.log(process.env)
console.log(ATLAS_DATABASE_USR)
const old='mongodb://localhost/rerovaji'
mongoose.connect('mongodb+srv://luisfer92:92Galletita@cluster0.igzkd.mongodb.net/rerovaji?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology: true})
.then(db=>{
    console.log('Conexion establecida con la base de datos')
})
.catch(err=>console.log(err))




module.exports=mongoose