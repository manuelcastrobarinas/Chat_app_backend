const moongose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await moongose.connect(process.env.DB_CONECTION,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
            
    console.log('base de datos en linea');
        
    } catch (error) {
        console.log(error);
        throw new Error('error en la base de datos');
    }
}

module.exports = { dbConnection }