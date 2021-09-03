import { ChangeSet } from "liquibase/types";
import { Reporter } from "reporter";

export const check = (changeSet: ChangeSet, reporter: Reporter) => {
  const hasRemoteSqlFilePath = changeSet.changes.some(change => {
    const sqlFilePath = change?.sqlFile?.path;
    return sqlFilePath && !sqlFilePath.startsWith('./')
  })
  if (hasRemoteSqlFilePath) {
    reporter.error(`The changeSet contains an sql script imported from another directory`, changeSet.id);
  }
};
