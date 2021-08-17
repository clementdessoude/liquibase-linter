export enum ErrorLevel {
  ERROR = 'ERROR',
}

export interface Violation {
  level: ErrorLevel;
  message: string;
  changeSetId: string;
  fileName: string;
}

export class Reporter {
  _violations: Violation[] = [];
  ERROR_LEVEL = ErrorLevel.ERROR;
  fileName = '';

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  error(message: string, changeSetId: string) {
    this._violations.push({ level: this.ERROR_LEVEL, message, changeSetId, fileName: this.fileName });
  }

  get violations() {
    return this._violations;
  }

  hasErrors() {
    return this._violations.some((violation) => violation.level === this.ERROR_LEVEL);
  }
}
