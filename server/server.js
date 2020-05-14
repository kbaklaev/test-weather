/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

let connections = []
const id = process.env.REACT_APP_OPENWEATHER_ID

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

// server.use('/api/', (req, res) => {
//   res.status(404)
//   res.end()
// })

const echo = sockjs.createServer()
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})

  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/api/weather/:city', async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(
    req.params.city
  )}&units=metric&appid=${id}`
  await axios
    .get(url)
    // eslint-disable-next-line no-console
    .then(() => console.log(id, url))
    // .then((data) => res.send(data.data.list[0]))
    // eslint-disable-next-line no-console
    .catch((err) => res.send(err))
})

server.get('/api/id', (req, res) => {
  res.send(`id is ${id}`)
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
