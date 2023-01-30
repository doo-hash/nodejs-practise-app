const express = require("express");

const app = express();


require("./libs/middleware.js")(app);

require("./routes/index.js")(app);

require("./routes/tasks.js")(app);

require("./libs/boot.js")(app);