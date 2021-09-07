# Do not import SQL File from other directory (use-local-sql-files)

Liquibase requires to preserve the integrity of its history.
It does this by calculating checksums of each change sets.
When importing operations from an SQL script file, if this file is modified, the checksum will be modified as well.
Therefore, history integrity will be broken and you will have an error when trying to run migrations.
To materialize the dependency, it is a good practice to store script file used in migrations directly next to the migration files themselves.

## Rule Details

👎 Example of incorrect code for this rule:

```
databaseChangeLog:
  - changeSet:
      id: 1627301803196-1
      changes:
        - sqlFile:
            path: db/fixtures/script.sql
```

👍 Example of correct code for this rule:

```
databaseChangeLog:
  - changeSet:
      id: 1627301803196-1
      changes:
        - sqlFile:
            path: db/changelog/changes/data/script.sql
```
