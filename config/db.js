const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const uri ="mongodb+srv://thanhdtph34899:WsxC9uKbGFZ0vBum@mydatabase.tex0ros.mongodb.net/lab3";

const connect= async()=>{
    try {
        await mongoose.connect(uri,{
            
        })
        console.log('thành công');
    } catch (error) {
        console.log(error);
        console.log('connect fail');
    }
}

module.exports={connect}