import { ChangeSet } from "liquibase/types";
import { Reporter } from "reporter";

const breakingChanges = ["dropColumn", "dropTable", "renameColumn", "renameTable"];

const hasBreakingChange = (changes: Set<string>) => {
  for (let breakingChange of breakingChanges) {
    if (changes.has(breakingChange)) {
      return true;
    }
  }

  return false;
};

const getBreakingChanges = (changes: Set<String>) => {
  return breakingChanges.filter(breakingChange => changes.has(breakingChange));
};

export const check = (changeset: ChangeSet, reporter: Reporter) => {
  changeset.changes.forEach(change => {
    const typeOfChanges = new Set(Object.keys(change));
    if (hasBreakingChange(typeOfChanges)) {
      const includedBreakingChanges = getBreakingChanges(typeOfChanges);
      reporter.error(`The changeset contains the following breaking changes ${includedBreakingChanges}!`, changeset.id);
    }
  });
};
