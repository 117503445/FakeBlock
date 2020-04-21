FROM python:3.6
WORKDIR /app
ADD . /app
CMD [ "ping" , "baidu.com"]