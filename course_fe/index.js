const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
var cors = require('cors')

const bodyParser = require('body-parser');
const port = 3000

const indexRoutes = require('./routes')

const corsOptions = {
  origin: 'http://localhost:5500', // Thay đổi thành địa chỉ của trang web của bạn
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));



app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
const resolvedPath = path.resolve('course_be', 'uploads');
app.use('/uploads', express.static(resolvedPath))


app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'))




//route
// router(app)
app.use('/', indexRoutes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
  console.log(resolvedPath)

})

