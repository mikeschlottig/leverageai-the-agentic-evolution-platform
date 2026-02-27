import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
import { getToolDefinitions } from "./tools";
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, sessionId);
            const url = new URL(c.req.url);
            url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
            return agent.fetch(new Request(url.toString(), {
                method: c.req.method,
                headers: c.req.header(),
                body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
            }));
        } catch (error) {
            console.error('Agent routing error:', error);
            return c.json({
                success: false,
                error: API_RESPONSES.AGENT_ROUTING_FAILED
            }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/sessions', async (c) => {
        try {
            const controller = getAppController(c.env);
            const sessions = await controller.listSessions();
            return c.json({ success: true, data: sessions });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve sessions' }, { status: 500 });
        }
    });
    app.get('/api/sessions/stats', async (c) => {
        try {
            const controller = getAppController(c.env);
            const count = await controller.getSessionCount();
            return c.json({ success: true, data: { totalSessions: count } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve session stats' }, { status: 500 });
        }
    });
    app.get('/api/tools', async (c) => {
        try {
            const tools = await getToolDefinitions();
            return c.json({ success: true, data: tools });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve tool registry' }, { status: 500 });
        }
    });
    app.get('/api/health/stats', async (c) => {
        try {
            const controller = getAppController(c.env);
            const totalSessions = await controller.getSessionCount();
            const regions = [
                { name: 'US-East (N. Virginia)', status: 'Healthy', uptime: '99.99%', load: '24%', workers: totalSessions > 0 ? Math.ceil(totalSessions/4) : 2, peak: '1.2k' },
                { name: 'EU-West (London)', status: 'Healthy', uptime: '99.98%', load: '31%', workers: 8, peak: '840' },
                { name: 'Asia-North (Tokyo)', status: 'Degraded', uptime: '98.50%', load: '88%', workers: 42, peak: '5.6k' },
            ];
            return c.json({
                success: true,
                data: {
                    totalSessions,
                    regions,
                    systemStatus: totalSessions > 100 ? 'Heavy Load' : 'Optimal',
                    timestamp: Date.now()
                }
            });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve health metrics' }, { status: 500 });
        }
    });
    app.post('/api/sessions', async (c) => {
        try {
            const body = await c.req.json().catch(() => ({}));
            const { title, sessionId: providedSessionId, firstMessage } = body;
            const sessionId = providedSessionId || crypto.randomUUID();
            let sessionTitle = title;
            if (!sessionTitle) {
                const now = new Date();
                const dateTime = now.toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                if (firstMessage && firstMessage.trim()) {
                    const truncated = firstMessage.trim().slice(0, 37) + '...';
                    sessionTitle = `${truncated} • ${dateTime}`;
                } else {
                    sessionTitle = `Chat ${dateTime}`;
                }
            }
            await registerSession(c.env, sessionId, sessionTitle);
            return c.json({ success: true, data: { sessionId, title: sessionTitle } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to create session' }, { status: 500 });
        }
    });
    app.delete('/api/sessions/:sessionId', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            const deleted = await unregisterSession(c.env, sessionId);
            if (!deleted) return c.json({ success: false, error: 'Session not found' }, { status: 404 });
            return c.json({ success: true, data: { deleted: true } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to delete session' }, { status: 500 });
        }
    });
}