FROM node:8.9.1
MAINTAINER Yayun.Chen

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 9080

#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
RUN npm config set registry https://registry.npm.taobao.org

RUN npm install
RUN npm run build
CMD ["cnpm", "start"]