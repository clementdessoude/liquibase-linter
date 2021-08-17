"use strict";

import * as fs from "fs";
import startsWith from "lodash/startsWith";

import { defaultConfiguration } from "./configuration";
import { check as doNotUseBreakingChanges } from "./rules/do-not-use-breaking-changes";
import { LinterIgnore } from "./liquibaseIgnore";
import { parser } from "./parser";
import { Reporter } from "./reporter";

export const lint = (fileName: string, configuration = defaultConfiguration) => {
  console.debug("Lint", fileName);

  const reporter = new Reporter(fileName);

  const absoluteFileName = startsWith(fileName, "/") ? fileName : `${process.cwd()}/${fileName}`;
  const fileContent = fs.readFileSync(absoluteFileName, "utf8");

  const doc = parser(fileContent);
  const linterIgnore = new LinterIgnore(configuration.liquibaseLinterIgnorePath, fileName);

  doc.databaseChangeLog.forEach(({ changeSet }) => {
    if (linterIgnore.contains(changeSet)) {
      return;
    }

    doNotUseBreakingChanges(changeSet, reporter);
  });

  console.debug("Violations", reporter.violations);
  if (reporter.hasErrors() && configuration.failOnErrors) {
    process.exit(1);
  }

  return reporter.violations;
};
