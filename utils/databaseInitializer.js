const Usuario=require('../models/usuario')


const initialaizer=async ()=>{
    console.log("Check a la base de datos en busca de las entradas minimas para funcionar")
    const hasAdmin=await Usuario.find({rol:"ADMIN"})
    if(hasAdmin.length===0){
        const admin=new Usuario({nombre:"admin",correo:"admin@yahoo.es",rol:"ADMIN"})
        admin.setPassword("galletita")
        await admin.save()
    }else{
        console.log("Administrador en bd")
    }
}


module.exports=initialaizer