import yaml from 'js-yaml';

import { ChangelogFileContent } from 'liquibase/types';
import { LiquibaseIgnoreFileContent } from 'types';

export const parser = (fileContent: string) => {
  try {
    return yaml.load(fileContent) as ChangelogFileContent;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export const parseLinterIgnore = (fileContent: string) => {
  try {
    return yaml.load(fileContent) as LiquibaseIgnoreFileContent;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
