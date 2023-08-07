rm -r ./dist/client/dist/* && \
npm run build && \
cp -R ./client/dist/* ./dist/client/dist/ && \
npm run build-server && \
npm run fix-alias && \
pm2 stop all && \
pm2 start ./dist/server/server.js