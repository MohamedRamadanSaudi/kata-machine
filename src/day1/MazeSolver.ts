const dir = [
  [-1, 0], // left
  [1, 0],  // right
  [0, -1], // up
  [0, 1]   // down
]
function walk(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  // 1. Base Case
  // off the map
  if (current.x < 0 || current.x >= maze[0].length || current.y < 0 || current.y >= maze.length) {
    return false;
  }
  // on a wall
  if (maze[current.y][current.x] === wall) {
    return false;
  }
  // at the end
  if (current.x === end.x && current.y === end.y) {
    path.push(end);
    return true;
  }
  // already seen
  if (seen[current.y][current.x]) {
    return false;
  }

  // 2. Recursive Case
  // pre
  seen[current.y][current.x] = true;
  path.push(current);
  // recurse
  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i];
    if (walk(maze, wall, { x: current.x + x, y: current.y + y }, end, seen, path)) {
      return true;
    }
  }
  // post
  path.pop();
  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = []
  const path: Point[] = []
  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false))
  }
  walk(maze, wall, start, end, seen, path)
  return path
}