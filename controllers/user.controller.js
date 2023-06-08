const{response,request}=require('express');
const bcryptjs=require('bcryptjs');
const Usuario=require('../models/usuario');

const usuariosGet=async(req=request, res=response)=> {
    // const {q,nombre='no name',apikey,page='1',limit}=req.query
    const {limite=5,desde=0}=req.query;
    const query={estado:true}

    // const usuarios=await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total=await Usuario.countDocuments(query);

    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut=async(req=request, res=response)=> {
    const {id}=req.params;
    const {_id,password,google,correo, ...resto}=req.body;
    //TODO validar contra base de datos
    if(password){
        //encriptar la contraseña
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario=await Usuario.findByIdAndUpdate(id,resto);
    
    res.json(usuario);
}

const usuariosPost=async(req=request, res=response)=> {
    
    const {nombre,correo,password,rol}=req.body;
    const existeUsuarioEliminado=await Usuario.findOne({correo, estado:false});
    if(!existeUsuarioEliminado){
        const usuario=new Usuario({nombre,correo,password,rol});
        //encriptar la contraseña
        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt);
        //guardar en DB
        await usuario.save();
        res.json(usuario);
    }else{
        const {_id}=existeUsuarioEliminado
        let usuario=await Usuario.findByIdAndUpdate(_id,{estado:true})
        const salt=bcryptjs.genSaltSync();
        const contrasena=bcryptjs.hashSync(password,salt);
        usuario=await Usuario.findByIdAndUpdate(_id,{password:contrasena})
        res.json(usuario)
    }
}

const usuariosPatch=(req=request, res=response)=> {
    res.json({        
        msg:'patch API - controlador'
    });
}

const usuariosDelete=async(req=request, res=response)=> {
    const {id}=req.params;
    //borrado fisicamente
    // const usuario=await Usuario.findByIdAndDelete(id);

    //cambiar estado de usuario a false
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({        
        usuario
    });
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}