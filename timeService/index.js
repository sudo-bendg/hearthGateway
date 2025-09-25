const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
    try {
        const currentTime24 = new Date().toLocaleTimeString('en-GB');
        res.json({time: currentTime24});
    } catch(e) {
        res.json({error: e});
    }
})

app.listen(3002, () => {
    console.log(`listening!`)
})