const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{type:String,unique:true,lowercase:true},
    password:String
})

export default mongoose.model('User',userSchema);

