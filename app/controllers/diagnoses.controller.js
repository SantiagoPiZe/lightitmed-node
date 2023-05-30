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
}