FROM python:3.11-slim
RUN useradd -m -r djangouser && \
    mkdir /app && \
    chown -R djangouser /app

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 

RUN pip install --upgrade pip 
COPY requirements.txt  /app/
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/* 
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
EXPOSE 8000

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh
USER djangouser
ENTRYPOINT ["/entrypoint.sh"]