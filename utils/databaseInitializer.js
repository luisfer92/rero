const Usuario=require('../models/usuario')


const initialaizer=async ()=>{
    console.log("Check a la base de datos en busca de las entradas minimas para funcionar")
    const hasAdmin=await Usuario.find({rol:"ADMIN"})
    if(hasAdmin.length===0){
        const aName=process.env.DEFAULT_ADMIN_NAME;
        const aPWD=process.env.DEFAULT_ADMIN_PWD;
        const aMail=process.env.DEFAULT_ADMIN_MAIL;

        const admin=new Usuario({nombre:aName,correo:aMail,rol:"ADMIN"})
        admin.setPassword(aPWD)
        await admin.save()
    }else{
        console.log("Administrador en bd")
    }
}
 

module.exports=initialaizer