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

export type Change = Record<string, unknown>;
