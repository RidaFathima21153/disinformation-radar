# Use the official SpacetimeDB image
FROM clockworklabs/spacetime:latest

# Expose the default SpacetimeDB port
EXPOSE 3000

# Start the SpacetimeDB server listening on all interfaces
CMD ["start", "--listen-addr", "0.0.0.0:3000"]
