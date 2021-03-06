var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date} 
    }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan_formatted')
.get(function(){
    return `${moment(this.date_of_birth).format('MMMM Do, YYYY')} - ${moment(this.date_of_death).format('MMMM Do, YYYY')}`;
});

AuthorSchema
.virtual('lifespan')
.get(function(){
    return (this.date_of_death.getYear() - this.date_of_death.getYear()).toString();
});

AuthorSchema
.virtual('url')
.get(function(){
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);