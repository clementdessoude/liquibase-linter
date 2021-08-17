import * as fs from "fs";

import { ChangeSet } from "liquibase/types";
import { LiquibaseLinterIgnore } from "types";
import { parseLinterIgnore } from "./parser";

export class LinterIgnore {
  ignores: LiquibaseLinterIgnore[] = [];

  constructor(ignoreFileName: string | undefined, changelogFileName: string) {
    if (!ignoreFileName) {
      return;
    }

    const absoluteFileName = ignoreFileName.charAt(0) === "/" ? ignoreFileName : process.cwd() + "/" + ignoreFileName;
    const fileContent = fs.readFileSync(absoluteFileName, "utf8");

    const doc = parseLinterIgnore(fileContent);

    this.ignores = doc.ignores.filter(ignore => ignore.fileName === changelogFileName);
  }

  contains(changeSet: ChangeSet) {
    return this.ignores.some(ignore => ignore.changeSet === changeSet.id);
  }
}
