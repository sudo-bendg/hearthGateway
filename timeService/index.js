const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
    try {
        const currentTime24 = new Date().toLocaleTimeString('en-GB');
        console.log(currentTime24)
        res.status(200).json({time: currentTime24});
    } catch(e) {
        res.status(500).json({error: e});g
    }
})

app.listen(3002, () => {
    console.log(`listening!`)
})