const controlAcceso=require('accesscontrol')

const roles=["ADMIN","ENCARGADO","BASE"]
const {grant_list}=require('./grants')

exports.roles=roles


const ac=new controlAcceso(grant_list)


exports.controlAcceso=ac
exports.secret=process.env.CONTROL_ACCESO_SECRET