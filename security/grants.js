
const local_grant_list=[

    {role:"ADMIN",resource:"local",action:"create:any",attributes:"*"},
    {role:"ADMIN",resource:"local",action:"read:any",attributes:"*"},
    {role:"ADMIN",resource:"local",action:"update:any",attributes:"*"},
    {role:"ADMIN",resource:"local",action:"delete:any",attributes:"*"},

    {role:"ENCARGADO",resource:"local",action:"read:own",attributes:"*"},

    {role:"BASE",resource:"local",action:"read:own",attributes:"*, !plantilla"},
]

const trabajador_grant_list=[

    {role:"ADMIN",resource:"trabajador",action:"create:any",attributes:"*"},
    {role:"ADMIN",resource:"trabajador",action:"read:any",attributes:"*"},
    {role:"ADMIN",resource:"trabajador",action:"update:any",attributes:"*"},
    {role:"ADMIN",resource:"trabajador",action:"delete:any",attributes:"*"},

    
    {role:"ENCARGADO",resource:"trabajador",action:"read:any",attributes:"*, !contrato"},
    {role:"ENCARGADO",resource:"trabajador",action:"update:any",attributes:"*, !contrato"},

    {role:"BASE",resource:"trabajador",action:"read:any",attributes:"nombre"},

]

const horario_grant_list=[

    {role:"ADMIN",resource:"horario",action:"create:any",attributes:"*"},
    {role:"ADMIN",resource:"horario",action:"read:any",attributes:"*"},
    {role:"ADMIN",resource:"horario",action:"update:any",attributes:"*"},
    {role:"ADMIN",resource:"horario",action:"delete:any",attributes:"*"},

    {role:"ENCARGADO",resource:"horario",action:"create:any",attributes:"*"},
    {role:"ENCARGADO",resource:"horario",action:"read:any",attributes:"*"},
    {role:"ENCARGADO",resource:"horario",action:"update:any",attributes:"*"},
    {role:"ENCARGADO",resource:"horario",action:"delete:any",attributes:"*"},

    {role:"BASE",resource:"horario",action:"read:own",attributes:"*,!id"},
]

const usuario_grant_list=[
    {role:"ADMIN",resource:"usuario",action:"create:any",attributes:"*"},
    {role:"ADMIN",resource:"usuario",action:"read:any",attributes:"*"},
    {role:"ADMIN",resource:"usuario",action:"update:any",attributes:"*"},
    {role:"ADMIN",resource:"usuario",action:"delete:any",attributes:"*"},

    
    {role:"ENCARGADO",resource:"usuario",action:"read:own",attributes:"*,!id"},
    {role:"ENCARGADO",resource:"usuario",action:"update:own",attributes:"nombre,correo,password"},

    {role:"BASE",resource:"usuario",action:"read:own",attributes:"*,!id"},   
    {role:"BASE",resource:"usuario",action:"update:own",attributes:"nombre,correo,password"},

]


exports.grant_list=[...local_grant_list,...trabajador_grant_list,...horario_grant_list,...usuario_grant_list]

