# Leverage AI Zero

A production-ready AI agent chatbot built with **Cloudflare Workers**, **Cloudflare Agents SDK**, and **Model Context Protocol (MCP)**. Features intelligent tool usage, multi-model support, and persistent conversation management via Durable Objects.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/leverageai-the-agentic-evolution-platform)

## 🚀 Features

- **Real MCP Integration**: Connects to production MCP servers with official TypeScript SDK
- **Intelligent Tool Calling**: Automatic tool detection (D1, R2, Workers, Web browsing, custom tools)
- **Multi-Model Support**: GPT-4o, Gemini 2.0/2.5, Claude Opus 4 via Cloudflare AI Gateway
- **Persistent Conversations**: Chat history powered by Durable Objects (ChatAgent & AppController)
- **Real-Time Streaming**: Server-sent events for instant AI responses
- **Session Management**: Control plane with session listing, titles, and deletion
- **Modern UI**: React 18 + Vite + Tailwind CSS + Shadcn/UI + Framer Motion
- **TypeScript**: Full type safety with Workers Types and MCP schemas
- **Production Ready**: Cloudflare Observability, CORS, rate limiting, error handling
- **Responsive Design**: Mobile-first with glassmorphism effects and animations

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **AI/ML** | **Styling** | **Tools** |
|--------------|-------------|-----------|-------------|-----------|
| React 18 | Cloudflare Workers | OpenAI SDK 5.x | Tailwind CSS 3.4 | Hono 4.x |
| Vite 6.x | Agents SDK 0.0.109 | MCP SDK 1.16+ | Shadcn/UI 2.3 | Bun |
| React Router 6.x | Durable Objects | Cloudflare AI Gateway | Framer Motion 12.x | TypeScript 5.8 |
| TanStack Query | Hono Server | SerpAPI Integration | Lucide Icons | ESLint 9.x |

## 📦 Installation

1. **Clone the repository** and navigate to the project directory

2. **Install dependencies** with Bun:
   ```bash
   bun install
   ```

3. **Configure environment variables** in `wrangler.jsonc`:
   ```json
   {
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai",
       "CF_AI_API_KEY": "your-cloudflare-api-key"
     }
   }
   ```

4. **Generate Worker types**:
   ```bash
   bun run cf-typegen
   ```

## 🚀 Quick Start

### Development
```bash
# Start dev server (frontend + Worker proxy)
bun run dev

# Open http://localhost:3000
```

### Production Build & Deploy
```bash
# Build assets
bun run build

# Deploy to Cloudflare
bun run deploy
```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/leverageai-the-agentic-evolution-platform)

## 💬 Usage

### Chat API Endpoints

- **Create/Switch Session**: `POST /api/sessions` (title optional)
- **List Sessions**: `GET /api/sessions`
- **Delete Session**: `DELETE /api/sessions/:id`
- **Update Title**: `PUT /api/sessions/:id/title`
- **Chat Messages**: `POST/GET/DELETE /api/chat/:sessionId/*`
  - `POST /chat` - Send message (supports streaming)
  - `GET /messages` - Load conversation
  - `DELETE /clear` - Clear chat
  - `POST /model` - Change AI model

### Frontend Integration

```tsx
// Example chat integration
const sendMessage = async (text: string) => {
  const res = await fetch(`/api/chat/${sessionId}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message: text, stream: true })
  });
  // Handle streaming response
};
```

## 🧪 Development Workflow

| Command | Description |
|---------|-------------|
| `bun run dev` | Development server with HMR |
| `bun run cf-typegen` | Generate Worker types |
| `bun run lint` | ESLint (TS + React) |
| `bun run build` | Production build |
| `bun run preview` | Local production preview |
| `bun run deploy` | Build + deploy to Cloudflare |

### Key Files

```
src/pages/HomePage.tsx          # Main app entry (edit this!)
worker/userRoutes.ts            # Custom API routes
worker/agent.ts                 # Agent logic (extend ChatAgent)
worker/chat.ts                  # OpenAI/MCP integration
worker/mcp-client.ts            # MCP server management
worker/app-controller.ts        # Session management
src/lib/chat.ts                 # Frontend chat service
```

## ☁️ Cloudflare Deployment

1. **Configure** `wrangler.jsonc` with your bindings and vars
2. **Deploy**:
   ```bash
   bun run deploy
   ```
3. **Custom Domain**: Add via Cloudflare Dashboard
4. **Observability**: Enabled by default in `wrangler.jsonc`

### Bindings (Do NOT modify)

- `CHAT_AGENT`: Chat state persistence
- `APP_CONTROLLER`: Session management

### MCP Servers

Extend `worker/mcp-client.ts` to add production MCP servers:

```ts
const MCP_SERVERS = [
  { name: 'cloudflare-docs', sseUrl: 'https://mcp-docs.cloudflare.com/sse' },
  // Add more servers
];
```

Tools auto-discover from MCP servers + built-in (weather, web search).

## 🔧 Extending

### Custom Tools
Add to `worker/tools.ts`:
```ts
case 'my-tool': 
  return await myToolLogic(args);
```

### New MCP Servers
Add to `worker/mcp-client.ts` `MCP_SERVERS` array.

### Custom Routes
Add to `worker/userRoutes.ts` `userRoutes(app)`.

### Frontend Pages
Edit `src/main.tsx` router or replace `src/pages/HomePage.tsx`.

## 🤝 Contributing

1. Fork the repo
2. `bun install`
3. Create feature branch (`bun run dev`)
4. Commit changes (`bun run lint`)
5. Push & PR

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 👥 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Agents SDK](https://developers.cloudflare.com/agents/)
- [MCP Protocol](https://modelcontextprotocol.org/)

Built with ❤️ for the Cloudflare ecosystem. Issues? Open a GitHub issue!