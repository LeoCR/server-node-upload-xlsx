module.exports = (sequelize, Sequelize) => {
    const PRODUCT = sequelize.define('PRODUCT', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        PRODUCT_NAME:Sequelize.STRING,
        PRODUCT_DESCRIPTION: Sequelize.STRING, 
        PRODUCT_PRICE:Sequelize.FLOAT
        },{
            timestamps: false
    });
	return PRODUCT;
}