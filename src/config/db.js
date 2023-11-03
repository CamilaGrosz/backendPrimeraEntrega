import  mongoose  from 'mongoose';
const dbUrl = 'mongodb://localhost/dataBase';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const Product = mongoose.model('Product', {
    id: Number,
    nombre: String,
    precio: Number,
    descripcion: String,
    disponible: Boolean
});

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
    console.log('Conexión exitosa a la base de datos.');
});

export default mongose;