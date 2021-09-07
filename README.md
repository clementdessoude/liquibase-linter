# Liquibase linter

This linter is meant to check if your liquibase migrations follow some best practices.

⚠️ Only works for json and yaml formatted liquibase migrations

## Available rules

### Do not use breaking changes

This rule is meant to not introduce breaking changes carelessly. Following changes are checked, as they introduce a breaking change in your database schema:

- dropColumn
- dropTable
- renameColumn
- renameTable

Sometimes, you will want to use one of these type of change. If you are sure that it is safe (no consumer is needing a column, for instance), you can still use it by adding the changelog in a [`.liquibase-linter-ignore.yaml`](#liquibase-linter-ignore) file

## How to use the linter ?

For now, the linter is only available in a JavaScript script. You need to:

1. Install the dependency (`npm install liquibase-linter --save-dev` or `yarn add --dev liquibase-linter`)
2. Create a JavaScript file where you import the dependency
3. Specify the path name of the file you want to check

```js
import { lint } from "liquibase-linter";

lint("my/file/path.yaml");
```

### Example in combination with [danger.js](https://danger.systems/js/)

```ts
import { fail, warn, danger } from "danger";
import { lint } from "liquibase-linter";

const updatedFiles = [...danger.git.created_files, ...danger.git.modified_files];

const liquibaseConfig = {
  failOnErrors: false,
  liquibaseLinterIgnorePath: ".liquibase-linter-ignore.yaml",
};

const loggerByLevel = {
  WARNING: warn,
  ERROR: fail,
};

const liquibaseLinterViolations = updatedFiles
  .filter(fileName => fileName.includes("src/main/resources/db/changelog"))
  .flatMap(fileName => lint(fileName, liquibaseIgnoreConfig));

liquibaseLinterViolations.forEach(violation =>
  loggerByLevel[violation.level](
    `Changeset ${violation.changeSetId} from ${violation.fileName} fails with message: \n    ${violation.message}`
  )
);
```

## Liquibase Linter Ignore

You can create a liquibase linter ignore file to ignore some of the violations reported by the linter if you know the changes provided are safe.

For instance, if you add this file, the violations related to the changeSet `1623249542074-24` in your `db/changes/20210609163846-failing-changeset.yaml` migration file will be ignored.

`.liquibase-linter-ignore.yaml`

```yaml
ignores:
  - fileName: db/changes/20210609163846-failing-changeset.yaml
    changeSet: 1623249542074-24
```
