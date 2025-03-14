const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllStations = require('./routes/getAllStations')
const getStationById = require('./routes/getstationById')
const syncStations = require('./routes/syncStations')
const deleteStations = require('./routes/Stations')
const updateStation = require('./routes/Stations')
const createStation = require('./routes/Stations')
const createTrip = require('./routes/Trips').createTrip
const getAllTrips = require('./routes/Trips').getAllTrips
const getTripById = require('./routes/Trips').getTripById
const updateTrip = require('./routes/Trips').updateTrip
const deleteTrip = require('./routes/Trips').deleteTrip
const createLine = require('./routes/Lines').createLine;
const getAllLines = require('./routes/Lines').getAllLines;
const getLineById = require('./routes/Lines').getLineById;
const updateLine = require('./routes/Lines').updateLine;
const deleteLine = require('./routes/Lines').deleteLine;



require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/station', getAllStations)
app.use('/station', getStationById)
app.use('/station', syncStations)
app.use('/station', deleteStations)
app.use('/station', updateStation)
app.use('/station', createStation)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
