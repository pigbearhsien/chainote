FROM node:18-alpine

COPY ./frontend ./frontend
WORKDIR ./frontend
RUN corepack enable
RUN yarn build


FROM node:18-alpine

EXPOSE 3000

RUN yarn global add serve
RUN yarn cache clean --mirror
COPY --from=0 ./frontend/build ./build


CMD ["serve", "-s", "./build"]