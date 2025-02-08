export const dynamic = 'force-dynamic';
const globalClients = globalThis as unknown as {
  sseClients: WritableStreamDefaultWriter<any>[];
};

if (!globalClients.sseClients) {
  globalClients.sseClients = [];
}

export interface WebhookEvent {
  eventType: string;
}

export async function POST(req: Request) {
  const events = (await req.json()) as WebhookEvent[];
  console.log('Webhook Received:', events);

  console.log('Number of connected clients:', globalClients.sseClients.length);

  // Process each event

  if (events.length > 0) {
    // Notify all connected SSE clients
    globalClients.sseClients.forEach((client) => {
      try {
        console.log('Sending message to client:', events);
        client.write(`data: ${JSON.stringify(events)}\n\n`);
      } catch (err) {
        console.error('Error sending message to client:', err);
      }
    });
  }

  return Response.json({ message: 'Success' }, { status: 200 });
}

// SSE Endpoint for Frontend to Listen for Webhooks
export async function GET(req: Request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  writer.write(`event: connected\ndata: "SSE Connected"\n\n`);

  globalClients.sseClients.push(writer); // Store the client connection

  // Remove client when connection closes
  req.signal.addEventListener('abort', () => {
    const index = globalClients.sseClients.indexOf(writer);
    if (index !== -1) {
      globalClients.sseClients.splice(index, 1);
      writer.close();
    }
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Transfer-Encoding': 'chunked',
    },
  });
}
