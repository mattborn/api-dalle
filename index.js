const functions = require('@google-cloud/functions-framework')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

functions.http('dalle', async (req, res) => {
  //cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-nodejs
  res.set('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else {
    try {
      const response = await openai.createImage({
        n: 1,
        prompt: req.body.prompt,
        size: '512x512',
      })
      res.status(200).send(response.data.data[0].url)
    } catch (error) {
      res.status(500).send(error)
    }
  }
})
