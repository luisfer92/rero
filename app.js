const express=require('express');
const morgan=require('morgan');
const path=require('path')
const app =express();



const bypass=require('./security/bypass')


const validateToken=bypass(require('./security/validateToken'))
const validateAccess=bypass(require('./security/validateAccess'))

const {mongoose}=require('./database')
const dbInitialaizer=require('./utils/databaseInitializer')
dbInitialaizer()

//middleware
app.use(morgan('dev'))
app.use(express.json())

app.use(validateToken)
app.use(validateAccess)


//rutas


app.use('/api/trabajador',require('./routes/trabajador.routes'))
app.use('/api/horario',require('./routes/horario.routes'))
app.use('/api/local',require('./routes/local.routes'))
app.use('/api/usuario',require('./routes/usuario.routes'))

app.use('/api/',require('./routes/api.routes'))




module.exports = app;
