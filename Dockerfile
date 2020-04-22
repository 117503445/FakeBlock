FROM python:3.6
WORKDIR /app
ADD . /app
ADD ./ubuntu-dlib /usr/local/lib/python3.6/site-packages
CMD [ "ping" , "baidu.com"]