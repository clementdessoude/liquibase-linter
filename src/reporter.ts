export enum ErrorLevel {
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export interface Violation {
  level: ErrorLevel;
  message: string;
  changeSetId: string;
  fileName: string;
}

export class Reporter {
  _violations: Violation[] = [];
  fileName = "";

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  error(message: string, changeSetId: string) {
    this._violations.push({ level: ErrorLevel.ERROR, message, changeSetId, fileName: this.fileName });
  }

  warning(message: string, changeSetId: string) {
    this._violations.push({ level: ErrorLevel.WARNING, message, changeSetId, fileName: this.fileName });
  }

  get violations() {
    return this._violations;
  }

  hasErrors() {
    return this._violations.some(violation => violation.level === ErrorLevel.ERROR);
  }
}
