module.exports = (sequelize, Sequelize) => {
    const Diagnosis = sequelize.define("diagnosis", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      diagnostic: {
        type: Sequelize.JSON
      }
    });
  
    return Diagnosis;
  };