module.exports = (sequelize, Sequelize) => {
    const Diagnosis = sequelize.define("diagnosis", {
      diagnostic: {
        type: Sequelize.JSON
      }
    });
  
    return Diagnosis;
  };