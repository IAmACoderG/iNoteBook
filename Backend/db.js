//working
const mongoose = require('mongoose');
const mongoURI = '127.0.0.1:27017';
const database = 'iNoteBook';


const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://${mongoURI}/${database}`)

        console.log("connect to mongo successfully");

    } catch (err) {
        console.log("failed to connect", err)
    }
};

module.exports = connectToMongo;


// //not working
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017';



// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI)

//         console.log("connect to mongo successfully");

//     } catch (err) {
//         console.log("failed to connect", err)
//     }
// };
//module.exports = connectToMongo;





//working
// const mongoose = require('mongoose');
// const server = '127.0.0.1:27017';

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(`mongodb://${server}`);

//         console.log("mongo connected");
//     }catch(err){
//         console.log('failed to connected mongo',err)
//     }

//     };
// module.exports = connectToMongo;