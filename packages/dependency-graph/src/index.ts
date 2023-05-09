import { getWorkspaceDependencies } from './get-dependencies';
import { writeDependencyGraph } from './graph-dependencies';

export const createDependencyGraph = async (
  workspaceRoot: string,
  workspaceAlias: string = '@atj',
  dependencyGraphOutputPath?: string
) => {
  const workspaceDependencies = await getWorkspaceDependencies(
    workspaceRoot,
    workspaceAlias
  );
  if (!dependencyGraphOutputPath) {
    dependencyGraphOutputPath = `${workspaceRoot}/workspace-dependencies.svg`;
  }
  writeDependencyGraph(workspaceDependencies, dependencyGraphOutputPath);
};
