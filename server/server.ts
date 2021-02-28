import express from 'express';

const app = express();

app.get('/', (req, res) => {

    res.send('ok');
})


const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server Running!`)
});