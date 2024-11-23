docker exec -it base-node-vue-standalone bash -c "
  if [ -d /app/node_modules ]; then
    echo 'node_modules directory does exist, skipping base installation.'
  else
    npm create vue@latest  my-project -- --eslint
    cp -r my-project/* /app
    rm -rf my-project   
  fi
"

docker exec -it base-node-vue-standalone bash -c "npm install"
docker exec -it base-node-vue-standalone bash -c "chown -R is:app /app"
