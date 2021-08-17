export interface LinterConfiguration {
  failOnErrors: boolean;
  liquibaseLinterIgnorePath?: string;
}

export const defaultConfiguration: LinterConfiguration = { failOnErrors: true };
