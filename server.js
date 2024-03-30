const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

openai.api_key = process.env.OPENAI_API_KEY;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get_response', async (req, res) => {
    const message = req.query.message;
    try {
        const completion = await openai.ChatCompletion.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        });
        const response = completion.choices[0].message.content;
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
