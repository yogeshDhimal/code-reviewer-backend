import aiService from '../services/ai.service.js'

const getReview = async (req, res)=>{
    const code = req.body.code

    if(!code){
        return res.status.send("code is required")
    }

    const response = await aiService(code)

    if(!response){
        return res.status(500).send("Ai response was empty")
    }

    res.send(response)
}

export {
    getReview
}
