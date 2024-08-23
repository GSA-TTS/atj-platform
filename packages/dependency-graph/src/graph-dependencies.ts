import * as graphviz from 'graphviz';
import { DependencyMap } from './get-dependencies.js';

const createGraphvizDigraph = (workspaceDependencies: DependencyMap) => {
  const graph = graphviz.digraph('workspace');
  graph.set('layout', 'neato');
  Object.entries(workspaceDependencies).forEach(
    ([projectName, projectDependencies]) => {
      graph.addNode(projectName);
      projectDependencies.forEach(dependency =>
        graph.addEdge(projectName, dependency)
      );
    }
  );
  return graph;
};

export const writeDependencyGraph = (
  workspaceDependencies: DependencyMap,
  dependencyGraphOutputPath: string
) => {
  const graph = createGraphvizDigraph(workspaceDependencies);
  graph.output({ type: 'svg', use: 'dot' }, dependencyGraphOutputPath);
};
