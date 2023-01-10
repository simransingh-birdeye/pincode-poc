const express = require('express');
const app = express();
const cors = require('cors');
const route = express.Router();
const https = require('https');

app.use(cors());
const corsOptions = {
    origin: "http://127.0.0.1:5500/",
    credentials:true,
};

route.get("/getPincode", function (req, res) {
    https.get('https://api.ip2location.io/?key=DEBCA8B98BEF117E0A981F69D536F0D5', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        res.send(err.message);
    });
})

app.use("/api", route);

app.listen(8080, function () {
    console.log("server started");
})