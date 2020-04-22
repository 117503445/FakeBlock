FROM python:3.6
WORKDIR /app
COPY ./ubuntu-dlib /usr/local/lib/python3.6/site-packages
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . /app
CMD [ "python" , "fakeblock.py]