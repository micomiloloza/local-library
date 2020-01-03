var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

// Virtual for authors full name
AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name;
});

// Virtual for authors lifespan
AuthorSchema
.virtual('lifespan')
.get(function() {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for authors URL
AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('lifespan_formatted_date')
.get(function() {
    return (this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '') + ' - ' + (this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '')
})

// Export model
module.exports = mongoose.model('Author', AuthorSchema);