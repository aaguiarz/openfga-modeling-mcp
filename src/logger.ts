import { performance } from 'perf_hooks';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  private logLevel: LogLevel;
  private requestId: number = 0;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.logLevel = level;
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      return `${baseMessage}\n${JSON.stringify(data, null, 2)}`;
    }
    return baseMessage;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.error(this.formatMessage('DEBUG', message, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.error(this.formatMessage('INFO', message, data));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.error(this.formatMessage('WARN', message, data));
    }
  }

  error(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, data));
    }
  }

  logRequest(method: string, params?: any): string {
    const requestId = (++this.requestId).toString();
    this.info(`📥 Incoming Request [${requestId}]`, {
      method,
      params,
      timestamp: performance.now()
    });
    return requestId;
  }

  logResponse(requestId: string, result?: any, error?: any): void {
    const status = error ? 'ERROR' : 'SUCCESS';
    const emoji = error ? '❌' : '✅';
    
    this.info(`📤 Outgoing Response [${requestId}] ${emoji} ${status}`, {
      result: error ? undefined : result,
      error: error ? error : undefined,
      timestamp: performance.now()
    });
  }

  logToolCall(toolName: string, args: any, requestId: string): void {
    this.info(`🔧 Tool Call [${requestId}]`, {
      tool: toolName,
      arguments: args
    });
  }

  logResourceAccess(uri: string, requestId: string): void {
    this.info(`📄 Resource Access [${requestId}]`, {
      uri
    });
  }

  logServerEvent(event: string, data?: any): void {
    this.info(`🚀 Server Event: ${event}`, data);
  }
}
