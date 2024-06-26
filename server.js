const express = require('express');
const { Hercai } = require('hercai');
const herc = new Hercai();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get_response', async (req, res) => {
    const message = req.query.message;
    try {
        const response = await herc.question({ model: "turbo-16k", content: message });
        const reply = response.reply;
        res.status(200).json({ content: reply });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
