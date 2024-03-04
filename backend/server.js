import  express from "express";
const app = express()

// app.get("/", (req, res) => {
//     res.send("server is ready")
// })

//get a list of 5 jokes

app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title : "Why did the chicken cross the road?",
            punchline : "To get to the other side"
        },
        {
            id: 2,
            title : "Why did  the road?",
            punchline : "To other side"
        },
        {
            id: 3,
            title : "Why did  the road?",
            punchline : "To other side"
        }
    ]
    res.send(jokes)
})


const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})