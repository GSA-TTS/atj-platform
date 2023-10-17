export type GithubRepository = {
  owner: string;
  repository: string;
  branch: string;
  commit: string;
};

export const DEFAULT_REPOSITORY: GithubRepository = {
  owner: 'gsa-tts',
  repository: 'atj-platform',
  branch: 'main',
  commit: 'main',
};

export const getBranchTreeUrl = (
  github: GithubRepository,
  useDefaultShortForm = true
) => {
  if (useDefaultShortForm && github.branch === DEFAULT_REPOSITORY.branch) {
    return `https://github.com/${github.owner}/${github.repository}`;
  }
  return `https://github.com/${github.owner}/${github.repository}/tree/${github.branch}`;
};

export const getNewIssueUrl = (github: GithubRepository) => {
  return `https://github.com/${github.owner}/${github.repository}/issues/new/choose`;
};
