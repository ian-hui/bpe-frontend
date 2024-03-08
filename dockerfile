From node:20.5.1

WORKDIR /app

COPY ./build .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
