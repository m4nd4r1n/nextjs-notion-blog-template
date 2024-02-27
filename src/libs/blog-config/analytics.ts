interface GoogleAnalytics {
  googleAnalyticsId: string;
}

interface Posthog {
  posthogKey: string;
  posthogApiHost?: string;
}

export interface AnalyticsConfig {
  googleAnalytics?: GoogleAnalytics;
  posthogAnalytics?: Posthog;
}
