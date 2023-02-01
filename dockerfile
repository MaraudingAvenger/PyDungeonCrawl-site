FROM python:3-alpine

# By default, listen on port 5000
EXPOSE 5000/tcp

RUN apk add git
RUN git clone https://github.com/MaraudingAvenger/PyDungeonCrawl-site.git

# Set the working directory in the container
WORKDIR PyDungeonCrawl-site/
# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_DEBUG=0

# Specify the command to run on container start
CMD [ "python", "./app.py" ]