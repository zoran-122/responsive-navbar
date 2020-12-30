const express = require("express");
const fallback = require("express-history-api-fallback");
const app = express();

app.disable("x-powered-by");
app.set("port", process.env.PORT || 8080);
app.use(express.static(`${__dirname}/public`));
app.use(fallback(`${__dirname}/public/index.html`));
app.listen(app.get("port"), () => {
  console.info(`server running at port ${app.get("port")}`);
});