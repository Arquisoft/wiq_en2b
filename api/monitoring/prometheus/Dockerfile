FROM prom/prometheus
LABEL authors="dario"
# Define the source and destination directories
COPY_SOURCE = ./configuration
COPY_DESTINATION = /etc/prometheus

# Copy the configuration files
COPY ${COPY_SOURCE}/* ${COPY_DESTINATION}

# Expose the default Prometheus port
EXPOSE 9090

# Run Prometheus in the foreground
CMD ["prometheus"]
