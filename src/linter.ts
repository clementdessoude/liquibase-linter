"use strict";

import * as fs from "fs";
import startsWith from "lodash/startsWith";

import { defaultConfiguration } from "./configuration";
import { rules } from "./rules"
import { LinterIgnore } from "./liquibaseIgnore";
import { parser } from "./parser";
import { Reporter } from "./reporter";

export const lint = (fileName: string, configuration = defaultConfiguration) => {

  const reporter = new Reporter(fileName);

  const absoluteFileName = startsWith(fileName, "/") ? fileName : `${process.cwd()}/${fileName}`;
  const fileContent = fs.readFileSync(absoluteFileName, "utf8");

  const doc = parser(fileContent);
  const linterIgnore = new LinterIgnore(configuration.liquibaseLinterIgnorePath, fileName);

  doc.databaseChangeLog.forEach(({ changeSet }) => {
    if (linterIgnore.contains(changeSet)) {
      return;
    }

    rules.forEach(checkRule => {
      checkRule(changeSet, reporter)
    });
  });

  if (reporter.hasErrors() && configuration.failOnErrors) {
    process.exit(1);
  }

  return reporter.violations;
};
