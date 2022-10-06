import express from "express";

const server = express();
const port = 3333 || process.env.PORT;

server.use(express.json())

server.listen(port, () =>{
	console.log("server listening on port " + port);
})