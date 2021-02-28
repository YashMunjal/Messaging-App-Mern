import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

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


app.get('/', (req, res) => {

    res.send('ok');
})
app.post('/api/register', async (req, res) => {

    if(!req.body.email || !req.body.password) {
        return res.json({status:'error',error:'Invalid Mail'})
    }
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save(function (err:any) {
        //res.json(user);
    });

    console.log(req.body);
    res.json({ status: 'ok' })
})





const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server Running!`)
});