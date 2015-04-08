var mongoose = require('mongoose');

// Printer Model
var PrinterSchema = new mongoose.Schema({
    Name: String,
    Logo: String,
    Address: String,
    Country: String,
    Telephone: Number,
    Email: String
});

module.exports = mongoose.model('Printer', PrinterSchema);