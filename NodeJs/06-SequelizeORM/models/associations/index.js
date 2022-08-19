const Address = require("../Address");
const User = require("../User");

// Relationship - User has an Address
User.hasMany(Address);
Address.belongsTo(User, { foreignKey: "user_uuid" });
