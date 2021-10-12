const express = require('express');

const app = express();

// Serve only the static files form the dist directoryw
app.use(express.static('./dist/lacto'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/lacto/' }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8000);