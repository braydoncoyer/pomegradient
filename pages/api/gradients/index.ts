import db from '../../../utils/db'

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { gradientName } = req.body
      const gradients = await db.collection('gradients').get()
      const gradientsData = gradients.docs.map((gradient) => gradient.data())

      if (gradientsData.some((gradient) => gradient.gradientName === gradientName)) {
        res.status(400).end()
      } else {
        const { id } = await db.collection('gradients').add({
          ...req.body,
          createdAt: new Date().toISOString(),
          createdBy: 'WhbqNuTUCFVESCMSBdVg7z4KtXv1',
        })
        res.status(200).json({ id })
      }
    }

    if (req.method === 'GET') {
      try {
        const gradients = await db.collection('gradients').orderBy('createdAt').get()
        const gradientsData = gradients.docs.map((gradient) => {
          console.table(gradient)
          return {
            id: gradient.id,
            ...gradient.data(),
          }
        })
        res.status(200).json({ gradientsData })
      } catch (e) {
        res.status(400).end()
      }
    }
  } catch (e) {
    res.status(400).end()
  }
}
