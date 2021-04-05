const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    emisor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    receptor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    mensaje: {
        type:String,
        required: true,
    }
},{
    timestamps: true,
});

MensajeSchema.method('toJSON', function (){
    const {__v, _id, ...object } = this.toObject();
    return object;
});
module.exports = model('Mensaje',MensajeSchema);
