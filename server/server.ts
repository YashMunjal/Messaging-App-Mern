import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import User from './model/userSchema'

const app = express();

app.use(bodyParser.json());



const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://yashmunjal:yash1461@cluster0.r7shp.mongodb.net/MessengerApp?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }
    );
    console.log("Mongo connected");
};
connectDB();




if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

const JWT_SECRET_TOKEN= '97dqt1tr97qydyuhdfasfhasbb@@jasncc..1111'

app.get('/', (req, res) => {

    res.send('ok');
})
app.post('/api/register', async (req, res) => {

    const {email, password} =req.body;

    if(!email || !password) {
        return res.json({status:'error',error:'Invalid Mail'})
    }

    var user=await User.findOne( {email});

    if(user)
        return res.json({status:'error',error:'User already exists'})

    user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save(function (err:any) {
        //res.json(user);
    });

    console.log(req.body);
    return res.json({ status: 'ok' ,message:"You can now continue to login"})
})

app.post('/api/login',async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);

    const user=await User.findOne({ email})

    if(!user){
        return res.json({status: 'error',error:"User doesn't exist"})
    }
    if(user.password!==password){
        return res.json({status: 'error',error:"Wrong password"})
    }



    const payload=jwt.sign({email},JWT_SECRET_TOKEN)

    return res.json({status:'ok',data:payload})
})



const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server Running!`)
});