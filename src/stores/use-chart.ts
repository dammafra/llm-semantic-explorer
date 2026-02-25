import { Vector3 } from 'three'
import { create } from 'zustand'

export type PointData = {
  position: [number, number, number]
  token: string
  step: number
  path_id: number
  cluster_id: number
}

export type PathData = {
  id: number
  name: string
  prompt: string
  response: string
  points: PointData[]
}

export type ClusterData = {
  id: number
  name: string
  count: number
}

export type ChartData = {
  paths: PathData[]
  clusters: ClusterData[]
}

type HoverData = {
  pathName: string
  pathId: number
  clusterId: number
  token: string
  step: number
  clientX: number
  clientY: number
}

type ChartState = {
  data: ChartData | null
  centroid: Vector3
  mode: 'paths' | 'clusters'
  spreadScale: number
  hoveredNode: HoverData | null
  pathVisibleSteps: Record<number, number>
  playingPaths: Record<number, boolean>
  hiddenPaths: Set<number>
  hiddenClusters: Set<number>

  // Actions
  setData: (data: ChartData) => void
  setMode: (mode: 'paths' | 'clusters') => void
  setSpreadScale: (scale: number) => void
  setHoveredNode: (node: HoverData | null) => void
  setVisibleSteps: (pathId: number, steps: number) => void
  setPlaying: (pathId: number, isPlaying: boolean) => void
  togglePlaying: (pathId: number) => void
  togglePathVisibility: (id: number) => void
  toggleClusterVisibility: (id: number) => void
}

export const useChart = create<ChartState>()(set => ({
  data: null,
  centroid: new Vector3(0, 0, 0),
  mode: 'paths',
  spreadScale: 1.0,
  hoveredNode: null,
  pathVisibleSteps: {},
  playingPaths: {},
  hiddenPaths: new Set(),
  hiddenClusters: new Set(),

  setData: data => {
    // Calculate centroid
    const centroid = new Vector3(0, 0, 0)
    let totalPoints = 0
    data.paths.forEach(path => {
      path.points.forEach(p => {
        centroid.x += p.position[0]
        centroid.y += p.position[1]
        centroid.z += p.position[2]
        totalPoints++
      })
    })

    centroid.divideScalar(totalPoints > 0 ? totalPoints : 1)

    set({
      data,
      centroid,
      hoveredNode: null,
      pathVisibleSteps: data.paths.reduce(
        (acc, path) => ({
          ...acc,
          [path.id]: path.points.length,
        }),
        {},
      ),
      playingPaths: {},
      hiddenPaths: new Set(),
      hiddenClusters: new Set(),
    })
  },

  setMode: mode =>
    set(() => ({
      mode,
      playingPaths: {},
      hiddenClusters: new Set(),
    })),

  setSpreadScale: spreadScale => set({ spreadScale }),

  setHoveredNode: hoveredNode => set({ hoveredNode }),

  setVisibleSteps: (pathId, steps) =>
    set(state => ({
      pathVisibleSteps: {
        ...state.pathVisibleSteps,
        [pathId]: steps,
      },
    })),

  setPlaying: (pathId, isPlaying) =>
    set(state => ({
      playingPaths: { ...state.playingPaths, [pathId]: isPlaying },
    })),

  togglePlaying: pathId =>
    set(state => {
      const isPlaying = !state.playingPaths[pathId]
      const currentSteps = state.pathVisibleSteps[pathId]
      const totalPoints = state.data?.paths.find(p => p.id === pathId)?.points.length || 0

      const newState: Partial<ChartState> = {
        playingPaths: { ...state.playingPaths, [pathId]: isPlaying },
      }

      // If starting and already at the end, reset to start
      if (isPlaying && currentSteps >= totalPoints) {
        newState.pathVisibleSteps = {
          ...state.pathVisibleSteps,
          [pathId]: 1,
        }
      }

      return newState
    }),

  togglePathVisibility: id =>
    set(state => {
      const next = new Set(state.hiddenPaths)
      next.has(id) ? next.delete(id) : next.add(id)
      return { hiddenPaths: next }
    }),

  toggleClusterVisibility: id =>
    set(state => {
      const next = new Set(state.hiddenClusters)
      next.has(id) ? next.delete(id) : next.add(id)
      return { hiddenClusters: next }
    }),
}))
