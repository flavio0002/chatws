const express = require("express")
const app = express()
app.use(express.static("public"))

const http = require("http").Server(app)
const PORT = 8000


//função  de call back
http.listen(PORT, ()=>console.log(`Servidor iniciado na porta ${PORT}`))//Escute na porta especificada, epassando uma função tbm como parametro
app.get("/", (_, res) => res.sendFile(`${__dirname}/index.html`))

const serverSocket = require("socket.io")(http)
serverSocket.on("connect", socket =>{
    console.log(`Cliente ${socket.id} conectou`)

    socket.on("chat msg", msg =>serverSocket.emit("chat msg", `Msg recebida de ${socket.username}: ${msg}`))
    socket.on("login", username =>{
        socket.username = username
        serverSocket.emit("chat msg", `Usuáio ${username} entrou`)
    })
})