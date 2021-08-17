export interface LiquibaseLinterIgnore {
  fileName: string;
  changeSet: string;
}

export interface LiquibaseIgnoreFileContent {
  ignores: LiquibaseLinterIgnore[];
}
