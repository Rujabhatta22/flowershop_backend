const app = require("./index")
const port = 3000
app.listern(port, () => {
    console.log(`App is running on port: ${port}`)
})