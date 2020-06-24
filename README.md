# Systems Engineering Learning and Development Portal

A portal app to raise request for training courses, inspired by [this](https://github.com/bradtraversy/devconnector_2.0) project by Brad Traversy

App URL [here](https://se-ld-portal.herokuapp.com/)

## Installation

Use the npm package manager to install node modules.

```bash
npm install # installs backend node modules
cd client # switch to frontend client directory
npm install # installs frontend node modules
cd .. # return to project root directory
```

## Add configurations

Add two `.json` configuration files in the `config` directory, and save them as `default.json` and `production.json`

The configuration files should contain the following:

```bash
{
  "mongoURI": #Your MongoDB connection URI wrapped in double-quotes
  "jwtSecret": #Any string as your JSON web token secret
  "SENDGRID_API_KEY": #Sendgrid API key for sending email notifications
}
```

## Usage

In the project root directory, run this command:

```bash
npm run dev # app starts at http://localhost:3000
```

## Heroku Deployment

In the project root directory, run this command:

```bash
heroku create #Create your app on Heroku
git push heroku master #Deploy your app to Heroku

```

## FAQ

If you encounter proxy error when accessing front-end app, first connect to backend server by running this command:

```bash
npm run server # backend server starts at http://localhost:5000
```

Afterwards, authenticate yourself via Postman, before try access front-end at `http://localhost:3000`

Download Postman collection [here](https://www.getpostman.com/collections/dde301518dbbc459a8cc)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
