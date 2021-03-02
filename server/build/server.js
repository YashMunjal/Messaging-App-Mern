"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("./model/userSchema"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const connectDB = async () => {
    await mongoose_1.default.connect("mongodb+srv://yashmunjal:yash1461@cluster0.r7shp.mongodb.net/MessengerApp?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log("Mongo connected");
};
connectDB();
if (process.env.NODE_ENV !== 'production') {
    app.use(cors_1.default());
}
const JWT_SECRET_TOKEN = '97dqt1tr97qydyuhdfasfhasbb@@jasncc..1111';
app.get('/', (req, res) => {
    res.send('ok');
});
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid Mail' });
    }
    var user = await userSchema_1.default.findOne({ email });
    if (user)
        return res.json({ status: 'error', error: 'User already exists' });
    user = new userSchema_1.default();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save(function (err) {
        //res.json(user);
    });
    console.log(req.body);
    return res.json({ status: 'ok', message: "You can now continue to login" });
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await userSchema_1.default.findOne({ email });
    if (!user) {
        return res.json({ status: 'error', error: "User doesn't exist" });
    }
    if (user.password !== password) {
        return res.json({ status: 'error', error: "Wrong password" });
    }
    const payload = jsonwebtoken_1.default.sign({ email }, JWT_SECRET_TOKEN);
    return res.json({ status: 'ok', data: payload });
});
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server Running!`);
});
