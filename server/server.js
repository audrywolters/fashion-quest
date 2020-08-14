
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const changeRouter = require('./routes/change.router');
const closetRouter = require('./routes/closet.router');
const donateRouter = require('./routes/donate.router');
const outfitRouter = require('./routes/outfit.router');
const senarioRouter = require('./routes/senario.router');
const userRouter = require('./routes/user.router');
const allClothesRouter = require('./routes/allClothes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/change', changeRouter);
app.use('/api/closet', closetRouter);
app.use('/api/donate', donateRouter);
app.use('/api/outfit', outfitRouter);
app.use('/api/senario', senarioRouter);
app.use('/api/user', userRouter);
app.use('/api/allClothes', allClothesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;