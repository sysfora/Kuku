#!/usr/bin/env bash

docker kill kuku || true 
docker rm kuku || true 
docker create --name kuku -p 3000:3000 -p 4200:4200 localhost/kuku
