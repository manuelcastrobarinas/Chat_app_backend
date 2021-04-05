const Usuario  = require('../models/usuario')

const getUsuarios = async (req,res) => {

    const desde   = Number(req.query.desde) || 0;
    const usuarios=  await Usuario.find({_id:{ $ne:req.uid }}).sort('-online').skip(desde).limit(30);
    res.json({
        ok:true,
        msg:'retorno de todos los usuarios',
        usuarios:usuarios,
        desde
    });
}

module.exports = {getUsuarios}