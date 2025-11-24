const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const cors = require("cors")
require('../backend/db/mongoose')
const userroute = require('../backend/routes/user')
const categaryRoute = require('../backend/routes/category')
const subcategaryRoute = require('../backend/routes/subcategary')
app.use(express.json())
app.use("/upload",express.static(path.join(__dirname,"./upload")))

// CORS Fix
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://freelance-hub-frontend-six.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use('/',userroute)
app.use('/',categaryRoute)
app.use('/',subcategaryRoute)
app.listen(port,()=>{
    console.log(`server start ${port}`);
    
})