const express = require("express");
const routes = express.Router();

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");


routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);

routes.get("/search", SearchController.index);

module.exports = routes;