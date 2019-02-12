const express = require('express')
const passport = require('passport')
const GitHubStrategy = require('passport-github')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')
let userProfile

const app = express()
dotenv.config()

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/github/callback',
		},
		function(accessToken, refreshToken, profile, cb) {
			userProfile = profile
			return cb(null)
		}
	)
)

app.route('/auth/github').get(passport.authenticate('github'))

app.route('/auth/github/callback').get(
	passport.authenticate('github', {
		failureRedirect: '/',
		successRedirect: '/',
	})
)

app.route('/userdata').get((req, res) => {
	res.json({ profile: userProfile })
})

app.use('/bundle.js', express.static('./dist/bundle.js'))

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})
