import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import  __dirname  from "./utils.js";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import socketCallBack from "./src/routers/index.socket.js";
// Server config
const server = express();
const port = 8080;
const ready = () => console.log(`Server running on port ${port}`);
const httpServer = createServer(server);
const tcpServer = new Server(httpServer);
tcpServer.on("connection", socketCallBack)
// Server on
httpServer.listen(port, ready); 
// Config
server.use(express.urlencoded({ extended: true }));
server.use(express.json())
server.use(morgan("dev"))
server.use(cors())
server.use("/public",express.static("public"));
// Handlebars
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
// functions
server.use(router)
server.use(errorHandler)
server.use(pathHandler)
// 1:04:09