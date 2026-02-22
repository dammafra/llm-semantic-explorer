import { randomColor } from '@utils'
import * as THREE from 'three'
import { create } from 'zustand'

export type PointData = {
  position: [number, number, number]
  cluster_id: number | null
  token: string
  step: number
}

export type PathData = {
  name: string
  prompt: string
  points: PointData[]
  pathColor: string
  clusterColor: string
}

export type VisualizerData = {
  paths: PathData[]
  clusters: number
}

type HoverData = {
  pathId: string
  clusterId: number | null
  token: string
  step: number
  color: string
  clientX: number
  clientY: number
}

type VisualizerState = {
  data: VisualizerData | null
  centroid: THREE.Vector3
  mode: 'paths' | 'clusters'
  spreadScale: number
  hoveredNode: HoverData | null

  // Actions
  setData: (data: VisualizerData) => void
  setMode: (mode: 'paths' | 'clusters') => void
  setSpreadScale: (scale: number) => void
  setHoveredNode: (node: HoverData | null) => void
}

export const useStore = create<VisualizerState>()(set => ({
  data: null,
  centroid: new THREE.Vector3(0, 0, 0),
  mode: 'paths',
  spreadScale: 1.0,
  hoveredNode: null,

  setData: data => {
    data.paths.forEach(path => {
      path.pathColor = randomColor()
      path.clusterColor = randomColor()
    })

    // Calculate centroid
    const centroid = new THREE.Vector3(0, 0, 0)
    let totalPoints = 0
    Object.values(data.paths).forEach(path => {
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
    })
  },

  setMode: mode => set({ mode }),

  setSpreadScale: spreadScale => set({ spreadScale }),

  setHoveredNode: hoveredNode => set({ hoveredNode }),
}))
