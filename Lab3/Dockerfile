FROM python:3.11-slim AS builder
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 

COPY /src/requirements.txt  /app/
RUN pip install --upgrade pip  && \
    apt-get update && \
    apt-get install -y --no-install-recommends libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
COPY --from=builder /usr/local/lib /usr/local/lib
COPY --from=builder /usr/local/bin/ /usr/local/bin
RUN useradd -r djangouser && \
    mkdir /app && \
    chown -R djangouser /app
WORKDIR /app
COPY /src /app/
EXPOSE 8080

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh
USER djangouser
ENTRYPOINT ["/entrypoint.sh"]