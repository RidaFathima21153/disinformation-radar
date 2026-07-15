# Disinformation Radar — Real-Time Fake News Detection

Disinformation Radar is a premium, real-time public-awareness and threat-intelligence dashboard designed to detect and flag fake news. Powered by **SpacetimeDB** (an in-memory, relational, WebSocket-first database) and a TS/React frontend, the platform ingests news articles, runs linguistic and factual analysis using LLM backends (like Groq/Claude), and broadcasts live credibility updates to all connected clients without any polling.

## Architecture Diagram
```
Client (React 19 + Vite) 
  ▲ (WebSocket subscriptions / useTable)
  │
  ▼ (override_classification reducer)
SpacetimeDB V8 (Server running on localhost:3000)
  ▲
  │ (ingest_news_article reducer)
  ▼
Ingestion & Analysis Pipeline (Node.js Scripts)
  ├── seed_user.ts (Seeds API_Agent credentials)
  ├── ingest.ts    (Ingests articles from NewsAPI.org)
  └── analyze.ts   (Classifies articles using Groq LLM)
```

## Prerequisites
* **Node.js**: v18+ (tested with v20+)
* **SpacetimeDB CLI**: v2.6.1+
* **Vite / React**: Bundled with package dependencies

## Setup Steps
1. **Install SpacetimeDB CLI**:
   * For Windows (PowerShell):
     ```powershell
     iwr https://windows.spacetimedb.com -useb | iex
     ```
   * Ensure `spacetime` is in your environment `PATH` (restart terminal if necessary).

2. **Initialize Server Version**:
   ```bash
   spacetime version upgrade
   ```

3. **Install Dependencies**:
   Navigate to the project subdirectory and run install:
   ```bash
   cd fake-news-engine
   npm install
   cd spacetimedb
   npm install
   cd ..
   ```

4. **Environment Configuration**:
   Create a `.env` file in the `fake-news-engine` folder based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Provide valid configuration (the pipeline supports a mock fallback if API keys are omitted or set to `gsk_dummy_key` / `dummy-key`).

## Run Order & Deployment
To run the system end-to-end, execute the following commands in order:

1. **Start SpacetimeDB Server**:
   ```bash
   spacetime start
   ```

2. **Configure Local CLI Server**:
   ```bash
   spacetime server add default --url http://127.0.0.1:3000
   spacetime server set-default default
   ```

3. **Publish Schema & Reducers**:
   ```bash
   cd fake-news-engine
   spacetime publish fake-news-engine
   ```

4. **Generate Client Bindings**:
   ```bash
   spacetime generate --lang ts --out-dir src/module_bindings -y
   ```

5. **Seed System API Agent**:
   ```bash
   npx tsx scripts/seed_user.ts
   ```

6. **Ingest Articles**:
   ```bash
   npx tsx scripts/ingest.ts
   ```

7. **Run Classification Pipeline**:
   ```bash
   npx tsx scripts/analyze.ts
   ```

8. **Start Frontend Dashboard**:
   ```bash
   npm run dev
   ```
   Open the printed localhost URL (e.g., `http://localhost:5178/`) in your browser to view the Disinformation Radar interface.
