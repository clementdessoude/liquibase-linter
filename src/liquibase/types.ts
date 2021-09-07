export interface ChangelogFileContent {
  databaseChangeLog: DatabaseChangeLog[];
}

export interface DatabaseChangeLog {
  changeSet: ChangeSet;
}

export interface ChangeSet {
  id: string;
  author: string;
  changes: Change[];
}

export type Change = { ["sqlFile"]: SqlFile };

interface SqlFile {
  path: string;
  dbms?: string;
  endDelimiter?: string;
  splitStatements?: boolean;
  stripComments?: boolean;
  encoding?: string;
  relativeToChangelogFile?: boolean;
}
