import { WebhookEvent } from '@/app/api/webhooks/route';
import { useEffect, useState } from 'react';

const useWebhookEvents = () => {
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/webhooks');

    eventSource.onmessage = (event) => {
      const newEvents = JSON.parse(event.data) as WebhookEvent[];
      setWebhookEvents((prevEvents) => [...prevEvents, ...newEvents]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return { webhookEvents };
};

export { useWebhookEvents };
