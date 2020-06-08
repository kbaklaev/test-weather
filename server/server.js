/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import axios from 'axios'
import geoip from 'geoip-lite'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

require('dotenv').config()

let connections = []
const id = process.env.REACT_APP_OPENWEATHER_ID

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

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

// const forecast = obj.list.reduce((acc, rec) => {
// 	let key = new Date(rec.dt * 1000).toLocaleDateString(undefined, {
// 		year: 'numeric',
// 		month: 'long',
// 		day: 'numeric',
// 	})
// 	return {
// 		...acc,
// 		...(acc[key]
// 			? {
// 					[key]: {
// 						temp: [...acc[key].temp, rec.main.temp],
// 						pressure: [...acc[key].pressure, rec.main.pressure],
// 						humidity: [...acc[key].humidity, rec.main.humidity],
// 						wind: [...acc[key].wind, rec.wind.speed],
// 						ascii: [...acc[key].ascii, rec.weather[0].icon],
// 					},
// 			  }
// 			: {
// 					[key]: {
// 						temp: [rec.main.temp],
// 						pressure: [rec.main.pressure],
// 						humidity: [rec.main.humidity],
// 						wind: [rec.wind.speed],
// 						ascii: [rec.weather[0].icon],
// 					},
// 			  }),
// 	}
// }, {})

// const average = Object.keys(forecast).reduce(
// 	(acc, rec) => ({
// 		...acc,
// 		...{
// 			[rec]: {
// 				temp:
// 					(
// 						forecast[rec].temp.reduce((acc, rec) => acc + rec) /
// 						forecast[rec].temp.length
// 					).toFixed(1) + ' °C',
// 				pressure:
//           (
//             forecast[rec].pressure.reduce((acc, rec) => acc + rec) /
//             forecast[rec].pressure.length
//           ).toFixed(0),
// 				humidity:
// 					(
// 						forecast[rec].humidity.reduce((acc, rec) => acc + rec) /
// 						forecast[rec].humidity.length
// 					).toFixed(0) + ' %',
// 				wind:
// 					(
// 						forecast[rec].wind.reduce((acc, rec) => acc + rec) /
// 						forecast[rec].wind.length
// 					).toFixed(0) + ' m/s',
// 				ascii: forecast[rec].ascii[(forecast[rec].ascii.length / 2).toFixed(0)],
// 			},
// 		},
// 	}),
// 	{}
// )

server.get('/api/weather/:city', async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(
    req.params.city
  )}&units=metric&appid=${id}`
  await axios
    .get(url)
    .then((data) => res.send(data.data.list))
    // .then((data) => console.log(data.data.list))
    .catch((err) => res.send(err))
})

server.get('/api/weather-forecast/:city', async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    req.params.city
  )}&units=metric&appid=${id}`
  await axios
    .get(url)
    .then((data) => res.send(data.data))
    .catch((err) => res.send(err))
})

server.get('/api/ip-address', (req, res) => {
  const ip =
    (req.headers['x-forwarded-for'] || '')
      .split(',')
      .pop()
      .trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  const geo = geoip.lookup(ip)
  res.send(`Your IP address is ${ip}, ${geo.city}, ${geo.country}`)
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
