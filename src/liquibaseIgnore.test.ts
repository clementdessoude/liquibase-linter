import { lint } from "./linter";

describe("liquibaseIgnore.ts", () => {
  it("should ignore changelog in liquibase ignore", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });

    const violations = lint("src/fixtures/20210609163846-several-failing-changeset.yaml", {
      failOnErrors: false,
      liquibaseLinterIgnorePath: "src/fixtures/.liquibase-linter-ignore-example.yaml",
    });

    expect(violations).toStrictEqual([
      {
        level: "ERROR",
        message: "The changeset contains the following breaking changes dropColumn!",
        changeSetId: "1623249542074-23",
        fileName: "src/fixtures/20210609163846-several-failing-changeset.yaml",
      },
    ]);
    expect(mockExit).not.toHaveBeenCalled();
  });
});
