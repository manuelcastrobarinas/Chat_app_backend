
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req,res) => {

    const miId = req.uid;
    const mensajesEmisor = req.params.emisor;
    
    const lastMensaje = await Mensaje.find({
        $or: [ { emisor:miId , receptor: mensajesEmisor } , {emisor:mensajesEmisor , receptor:miId }]
    }).sort({ createdAt:'desc'}).limit(30);
   
    res.json({
        ok:true,
        mensajes:lastMensaje
    });
}

module.exports ={ obtenerChat };