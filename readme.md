# Lab Guy Dashboard

## Installation

1. `npm i`
2. Create/add in `.gitignore` file in root directory.
   ```js
   # labguy
    .env
    *.pem
    public
   ```
3. Create/add variables in `.env` file in root directory.
   ```js
    DATABASE_URL="postgres://abcd:000000@localhost:5432/abcd?schema=public" #connect to db
    ADMIN_EMAIL="abcd@gmail.com" #send Email
    ADMIN_EMAIL_PASSWORD="abcd abcd abcd abcd" #send Email
    CLD_CLOUD_NAME="abcd" #upload Images
    CLD_API_KEY="12345" #upload Images
    CLD_API_SECRET="1a2b3c4d" #upload Images
    CLD_PRESET_NAME="abcd" #upload Images
    YT_API_KEY="1a2b3c4d" #get Youtube Video data
    DASHBOARD_ADMIN_PATH="admin" #create Reset Password Link
   ```
4. After complete install change password via Dashboard's "forgot password" option.

5. You are good to go!

## Todo

1. General

2. Details

3. Future

- Add Vimdeo, Soundcloud support
- Add 3D support
