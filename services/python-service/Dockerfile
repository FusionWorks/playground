FROM python:3.8

WORKDIR /code

RUN pip install --upgrade pip
COPY requirements.txt /code/requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
RUN python manage.py makemigrations
RUN python manage.py migrate

ENTRYPOINT [ "python", "/code/manage.py" , "runserver", "0.0.0.0:8000"]