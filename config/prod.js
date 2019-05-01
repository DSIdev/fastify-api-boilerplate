module.exports = {
  ENV: "PROD",
  PORT: 3000,
  MONGO_URI: "mongodb://localhost/mycargarage",
  getEnv: function() {
    return this.ENV;
  }
};
