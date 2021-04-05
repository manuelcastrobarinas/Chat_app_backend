const jwt = require("jsonwebtoken");


const generarToken = (uid)=>{
    
    return new Promise((resolve,reject)=>{

        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, (err,token)=>{
            if(err){
                reject('no se pudo generar el jwt');
            }else{
                resolve(token);
            }
        });
    });
}

const comprobarJWT = (token)=>{
    try {
    
        const { uid } = jwt.verify(token,process.env.JWT_KEY);
        return [true,uid]
  
    } catch (error) {
        return [false,null]
    }
}

module.exports ={ generarToken,comprobarJWT }