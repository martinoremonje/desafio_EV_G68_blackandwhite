import express from 'express';
import path from 'path';
import Jimp from 'jimp';
import {v4 as uuidv4} from 'uuid';
const __dirname =path.resolve();
const router = express.Router();


router.get("/styles",(req, res)=>{
    res.sendFile(__dirname + '/assets/css/style.css')
})


router.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

router.post("/editar/", async(req, res)=>{
    const imagen = req.body
    const id = uuidv4().slice(-6)
    const nombreImagen = `${id}.jpg`
    const img = await Jimp.read(imagen)
    await img
    .resize(350, Jimp.AUTO)
    .grayscale()
    .writeAsync(__dirname + `/assets/uploads/${nombreImagen}`)

    res.sendFile(__dirname + `/assets/uploads/${nombreImagen}`)
})

export default router;