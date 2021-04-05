const { io } = require('../index');
const {comprobarJWT} = require('../helpers/jwt')

const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token']); // recibir el token por los headers del frontend  
    
    if(!valido) () => client.disconnect();  // comprobar que el cliente se desconecto con jwt
    usuarioConectado(uid);  // actualizar estado del cliente a conectado en la db

    client.join(uid);//unir usuario a la sala

   client.on('mensaje-personal',async (payload)=>{ //escuchar evento 'mensaje-personal' que el backend emite
    console.log(payload);

    await grabarMensaje(payload); // guardar el mensaje en la base de datos cuando se emite

    io.to(payload.receptor).emit('mensaje-personal',payload); // uniendo al receptor a la sala y enviandole el mensaje solo a el
   }); 
   
   
    client.on('disconnect', () => { 
        usuarioDesconectado(uid);  //actualizar el estado del cliente a desconectado en la db
        console.log('Cliente desconectado');
    });
});
