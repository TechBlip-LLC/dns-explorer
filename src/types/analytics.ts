export interface AnalyticsEvent {
  name: string;
  timestamp: string;
  data?: Record<string, any>;
}

export type EventName = 
  | 'query_started'
  | 'query_completed'
  | 'query_failed'
  | 'cache_hit'
  | 'batch_query_started'
  | 'batch_query_completed'
  | 'history_opened'
  | 'history_query_selected';