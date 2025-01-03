import { AnalyticsEvent } from '../types/analytics';

class Analytics {
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;
  private isDevelopment = import.meta.env.DEV;

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    const events = [...this.queue];
    this.queue = [];

    try {
      if (this.isDevelopment) {
        // In development, just log the events
        console.debug('Analytics Events:', events);
      } else {
        // In production, send to your analytics service
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(events),
        });
      }
    } catch (error) {
      if (!this.isDevelopment) {
        // Only re-queue in production
        this.queue.push(...events);
      }
    } finally {
      this.isProcessing = false;
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  track(eventName: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: {
        ...data,
        environment: this.isDevelopment ? 'development' : 'production'
      },
    };

    this.queue.push(event);
    this.processQueue();
  }
}

export const analytics = new Analytics();