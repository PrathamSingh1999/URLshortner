import express from "express";
import path from "path";
import urlRoutes from  './routes/url.js'
import {connectToMongoDB} from './connect.js'
import {URL} from './models/url.js'
import staticRoute from './routes/staticRouter.js'

const app=express();
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(
    ()=>{console.log("mongodb connected");}
)

app.set('view engine',"ejs");
app.set('views',path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use("/url",urlRoutes);

app.use("/",staticRoute);

app.get('/url/:shortId',async (req,res)=>{
     const shortId=req.params.shortId;
     console.log('Received shortId:', shortId);
     const entry= await URL.findOneAndUpdate({
          shortId
     },
     {
        $push:{
            visitHistory:{
                timeStamp:Date.now(),
            }
        }
     }
    )
    if (!entry) {
  return res.status(404).json({ error: 'Short URL not found' });
   }
  res.redirect(entry.redirectURL);   

})


app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})