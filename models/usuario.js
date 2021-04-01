const{Schema, model, modelNames}= require("mongoose");


const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...datosExtraidos} =this.toObject();
    datosExtraidos.uid = _id;
    return datosExtraidos
});

module.exports =model('Usuario',UsuarioSchema);
