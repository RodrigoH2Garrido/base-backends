docker exec -it base-node-backend bash -c "npm init -y"
docker exec -it base-node-backend bash -c "npm install express typescript @types/node @types/express ts-node sequelize pg nodemon --save-dev"
docker exec -it base-node-backend bash -c "npx tsc --init"
