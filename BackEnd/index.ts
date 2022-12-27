import express from "express";
import cors from "cors";
import {router} from "./src/router/router";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('',router);
app.listen(8080,()=>{
    console.log('Server up on 8080')
})