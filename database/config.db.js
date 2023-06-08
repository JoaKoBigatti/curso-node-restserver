const mongoose=require('mongoose');

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la inicializacion de la base de datos');
    }
}

module.exports={
    dbConnection
}