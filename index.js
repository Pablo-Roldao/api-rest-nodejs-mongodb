//configurações iniciais
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

app.get("/", (req, res) => { //rota inicial / endpoint
    res.json({
        "message": "Oi, Express!"
    });
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

//conectando ao banco de dados
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterapi.4x5rki7.mongodb.net/?retryWrites=true&w=majority`)
.then(() => { //caso dê certo
    console.log("Conectado ao MongoDB!");
    app.listen(3000); //disponibiliza API
})
.catch((err) => { //caso dê errado
    console.error(err);
});