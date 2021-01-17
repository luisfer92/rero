const control=require('./controlAcceso').controlAcceso

const accesos={
        "GET":(ac,resource)=>{
            return {any:ac.readAny(resource),own:ac.readOwn(resource),ac:ac}
        },
        "POST":(ac,resource)=>{
            return {any:ac.createAny(resource),own:ac.createOwn(resource),ac:ac}
        },
        "PATCH":(ac,resource)=>{
            return {any:ac.updateAny(resource),own:ac.updateOwn(resource),ac:ac}
        },
        "DELETE":(ac,resource)=>{
            return {any:ac.deleteAny(resource),own:ac.updateOwn(resource),ac:ac}
        }
    }

const isMine={

    "local":(usuario,resource_id)=>{
        return usuario._own_locales.includes(resource_id)
    },

    "usuario":(usuario,resource_id)=>{
        return usuario.id==resource_id
    },

    "trabajador":(usuario,resource_id)=>{
        return usuario._own_trabajadores.includes(resource_id)
    },

    "horario":(usuario,resource_id)=>{
        return usuario._own_horarios.includes(resource_id)
    },

    

    
}

module.exports=function (req,res,next){
   
    const resource=String(req.originalUrl).split("/")[2]
    const usuario=req.usuario_logeado   
    const crud=req.method
    const permiso=accesos[crud](control.can(usuario.rol),resource)

    console.log(permiso)
    if(resource && (permiso.any.granted||permiso.own.granted)){
        console.log("tengo algun tipo de permiso sobre el recurso")
        //existe el recurso y tengo algun permiso sobre el
        if(permiso.any.granted){
            console.log("tengo permiso sobre cualquier elemento de la tabla "+resource)
            req.permiso=Object.assign({},permiso,{ac:permiso.any,canAny:true})
            next()
        }else if (!permiso.any.granted && permiso.own.granted){
            console.log("tengo permiso sobre el elemento de la tabla "+resource+" porque esta en mis own")
            if(req.params.id) {
                if(isMine[resource](usuario,req.params.id)){
                    console.log("se pide un unico elemento y tengo permiso sobre el")
                    next()
                }else{
                    console.log("se pide un unico elemento y NO tengo permiso sobre el")
                    res.json({"error":"No tienes permiso para hacer esto"})
                }
            }else{
                console.log("se pide una lista de elemento y no se si tengo permiso sobre el")
                req.permiso=Object.assign({},permiso,{ac:permiso.own})
                next()
            }
            
        }else{
            console.log("no tengo permiso sobre este recuso")
            res.json({"error":"No tienes permiso para hacer esto"})
        }
        
    }else{
        
        res.json({"error":"No tienes permiso para hacer esto"})
    }
   
    
}