const { validationResult } = require("express-validator")
const Usuario = require("../models/usuario")
const bcrypt = require("bcryptjs");
const { generarToken } = require("../helpers/jwt");



const CrearUsuario = async (req,res)=>{
    
    const { email,password} = req.body;
     
    try {
        const FindEmail = await Usuario.findOne({email });
        if(FindEmail){
            return res.status(400).json({
                ok:false,
                mensaje:'este correo ya esta registrado'
            });
        }


        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
         
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();
       
        // generacion de jwt    
        const token = await generarToken(usuario.id);


        res.json({
            ok:true,
            msg:'crear usuario!!',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mensaje: 'hable con el administrador'
        });
    }
}


const login = async(req,res)=>{

    const {email,password} = req.body;
    try {  
        const usuarioDB= await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'email no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'la contraseña no es valida'
            });
        }   
        
        const token = await generarToken(usuarioDB.id);

        res.json({
            ok:true,
            msg:'usuario logeado',
            usuario:usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hable con el administrador error del servidor'
        });
    }
} 


const renewToken = async (req,res)=>{

    const uid = req.uid;
    const token = await generarToken(uid);

    const usuario= await Usuario.findById(uid);
    if(usuario){
        res.json({
            ok:true,
            usuario:usuario,
            msg:'token renovado',
            token: token
        });
    }

   

}

module.exports ={
    CrearUsuario,
    login,
    renewToken
}