import { check as doNotUseBreakingChanges } from "./do-not-use-breaking-changes";
import { check as useLocalSqlFiles } from "./use-local-sql-files";

export const rules = [doNotUseBreakingChanges, useLocalSqlFiles];
