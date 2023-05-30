module.exports = (sequelize, Sequelize) => {
  const Diagnosis = sequelize.define("diagnosis", {
    diagnostic: {
      type: Sequelize.JSON
    }
  });

  Diagnosis.associate = (models) => {
    Diagnosis.belongsTo(models.users, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Diagnosis;
};