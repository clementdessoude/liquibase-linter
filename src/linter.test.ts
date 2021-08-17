import { lint } from "./linter";

describe("linter.ts", () => {
  it("should fail on changelog with breaking changes", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });

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
    expect(mockExit).not.toHaveBeenCalled();
  });

  it("should fail on changelog with breaking changes", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });
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
});
