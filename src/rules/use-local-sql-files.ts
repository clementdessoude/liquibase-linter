import { ChangeSet } from "liquibase/types";
import { Reporter } from "reporter";

export const check = (changeSet: ChangeSet, reporter: Reporter) => {
  const hasRemoteSqlFilePath = changeSet.changes.some(change => {
    const sqlFilePath = change?.sqlFile?.path;
    return sqlFilePath && !sqlFilePath.includes('db/changelog/changes');
  });
  if (hasRemoteSqlFilePath) {
    reporter.warning(`The changeSet contains a sql script imported from another directory. More details [here](https://github.com/clementdessoude/liquibase-linter/tree/main/src/rules/use-local-sql-files.md)`, changeSet.id);
  }
};
