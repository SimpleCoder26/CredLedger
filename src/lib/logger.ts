/**
 * A lightweight logging abstraction for production observability.
 * In a real-world scenario, this would integrate with Sentry, DataDog, etc.
 */
export const logger = {
  info: (message: string, context?: any) => {
    console.log(`[INFO] ${message}`, context ? context : '');
  },
  warn: (message: string, context?: any) => {
    console.warn(`[WARN] ${message}`, context ? context : '');
  },
  error: (message: string, error?: any, context?: any) => {
    // Here you would normally send the error to an external observability service
    console.error(`[ERROR] ${message}`, error ? error : '', context ? context : '');
  }
};
