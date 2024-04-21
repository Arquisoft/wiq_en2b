FROM prom/prometheus
LABEL authors="dario"

COPY ./configuration /etc/prometheus

# Expose the default Prometheus port
EXPOSE 9090

# Run Prometheus in the foreground
CMD ["prometheus"]
