const mongoose=require('mongoose');





const database_url=process.env.DATABASE_URL;

console.log(database_url)
mongoose.connect(database_url, { useNewUrlParser: true ,useUnifiedTopology: true})
.then(db=>{
    console.log('Conexion establecida con la base de datos')
})
.catch(err=>console.log(err))




module.exports=mongoose