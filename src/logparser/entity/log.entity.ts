type LogInfo = {
  transactionId: string;
  details: string;
  err?: string;
  code?: number;
  userId?: number;
  user?: object;
};

export class LogEntity {
  timestamp: number;
  loglevel: string;
  transactionId: string;
  details: string;
  err: string;
  code: number;
  userId: number;
  user: object;

  constructor(timestamp: string, loglevel: string, logInfo: LogInfo) {
    this.timestamp = Date.parse(timestamp);
    this.loglevel = loglevel;
    this.transactionId = logInfo.transactionId;
    this.details = logInfo.details;

    if (logInfo.err) this.err = logInfo.err || null;
    if (logInfo.code) this.code = logInfo.code || null;
    if (logInfo.userId) this.userId = logInfo.userId || null;
    if (logInfo.user) this.user = logInfo.user || null;
  }

  getTimeStampInEpoch(): number {
    return this.timestamp;
  }

  getLoglevel(): string {
    return this.loglevel;
  }

  getTransactionId(): string {
    return this.transactionId;
  }

  getDetails(): string {
    return this.details;
  }

  getErr(): string {
    return this.err;
  }

  getCode(): number {
    return this.code;
  }

  setErr(err: string) {
    this.err = err;
  }
}
