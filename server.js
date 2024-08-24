const express = require('express')
const agent = require('./veramo-setup')

const app = express()
app.use(express.json())

app.post('/create-did', async (req, res) => {
  try {
    const did = await agent.didManagerCreate()
    res.json(did)
  } catch (error) {
    res.status(500).send(error.toString())
  }
})

app.post('/login', async (req, res) => {
  const { did, challenge, signature } = req.body
  try {
    const verified = await agent.verifyMessage({
      data: challenge,
      signature: signature,
      did,
    })

    if (verified) {
      res.json({ success: true, message: 'Login successful', did })
    } else {
      res.status(401).json({ success: false, message: 'Invalid signature' })
    }
  } catch (error) {
    res.status(500).send(error.toString())
  }
})

app.listen(3000, () => {
  console.log('DID login system running on http://localhost:3000')
})
