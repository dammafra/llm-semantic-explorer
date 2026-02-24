import { Icon } from '@iconify/react'
import { useEffect, useRef } from 'react'

import { useChart, type ChartData } from '@stores'

// Automatically list files from public/datasets using Vite's glob feature
const datasetModules = import.meta.glob('/public/datasets/*.json')
const datasets = Object.keys(datasetModules).map(path => path.split('/').pop() || '')

export function DatasetSelector() {
  const state = useChart()
  const fileInputRef = useRef<HTMLInputElement>(null!)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const parsed: ChartData = JSON.parse(e.target?.result as string)
        state.setData(parsed)
      } catch (err) {
        console.error('JSON Error:', err)
        alert('JSON format error.')
      }
    }
    reader.readAsText(file)
    // Reset file input so the same file can be loaded again if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const loadDataset = async (filename: string) => {
    if (!filename) return

    try {
      const response = await fetch(`/datasets/${filename}`)
      if (!response.ok) throw new Error('Dataset fetch failed')
      const parsed: ChartData = await response.json()
      state.setData(parsed)
    } catch (err) {
      console.error('Fetch JSON Error:', err)
      alert('Failed to load selected dataset.')
    }
  }

  const handleSelectDataset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    loadDataset(event.target.value)
  }

  // Auto-load first dataset on mount if no data exists
  useEffect(() => {
    if (!state.data && datasets.length > 0) {
      loadDataset(datasets[0])
    }
  }, [state.data])

  return (
    <>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            className="w-full bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium py-1.5 pl-3 pr-8 rounded-lg cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm"
            onChange={handleSelectDataset}
            defaultValue={datasets[0] || ''}
          >
            {datasets.map(name => (
              <option key={name} value={name} className="text-black">
                {name.replace('.json', '')}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon icon="ri:arrow-down-s-line" className="w-4 h-4 text-white/40" />
          </div>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg w-8 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          title="Load custom JSON"
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
