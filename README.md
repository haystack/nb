# Installation

## Local Dev

1. Install node.js and PostgreSQL
   - [Node install](https://nodejs.org/en/download/) `v16 or newer`
   - [PostgreSQL install macOS](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
   - [PostgreSQL install windows](https://www.postgresqltutorial.com/install-postgresql/)


2. Clone repo then install packages using the command `npm install`

3. Using PostgreSQL, Create DB for NB with a user that has full access to it. [Helpful resource](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb).

4. Add a config file for your database called config.js in the base folder of the project structured like below. Entries in config db should match the ones you used in Postgres:
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

5. Create a .env file with the following content and place it in the base folder of the project (where config.js is).
```
JWT_SECRET=ENTER-SECRET-HERE-(RANDOM-STRING)
```
   - NOTE: Do not give the file a name (ie local.env), leave it as '.env'
     - If you are on Mac you won’t be able to do this at first because ‘.’ files are hidden and therefore inaccessible/unwriteable by default. You need to run the following two lines in your command line tool first (to modify your hidden files temporarily), and when done run the same two lines but change the bool tag to a NO (to protect your hidden files):
          ```
          defaults write com.apple.finder AppleShowAllFiles -bool YES
          ```
          ```
          killall Finder 
          ```

6. Run NB in separate terminals
   - Run backend using command `npm run dev`
   - Run UI using command `npm run serve`
     - The UI has several errors listed in the command line when you run it, but it still works if you open up the server on your browser.

7. Access UI on https://127.0.0.1:8080/ 
   - Note: Since we're using a self generated certificate for development, the browser will alert that you are running an insecure server. In Chrome type:  thisisunsafe. (note: there is no text box to type this in, you have to type it on yout keyboard to get through). You can also press the advanced button then press continue to site. 



## Deploy NB (Production)

1. SSH to the server `ssh -i [YOUR_KEY].key [USER]@[HOST].csail.mit.edu`

2. Install NodeJS 
`curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs` [Helpful resource](https://github.com/nodesource/distributions#installation-instructions).

3. Install PM2 `sudo npm install -g pm2` [Helpful resource](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04).

4. Follow steps 1 & 2 from Local Dev (see above).

5. Configure HTTPS on the server:
    * Install certbot 
    ```
    $ sudo add-apt-repository ppa:certbot/certbot
    $ sudo apt-get update
    $ sudo apt-get install certbot
    ```
    * Generate an SSL certificate with certbot
    `$ sudo certbot certonly --manual`
    * Part of the certbot configuration,  type your domain name without the protocol part. For instance: yourname-nb.csail.mit.edu.
    * When asked "Are you ok with your IP being logged?", type Y then ENTER.
    * Open a new connection to the server on a new terminal, don't close the previous one.
    * In the new terminal, navigate to the nb projecat and inside the public folder create a folder and name it `.well-known`, inside .well-know create another folder and name it `acme-challenge`.
    * In the directory acme-challenge, create an empty file and name it as instructed from the certbot in the first terminal.
    * Paste the challenge from the certbot into the file created in the previous step.
    * Run the nb server using `sudo npm run http`, and verify that you can access the challenge on the URL `http://[yourname]-nb.csail.mit.edu/.well-known/acme-challenge/[challenge file name]`
    * If everything is okay, go back to the first terminal and type ENTER.
    * Finally, you will find all the files that you need under this path `/etc/letsencrypt/live/[yourname]-nb.csail.mit.edu`

[Helpful resource](https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca).

6. Create .env file with the following content
```
SSL_KEY=PATH_TO/privkey.pem
SSL_CERT=PATH_TO/cert.pem
SSL_CA=PATH_TO/chain.pem
PORT=443
JWT_SECRET=ENTER-SECRET-HERE-(RANDOM-STRING)
```

7. To generate UI bundle, run `npm run build`.

8. If you are runing `npm v7` or above, run `sudo chown root .`. 

9. To start NB, run the following command `sudo pm2 start --node-args="--max-old-space-size=16384" npm --name "NB" --time -- start`.

10. To make PM2 run automatically after reboot, run the following command `sudo pm2 startup` then run `sudo pm2 save`. 

11. You should be able to access NB using `[HOST].csail.mit.edu`.

12. Redirect HTTP to HTTPS as follow
   - run `sudo apt install nginx`.
   - run `sudo ufw allow 'Nginx HTTP'`.
   - edit `/etc/nginx/sites-enabled/default` and add `return 301 https://$host$request_uri;` under `server_name`.
   - run `sudo systemctl reload nginx`. 

### Useful PM2 Commands
```
sudo pm2 list                   # list all processes
sudo pm2 reload <ID|NAME|all>   # reload after changes to the code
sudo pm2 del <ID|NAME>          # delete process by id or name
sudo pm2 log < |NAME>           # show log for all or by name
sudo pm2 log all                # show all logs
```
### Other
to update certificate, run `sudo certbot renew`, if this doesn't work try `certbot certonly --manual -d $DOMAIN.com` then recreate the challange.
