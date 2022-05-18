const app = require("./app");

const connectDatabase = require("./Config/database");

require("dotenv").config({ path: "backend/.env" });

const port = process.env.PORT || 5000;

connectDatabase();
app.listen(port, () => {
  console.log(`Server is working on http:// 192.168.0.102:${port}`);
});
