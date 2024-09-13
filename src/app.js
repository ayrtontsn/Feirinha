import express from "express"
import cors from "cors"
import httpStatus from "http-status"

const app = express();
app.use(express.json())
app.use(cors());

const feirinha = []

app.get("/items",(req,res) => { 
    const type = req.query.type;
    if (type){
        return res.send(feirinha.filter(item=>item.type === type))
    }
    res.status(httpStatus.OK).send(feirinha)
})

app.get("/items/:id",(req,res) => {  
    const id = req.params.id;
    if(id<=0 || !(id%2==0 || id%2==1)){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    } else if ( feirinha.length<id ) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
    const item = feirinha.find(receita => receita.id === Number(id));
    res.status(httpStatus.OK).send(item);
})

app.post("/items",(req,res) => {
    const item = req.body;
    if(!item.name || !item.quantity || !item.type){
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY)
    } else if (feirinha.find(itens=>itens.name.toLowerCase() === item.name.toLowerCase())){
        return res.sendStatus(httpStatus.CONFLICT)
    }
    feirinha.push(
        {id: feirinha.length+1,
        ...item})
        res.sendStatus(httpStatus.CREATED)
})

app.listen(5000);