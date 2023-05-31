const axios = require("axios");
const { login } = require('../apiMedic/apiMedic');
const controller = require("../controllers/diagnoses.controller");

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


    app.get("/api/newDiagnosis", (req, res) => {
        login()
            .then(token => {
                axios.get(symptomsBaseUrl + "diagnosis", {
                    params: {
                        token: token,
                        language: 'en-gb',
                        symptoms: req.query.symptoms,
                        gender: req.query.gender,
                        year_of_birth: req.query.yearOfBirth
                    },
                })
                    .then(diagnosisResponse => {
                        const diagnosisData = diagnosisResponse.data;
                        controller.storeDiagnosis(diagnosisData, req.query.userId);
                        res.json(diagnosisData);
                    })
                    .catch(error => {
                        console.error('Error occurred while fetching diagnoses:', error.data, " ", error.message);
                        res.status(500).json({ error: 'An error occurred while fetching diagnoses' });
                    });
            })
            .catch(error => {
                console.error('Login failed:', error.message);
                res.status(500).json({ error: 'Login failed' });
            });
    });

    app.get("/api/user/diagnoses", (req, res) => {
        controller.getUserDiagnoses(req, res)
    })

    app.get("/api/user/diagnostic", (req, res) => {
        controller.getDiagnosis(req, res)
    })
};