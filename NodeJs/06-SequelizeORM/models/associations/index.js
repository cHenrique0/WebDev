const Address = require("../Address");
const User = require("../User");

// Relationship - User has an Address
User.hasOne(Address);
Address.belongsTo(User);
