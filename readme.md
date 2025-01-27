# Lab Guy REST API

## Installation

1. Create/add variables in `.env` file in root directory.
   ```js
   DIRECT_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" # db
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #db
   DATABASE_SHADOW_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" #db
   ADMIN_EMAIL="abcd@gmail.com" # Email
   ADMIN_EMAIL_PASSWORD="abcd abcd abcd abcd" # Email
   CLD_CLOUD_NAME="abcd" # Images
   CLD_API_KEY="12345" # Images
   CLD_API_SECRET="1a2b3c4d" # Images
   CLD_PRESET_NAME="abcd"  Images
   YT_API_KEY="1a2b3c4d" # Youtube Video data
   DASHBOARD_ADMIN_PATH="admin" # Reset Password Link
   IP="127.0.0.1" # server
   VIMEO_ID="b3747ed69ddb778c6e816d1bf074a5b3d015797d"  # vimeo
   VIMEO_SECRET="BVMacJ+4SUCEa+Pntt/6NMnP95PnsYNghcMOwqU0k9ADaR9uew8gx3Le8Yjk0knc3eWNG1PwwCT/XhxF/aDDQ2UmYZD6HilFFk/3i/HfOLhSKTbC7HqRobKB6AbGf23U" # vimeo
   VIMEO_TOKEN="z5801b1ba30652319f6a9934e7ga2d45" # vimeo
   ```
2. `npm i`

3. You are good to go!

## Deployment

1. Shared hosting (cheap)

   1. Connect to the server via SSH.
   2. Navigate to the root directory using `cd ~`
   3. Follow the steps in the [Installation](#installation) section.
   4. Create .htaccess file if necessary

      run `touch .htaccess`, then copy paste\*:

      ```DirectoryIndex disabled
      RewriteEngine On
      RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule ^(.\*)$ http://127.0.0.1:3000/$1 [P,L]
      ```

      \*You need to replace`127.0.0.1`with your hosting IP.

   5. Execute:

      ```
      mkdir ~/.npm-global
      npm config set prefix '~/.npm-global'
      echo 'export PATH=~/.npm-global/bin:~/bin:$PATH ' >> $HOME/.bash_profile && source $HOME/.bash_profile
      ```

   6. `npm i pm2 -g`
   7. `pm2 start bin/www`
   8. `pm2 save`
   9. `crontab -e`, press `i` and insert text in a new line\*:

      ```
      @reboot /home/<hostname>/.npm-global/bin/pm2 resurrect

      */5 * * * * /home/<hostname>/labguy-server/bin/check_node.sh

      ```

      \*Make sure to replace hostname

   10. Application should be pernamently running in the background now.

## Auto-updates

1. Add secrets to the forked repo:
   ```
   SERVER_SSH_KEY
   SERVER_HOST
   SERVER_USERNAME
   SERVER_PORT
   ```
2. Add default ruleset for the branch main, `Require a pull request before merging` must be disabled
3. The first pull request must be manually approved

## Todo

Planned future features:

- Portfolio generator
