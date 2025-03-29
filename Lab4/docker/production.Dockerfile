FROM django_build AS production
WORKDIR /app

COPY --from=django_build /usr/local/lib /usr/local/lib
COPY --from=django_build /usr/local/bin/ /usr/local/bin
RUN useradd -r djangouser && \
    chown -R djangouser /app
COPY ../src /app/
EXPOSE 8080

COPY ../entrypoint.sh /
RUN chmod +x /entrypoint.sh
USER djangouser
ENTRYPOINT ["/entrypoint.sh"]