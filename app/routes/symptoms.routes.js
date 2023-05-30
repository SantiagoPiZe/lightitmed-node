const axios = require("axios");
const { login } = require('../apiMedic/apiMedic');

module.exports = function (app) {
    const bp = require('body-parser');
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const symptomsBaseUrl = "https://sandbox-healthservice.priaid.ch/";

    app.get("/api/symptoms", (req, res) => {
        login()
            .then(token => {
                axios.get(symptomsBaseUrl+"symptoms", {
                    params: {
                        token: token,
                        language: 'en-gb',
                    }
                })
                    .then(symptomsResponse => {
                        const symptomsData = symptomsResponse.data;
                        res.json(symptomsData);
                    })
                    .catch(error => {
                        console.error('Error occurred while fetching symptoms:', error.message);
                        res.status(500).json({ error: 'An error occurred while fetching symptoms' });
                    });
            })
            .catch(error => {
                console.error('Login failed:', error.message);
                res.status(500).json({ error: 'Login failed' });
            });
    });
};