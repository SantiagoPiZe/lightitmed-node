const db = require("../models");
const Diagnosis = db.diagnosis;
const User = db.user

exports.storeDiagnosis = (diagnoses, userId) => {
    Diagnosis.create({
        diagnostic: diagnoses
    }).then(diagnosis =>{
        User.findByPk(userId).then(user => {
            user.addDiagnosis(diagnosis).then( userDiagnosis => {
                console.log("New user diagnosis created:", userDiagnosis)
            })
        })
    })
    .catch(error => {
        console.error('Diagnostic creation failed:', error.message);
    });
}

exports.getUserDiagnoses = (req, res) => {
    Diagnosis.findAll({
        where: {
            userId: req.query.userId
        }
    }).then(response => {
        const result = [];
        for (const entry of response) {
          const obj = {
            id: entry.id,
            diagnostic: ''
          };
          const names = [];
          for (const diagnostic of entry.diagnostic) {
            names.push(diagnostic.Issue.Name);
          }
          obj.diagnostic = names.join(', ');
          result.push(obj);
        }
        res.status(200).send(result)
    }).catch(error => {
        console.error('Error occurred while fetching diagnoses:', error.data, " ", error.message);
        res.status(500).json({ error: 'An error occurred while fetching diagnoses' });
    });
}

exports.getDiagnosis = (req,res) => {
    Diagnosis.findByPk(req.query.diagnosisId).then((diagnosis) => {
        res.status(200).send(diagnosis)
    }).catch(error => {
        console.error('Error occurred while fetching diagnosis:', error.data, " ", error.message);
        res.status(500).json({ error: 'An error occurred while fetching diagnoses' });
    });
    
}