import { DatabaseChangeLog, LiquibaseProperty } from "./types";

export const isDatabaseChangeLog = (obj: DatabaseChangeLog | LiquibaseProperty): obj is DatabaseChangeLog => {
  return (obj as DatabaseChangeLog).changeSet !== undefined;
};
