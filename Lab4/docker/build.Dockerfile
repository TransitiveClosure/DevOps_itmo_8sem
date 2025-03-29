FROM django_system AS build
WORKDIR /app

COPY ../src/requirements.txt  /app/
RUN pip install --no-cache-dir -r requirements.txt