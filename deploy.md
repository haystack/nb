1. ssh into server.
2. `cd nbclient`.
3. `git checkout .` to revert the changes on `src/app.js`.
4. `git pull`.
5. `npm install` if needed.
6. Edit `src/app.js` and select the proper environment: (e.g. `Environments.prod` || `Environments.dev` || `Environments.test`) [line 32].
7. `npx webpack` to generate the bundle.
8. `cd ..`
9. `rm -rf nb/public/client` then `cp -r nbclient/public/ nb/public/client`.
10. `cd nb`.
11. `git pull`.
12. `npm install` if needed.
13. `npx sequelize db:migrate` if needed.
14. `npm run build`.
15. `cd ..`.
16. `sudo pm2 reload all`.
