const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido=async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}
   //verificar si el correo existe
const emailExiste=async(correo='')=>{
    existeEmail=await Usuario.findOne({correo, estado:true});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

//verificar si el ID existe en DB
const existeUsuarioPorID=async(id='')=>{
    existeUsuario=await Usuario.findOne({_id:id,estado:true});
    if(!existeUsuario){
        throw new Error(`El ID ${id} NO existe en la base de datos`);
    }
}
    
module.exports={esRoleValido,emailExiste,existeUsuarioPorID,}