import { findWorkspacePackages, Project } from '@pnpm/find-workspace-packages';

const filterNamespace = (
  namespaceAlias: string,
  dependencies?: Record<string, string>
): string[] => {
  return Object.keys(dependencies || {}).filter(dependency =>
    dependency.startsWith(namespaceAlias)
  );
};

const getProjectDependencies = (project: Project, namespaceAlias: string) => {
  return [
    project.manifest.name,
    [
      ...filterNamespace(namespaceAlias, project.manifest.devDependencies),
      ...filterNamespace(namespaceAlias, project.manifest.dependencies),
    ],
  ];
};

export type DependencyMap = Record<string, string[]>;

export const getWorkspaceDependencies = (
  workspaceRoot: string,
  namespaceAlias: string
): Promise<DependencyMap> => {
  return findWorkspacePackages(workspaceRoot).then((projects: Project[]) => {
    const workspaceDependencies = Object.fromEntries(
      projects
        .filter(project => project.manifest.name?.startsWith(namespaceAlias))
        .map(project => getProjectDependencies(project, namespaceAlias))
    );
    return workspaceDependencies;
  });
};
