"use strict";

const fs = require("fs");
const path = require("path");
let packageJSON = require(path.resolve(__dirname, "../package.json"));

delete packageJSON.scripts["bootstrap"];
delete packageJSON.scripts["cleanup"];

let data = JSON.stringify(packageJSON, null, 2);
fs.writeFileSync(path.resolve(__dirname, "../package.json"), data);
