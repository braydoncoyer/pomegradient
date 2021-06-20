import fetch from 'isomorphic-unfetch'

export default async (req, res) => {

    
  const { email } = req.body.data
  console.log(email)

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY_POMEGRADIENT
    const response = await fetch(`https://api.buttondown.email/v1/subscribers`, {
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
