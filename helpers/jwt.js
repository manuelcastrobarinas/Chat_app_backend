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



module.exports ={ generarToken }