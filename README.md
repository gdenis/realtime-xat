# Realtime xat dockerized:

Need compose up to access endpoints.

<https://medium.com/swlh/nx-nestjs-react-docker-deploys-928a55fc19fd>

run compose: docker compose up -d

## New npm install:
# Rebuild the image
docker build . -t my-base-image:nx-base

And update container: docker compose up
