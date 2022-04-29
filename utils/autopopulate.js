//recursive middleware for populating nested fields
module.exports = (field) => function (next) {
    this.populate(field);
    next();
};