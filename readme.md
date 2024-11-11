# Lab Guy REST API

## Installation

1. Create/add variables in `.env` file in root directory.
   ```js
    DIRECT_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #connect to db
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #connect to db
    ADMIN_EMAIL="abcd@gmail.com" #send Email
    ADMIN_EMAIL_PASSWORD="abcd abcd abcd abcd" #send Email
    CLD_CLOUD_NAME="abcd" #upload Images
    CLD_API_KEY="12345" #upload Images
    CLD_API_SECRET="1a2b3c4d" #upload Images
    CLD_PRESET_NAME="abcd" #upload Images
    YT_API_KEY="1a2b3c4d" #get Youtube Video data
    DASHBOARD_ADMIN_PATH="admin" #create Reset Password Link
   ```
2. Create/add in `.gitignore` file in root directory.
   ```js
   # labguy
    .env
    *.pem
    public
   ```
3. `npm i`

4. You are good to go!

## Deployment

1. Shared hosting (cheap)

   1. Connect to the server via SSH.
   2. Navigate to the root directory using `cd <dir>`
   3. Ensure that the `.htaccess` file is configured correctly.
   4. Execute:
      ```
      mkdir ~/.npm-global
      npm config set prefix '~/.npm-global'
      echo 'export PATH=~/.npm-global/bin:~/bin:$PATH ' >> $HOME/.bash_profile && source $HOME/.bash_profile
      ```
   5. `git clone https://username:token@github.com/username/repo.git`
   6. Make sure the node version is compatible.
   7. Follow the steps in the [Installation](#installation) section.
   8. `npm i pm2 -g`
   9. `pm2 start bin/www`
   10. Application should be running in the background now.
  
## Auto-updates

1. Add secrets to the forked repo
2. Add default ruleset for the branch main, `Require a pull request before merging` must be disabled
3. First pull request must be manually approved

## Todo

In the Future

- Add Vimdeo, Soundcloud, 3D support
- Tag update page
- Dashboard
- Portfolio generator page
