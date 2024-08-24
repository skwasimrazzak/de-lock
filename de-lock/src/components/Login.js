import React, { useState } from 'react'

const Login = () => {
  const [did, setDid] = useState('')
  const [challenge, setChallenge] = useState('')
  const [signature, setSignature] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ did, challenge, signature }),
    })

    const result = await response.json()
    if (result.success) {
      setMessage('Login successful!')
    } else {
      setMessage('Login failed: ' + result.message)
    }
  }

  return (
    <div>
      <h2>DID Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Enter your DID"
            value={did}
            onChange={(e) => setDid(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter challenge"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
