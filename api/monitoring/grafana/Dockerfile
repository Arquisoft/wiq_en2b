FROM grafana/grafana
LABEL authors="dario"
# Define the source and destination directories
COPY_SOURCE = ./provisioning
COPY_DESTINATION = /etc/grafana/provisioning

# Copy the configuration files
COPY ${COPY_SOURCE}/* ${COPY_DESTINATION}

# Expose the default Grafana port
EXPOSE 9091

# Run Grafana in the foreground
CMD ["grafana-server"]