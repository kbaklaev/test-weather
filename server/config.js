require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  id: process.env.REACT_APP_OPENWEATHER_ID
}

export default options
