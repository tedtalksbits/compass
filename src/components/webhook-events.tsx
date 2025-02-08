'use client';

import { useWebhookEvents } from '@/hooks/useWebhookEvents';
import React from 'react';
import { Button } from './ui/button';

const WebhookEvents = () => {
  const { webhookEvents } = useWebhookEvents();
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Webhook Events</h2>

      <p>
        This page displays the webhook events received from the server. The
        events are displayed in real-time as they are received.
      </p>
      <p>To send a test webhook event, click the button below.</p>
      <Button
        variant={'secondary'}
        onClick={() => {
          fetch(`/api/webhooks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ message: 'Test webhook event' }]),
          });
        }}
      >
        Send Test Webhook
      </Button>
      {webhookEvents && webhookEvents.length > 0 ? (
        <ul className='space-y-2 mt-2'>
          {webhookEvents.map((event, index) => (
            <li key={index} className='p-4 border rounded-lg bg-card'>
              <pre>{JSON.stringify(event, null, 2)}</pre>
            </li>
          ))}
        </ul>
      ) : (
        <p>No webhook events received yet.</p>
      )}
      {process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : process.env.NEXT_PUBLIC_BASE_URL}
    </div>
  );
};

export default WebhookEvents;
