# knowbe4-celepar-user-integration

## Stack

-- node
-- express
-- prisma.io
-- sqlite

# to run dev

npm install
npx prisma generate
npm run dev

## run prod

npm install
npx prisma generate
npm run build
node dist/server.js

## How to use

1. Create a user
   Make a POST request to /user route

2. Authenticate user
   Make POST request to /authenticate rout

3. Sync users
   Make GET request to /sync route with Bearer token generated on step 2

Requests are implemented on Postman
file: Knowbe4_Celepar_LDAP_Sync_API.postman_collection.json
