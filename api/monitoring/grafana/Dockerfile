FROM grafana/grafana
LABEL authors="dario"

# Copy the configuration files
COPY ./provisioning /etc/grafana/provisioning

# Expose the default Grafana port
EXPOSE 9091

# Run Grafana in the foreground
CMD ["grafana-server"]