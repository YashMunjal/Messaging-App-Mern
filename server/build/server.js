"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
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
app.get('/', (req, res) => {
    res.send('ok');
});
app.post('/api/register', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ status: 'error', error: 'Invalid Mail' });
    }
    var user = new userSchema_1.default();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save(function (err) {
        //res.json(user);
    });
    console.log(req.body);
    res.json({ status: 'ok' });
});
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server Running!`);
});
