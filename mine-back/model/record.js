export default (Sequelize, DataTypes) => {
    const record = Sequelize.define("Record", {
        id: {
            field: "id",
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickName: {
            field: "nickName",
            type: DataTypes.STRING(200),
            allowNull: false
        },
        time: {
            field: "time",
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        paranoid: false,
        tableName: 'Record',
        comment: "record table"
    });
    return record;
}