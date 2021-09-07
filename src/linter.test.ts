import { lint } from "./linter";

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
  return undefined as never;
});

describe("linter.ts", () => {
  describe("with yaml files", () => {
    beforeEach(() => {
      mockExit.mockClear();
    });

    it("should fail on changelog with breaking changes", () => {
      const violations = lint("src/fixtures/20210609163846-drop-column.yaml", {
        failOnErrors: false,
      });

      expect(violations).toStrictEqual([
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropColumn!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-drop-column.yaml",
        },
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropTable!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-drop-column.yaml",
        },
      ]);
    });

    it("should fail on changelog with breaking changes", () => {
      const violations = lint("src/fixtures/20210609163846-drop-column.yaml", {
        failOnErrors: true,
      });

      expect(violations).toStrictEqual([
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropColumn!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-drop-column.yaml",
        },
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropTable!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-drop-column.yaml",
        },
      ]);
      expect(mockExit).toHaveBeenCalledTimes(1);
    });

    it("should pass on changelog without breaking changes", () => {
      const violations = lint("src/fixtures/20200115-ff4j.yml", {
        failOnErrors: false,
      });

      expect(violations).toStrictEqual([]);
    });

    it("should print warning on importing sqlFile from other directory", () => {
      const violations = lint("src/fixtures/202109030956-sql-file-remote.yaml", {
        failOnErrors: true,
      });

      expect(violations).toStrictEqual([
        {
          level: "WARNING",
          message:
            "The changeSet contains a sql script imported from another directory. More details [here](https://github.com/clementdessoude/liquibase-linter/tree/main/src/rules/use-local-sql-files.md)",
          changeSetId: "1627301803196-1",
          fileName: "src/fixtures/202109030956-sql-file-remote.yaml",
        },
      ]);
      expect(mockExit).toHaveBeenCalledTimes(0);
    });

    it("should pass on changelog with sqlFile import from same directory", () => {
      const violations = lint("src/fixtures/202109030956-sql-file-local.yaml", {
        failOnErrors: false,
      });

      expect(violations).toStrictEqual([]);
    });
  });

  describe("with json files", () => {
    beforeEach(() => {
      mockExit.mockClear();
    });

    it("should pass on changelog without breaking changes", () => {
      const violations = lint("src/fixtures/20200115-ff4j.json", {
        failOnErrors: false,
      });

      expect(violations).toStrictEqual([]);
    });

    it("should fail on changelog with breaking changes", () => {
      mockExit.mockClear();

      const violations = lint("src/fixtures/20210609163846-several-failing-changeset.json", {
        failOnErrors: false,
      });

      expect(violations).toStrictEqual([
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropColumn!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-several-failing-changeset.json",
        },
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropTable!",
          changeSetId: "1623249542074-24",
          fileName: "src/fixtures/20210609163846-several-failing-changeset.json",
        },
      ]);
      expect(mockExit).not.toHaveBeenCalled();
    });

    it("should fail on changelog with breaking changes", () => {
      const violations = lint("src/fixtures/20210609163846-several-failing-changeset.json", {
        failOnErrors: true,
      });

      expect(violations).toStrictEqual([
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropColumn!",
          changeSetId: "1623249542074-23",
          fileName: "src/fixtures/20210609163846-several-failing-changeset.json",
        },
        {
          level: "ERROR",
          message: "The changeset contains the following breaking changes dropTable!",
          changeSetId: "1623249542074-24",
          fileName: "src/fixtures/20210609163846-several-failing-changeset.json",
        },
      ]);
      expect(mockExit).toHaveBeenCalledTimes(1);
    });
  });
});
