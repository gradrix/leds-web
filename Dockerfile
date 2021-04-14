FROM python:3

# set a directory for the app
WORKDIR /usr/src/app

# copy all project files to the container
COPY . .

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# define the port number the container should expose
EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
