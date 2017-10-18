FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
ADD ./api/ /code/
RUN pip install -r /code/requirements.txt
