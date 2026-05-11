const express = require('express')
const cors = require('cors')

const { tiktokDl } = require('./lib/tiktok')
const { igdl } = require('./lib/instagram')
const { spotifyScrape } = require('./lib/spotify')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/api/tiktok', async (req, res) => {
    try {
        const url = req.query.url

        if (!url) {
            return res.json({
                status: false,
                message: 'Masukkan URL TikTok'
            })
        }

        const data = await tiktokDl(url)

        res.json(data)

    } catch (e) {
        res.json({
            status: false,
            message: e.message
        })
    }
})

app.get('/api/instagram', async (req, res) => {
    try {
        const url = req.query.url

        if (!url) {
            return res.json({
                status: false,
                message: 'Masukkan URL Instagram'
            })
        }

        const data = await igdl(url)

        res.json(data)

    } catch (e) {
        res.json({
            status: false,
            message: e.message
        })
    }
})

app.get('/api/spotify', async (req, res) => {
    try {
        const url = req.query.url

        if (!url) {
            return res.json({
                status: false,
                message: 'Masukkan URL Spotify'
            })
        }

        const data = await spotifyScrape(url)

        res.json({
            status: true,
            title: data.song.title,
            artist: data.song.artist,
            thumbnail: data.song.thumbnail,
            track: data.trackUrl
        })

    } catch (e) {
        res.json({
            status: false,
            message: e.message
        })
    }
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})