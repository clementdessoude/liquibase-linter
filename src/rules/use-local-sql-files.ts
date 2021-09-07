import { ChangeSet } from "liquibase/types";
import { Reporter } from "reporter";

export const check = (changeSet: ChangeSet, reporter: Reporter) => {
  const hasRemoteSqlFilePath = changeSet.changes.some(change => {
    const sqlFileChange = change.sqlFile;
    if (!sqlFileChange) return false;

    const isPathLocal = sqlFileChange.relativeToChangelogFile && sqlFileChange?.path?.startsWith("./");
    return !isPathLocal;
  });
  if (hasRemoteSqlFilePath) {
    reporter.warning(
      `The changeSet contains a sql script imported from another directory. More details [here](https://github.com/clementdessoude/liquibase-linter/tree/main/src/rules/use-local-sql-files.md)`,
      changeSet.id
    );
  }
};
