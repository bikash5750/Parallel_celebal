import express from "express"
import {app} from "./app.js"
import config from "./utils/config.js"
import {connectdb} from "./src/connectdb/connectdb.js"


connectdb().then(()=>{
  app.listen(3000 ,()=>{
    console.log("your application is running on PORT 3000")
  })
})
.catch(()=>{
  console.log("unable to load port")
})