const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');
const {secret}=require('./controlAcceso')



module.exports=function(req,res,next){
    const token = req.headers['access-token'];
 
    if (token) {

      jwt.verify(token, secret, async(err, decoded) => {  
        console.log(decoded)    
        if (err) {
          //token no valido
          return res.json({ error: 'Token no valido' });    

        } else {
          //token valido
         
          req.usuario_logeado=await Usuario.findOne({correo:decoded.correo})
          
          req.usuario_logeado?next():res.send({error:"Tu usuario ya no existe"})
        }
      });
    } else {
      
        res.send({error: 'Token no suministrado.'});
      
     
      
    }
}