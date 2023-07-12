import app from "./app"
import 'dotenv'
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(() => {   
    
    const PORT = process.env.PORT
    
    console.log("🔑 Databse connected")
    app.listen(PORT, () => {
        console.log(`🕋 Server is runnig ${PORT}`)
    })    
}).catch(err => {
    console.error(err)
})
