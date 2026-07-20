import { DbConnection } from './module_bindings';
import { LiveThreatDashboard } from './dashboard/LiveThreatDashboard';
import { SpacetimeDBProvider } from 'spacetimedb/react';

export default function App() {
  const host = import.meta.env.VITE_SPACETIME_HOST || import.meta.env.SPACETIME_HOST || 'disinformation-radar.onrender.com';
  const dbName = import.meta.env.SPACETIME_DB_NAME || 'fake-news-engine';

  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'ws' : 'wss';
  const connectionBuilder = DbConnection.builder()
    .withUri(`${protocol}://${host}`)
    .withDatabaseName(dbName);

  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      <LiveThreatDashboard />
    </SpacetimeDBProvider>
  );
}