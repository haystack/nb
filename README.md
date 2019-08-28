## Installation
```
npm install
```

## Usage
Add a config file for your database called `config.js` structured like below:
```
var config = {
  db: {
    name: 'YOUR_DB_NAME',
    user: 'YOUR_DB_USERNAME',
    pass: 'YOUR_DB_PASSWORD'
  }
}
module.exports = config;
```

Run in separate terminal tabs
```
npm run serve
```
```
npm run start
```

Navigate to `localhost:8080` in your browser.
