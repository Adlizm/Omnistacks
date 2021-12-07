const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

mongoose.connect(
    "mongodb+srv://test:test@cluster0-7oglp.mongodb.net/omnistack9?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on("connection", socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((require,response, next) => {
    require.io = io;
    require.connectedUsers = connectedUsers;
    
    return next();
});

// GET      -> Obter objeto
// POST     -> Criar objeto
// DELETE   -> Deletar objeto
// PUT      -> Update em um objeto

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);