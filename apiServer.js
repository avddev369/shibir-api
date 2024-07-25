require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = './yuvak.json';
const pathqr = './yuvakQr.json';

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Database
const db = require("./models");


// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.error("Failed to sync db: " + err.message);
//   });
console.log("Synced db.");

//Routes
require("./routes/user.routes")(app);
require("./routes/question.routes")(app);
require("./routes/answer.routes")(app);
require("./routes/gernal.routes")(app);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to HP Shibir." });
});

app.post("/", (req, res) => {
    res.json({ message: "Welcome to HP Shibir." });
});



const PORT = process.env.SERVER_LOCAL_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port http://27.116.52.24:${PORT}`);
});

function appendStudentData(newData) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let yuvak = {};

        try {
            yuvak = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
        }

        // Merge new data into existing yuvak object
        Object.assign(yuvak, newData);

        fs.writeFile(path, JSON.stringify(yuvak, null, 2), 'utf8', err => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('Student data appended successfully!');
            }
        });
    });
}

app.post("/insert", (req, res) => {
    if (!req.body) {
        return res.status(400).send({ msg: "No data found", statusCode: 400 });
    }
    appendStudentData(req.body);
    res.status(200).send({ msg: "Data inserted successfully", statusCode: 200 });
});

app.get("/getData", (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send({ msg: 'Error reading the file', statusCode: 500 });
        }

        try {
            data = JSON.parse(data);
            return res.status(200).send({ msg: "Data fetched successfully", data, statusCode: 200 });
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            return res.status(500).send({ msg: 'Error parsing JSON data', statusCode: 500 });
        }
    });
});

function appendStudentDataQR(newData) {
    fs.readFile(pathqr, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let yuvakQr = {};

        try {
            yuvakQr = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
        }

        // Merge new data into existing yuvak object
        Object.assign(yuvakQr, newData);

        fs.writeFile(pathqr, JSON.stringify(yuvakQr, null, 2), 'utf8', err => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('QR data appended successfully!');
            }
        });
    });
}

app.post("/insertQr", (req, res) => {
    if (!req.body) {
        return res.status(400).send({ msg: "No data found", statusCode: 400 });
    }
    appendStudentDataQR(req.body);
    res.status(200).send({ msg: "Data inserted successfully", statusCode: 200 });
});

app.get("/getDataQr", (req, res) => {
    fs.readFile(pathqr, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send({ msg: 'Error reading the file', statusCode: 500 });
        }

        try {
            data = JSON.parse(data);
            return res.status(200).send({ msg: "Data fetched successfully", data, statusCode: 200 });
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            return res.status(500).send({ msg: 'Error parsing JSON data', statusCode: 500 });
        }
    });
});

function clearFile(filePath) {
    fs.writeFile(filePath, JSON.stringify({}, null, 2), 'utf8', err => {
        if (err) {
            console.error('Error clearing the file:', err);
        } else {
            console.log('File cleared successfully!');
        }
    });
}

app.post("/clearFile", (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).send({ msg: "No file path provided", statusCode: 400 });
    }
    console.log(filePath)
    clearFile(filePath);
    res.status(200).send({ msg: "File cleared successfully", statusCode: 200 });
});

process.on('unhandledRejection', err => {
    console.log(`[unhandledRejection] Shutting down server...`);
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});

module.exports.appServer = serverless(app);