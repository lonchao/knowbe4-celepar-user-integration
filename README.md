# knowbe4-celepar-user-integration

##Stack
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
