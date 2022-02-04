import express from 'express';
import { default as routes } from './methods.js';

const router = express()

router.use('/', routes)

router.use((req, res, next) => {
    const error = new Error('Not found')
    return res.status(404).json({
        error: error.message
    })
})

const PORT = process.env.PORT ?? 6969;

router.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
