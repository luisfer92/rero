const express =require('express');

const router=express.Router();

const Usuario=require("../models/usuario")



const validator=(usr,data,permiso)=>{
    
    const {nombre,correo,password,validado,_own_locales,rol}=permiso.filter(data)
    
   const datavalid=Object.assign(

     {},
     data,
     
        {
            nombre:(nombre && nombre!=="")?nombre:usr.nombre,
            correo:(correo && correo!=="")?correo:usr.correo,
            password:(password && password!="")?password:undefined,
            validado:validado!==undefined?validado:usr.validado,
            _own_locales:_own_locales!==undefined?_own_locales:usr._own_locales,
            rol:rol!==undefined?rol:usr.rol
        }
    )

   console.log(datavalid)

    return datavalid
}




router.get('/',async (req,res)=>{
    const ids=req.query.id
    var usuarios=[]
    
    if(ids){
        usuarios = await Usuario.find().where('_id').in(ids).exec();
        usuarios=usuarios.map(usuario=>usuario.toJson())
    }else{
        
        if(req.permiso.canAny){
            usuarios=await Usuario.find()
            usuarios=usuarios.map(usuario=>usuario.toJson())
        }else{
            const own_usuarios=req.usuario_logeado._own_usuarios
            usuarios = await Usuario.find().where('_id').in(own_usuarios).exec();
            usuarios=usuarios.map(usuario=>usuario.toJson())
            if(usuarios.length==0){
                usuarios={"error":"no tienes permiso"}
            }
        }

    }
   

    
    
    res.json(usuarios) 
})

router.get('/:id',async(req,res)=>{
    const usuario=await Usuario.findById(req.params.id)
    const permiso=req.permiso.ac
    
    
    res.json(permiso.filter(usuario.toJson()))
})

router.post('/exist',async (req,res)=>{
    
    const askCorreo="correo" in req.body
    const askNombre="nombre" in req.body
    const query=askCorreo?{correo:req.body["correo"]}:askNombre?{nombre:req.body["nombre"]}:false
    
    const isUsuario=query?await Usuario.exists(query):{error:"No se puede consultar ese campo"}

    
    res.json({result:isUsuario})
   
})

router.post('/register',async (req,res)=>{
    
    if(await Usuario.findOne({correo:req.body["correo"]})!==null){
        res.json({error:"usuario ya resgistrado"})
    }else{
        const usuario=new Usuario(req.body)
        usuario.setPassword(req.body["password"])
        await usuario.save()
        res.json(usuario)
    }
   
})

router.post('/login',async (req,res)=>{
    
    const usuario=await Usuario.findOne({correo:req.body["correo"]})
    
    if(usuario!==null){

        if (usuario.validatePassword(req.body["password"])){
            res.json(usuario.toJson())
        }else{
            res.json({error:"la contraseña no es correcta"})
        }
    }else{
        res.json({error:"usuario no existe"})
    }


    
})

router.patch('/:id',async(req,res)=>{

    var usuario=await Usuario.findById(req.params.id) 

    const {correo,password,nombre,validado,_own_locales,rol}=validator(usuario,req.body,req.permiso.ac)
    var correo_existente=await Usuario.findOne({correo:correo})
    var nombre_existente=await Usuario.findOne({nombre:nombre})

     

    

    const patch_and_save=async ()=>{

        
        if(password){
            usuario.setPassword(password)
        }
        
        usuario.nombre=nombre
        usuario.validado=validado
        usuario.correo=correo
        usuario._own_locales=_own_locales
        usuario.rol=rol
        await usuario.save()
        return (usuario)
    }

    if(correo_existente===null && nombre_existente===null){
    //si no hay nadie con esos datos los cambio directamente  
        usuario=await patch_and_save()
        res.json(usuario.toJson())
      
    }else{
        //alguien tiene el correo o el nombre 
        correo_existente=correo_existente!==null?correo_existente:usuario
        nombre_existente=nombre_existente!==null?nombre_existente:usuario
        //para que no de error si no existe el usuario con el correo o el nombre se iguala al de la peticion
       

        if((correo_existente.id===nombre_existente.id) && (usuario.id===correo_existente.id)){
            //es el propio usuario el que tiene el nombre o el correo se pueden usar 
            usuario=await patch_and_save()
            res.json(usuario.toJson())

        }else{
            res.json({error:"nombre o correo en uso"})
        }
            
        
    }   
})

router.delete('/:id',async(req,res)=>{
    const usuario=await Usuario.findByIdAndDelete(req.params.id)
    res.json(usuario)
})


router.delete('/reset/all',async(req,res)=>{
    const usuarios_borrados=await Usuario.remove({});

     res.json({status:"ok",usuarios_borrados})
})

module.exports=router