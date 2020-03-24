module.exports = (sequelize, type)=>{
    return sequelize.define('user',{
        firstname: {
            type: type.STRING,
            allowNull: false,
        },
        lastname: {
            type: type.STRING,
            allowNull: false,
        }
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['firstname','lastname']
                }
            ]
        }
    )
}