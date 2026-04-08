import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { useQueryParams } from '@hooks'
import { useChart, type ChartData } from '@stores'

// Automatically list files from public/datasets using Vite's glob feature
const datasetModules = import.meta.glob('/public/datasets/*.json')
const defaultDatasets = Object.keys(datasetModules).map(path => path.split('/').pop() || '')

export function DatasetSelector() {
  const { background, dataset: queryDataset } = useQueryParams()
  const data = useChart(s => s.data)
  const fileInputRef = useRef<HTMLInputElement>(null!)
  const uploadedCache = useRef<Map<string, ChartData>>(new Map())
  const [datasetOptions, setDatasetOptions] = useState(defaultDatasets)
  const [selected, setSelected] = useState(defaultDatasets[0] || '')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const parsed: ChartData = JSON.parse(e.target?.result as string)
        const name = file.name

        // Cache uploaded data so it can be re-selected later
        uploadedCache.current.set(name, parsed)
        useChart.getState().setData(parsed)

        setDatasetOptions(prev => (prev.includes(name) ? prev : [...prev, name]))
        setSelected(name)
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

    // Check if this is a cached uploaded file
    const cached = uploadedCache.current.get(filename)
    if (cached) {
      useChart.getState().setData(cached)
      setSelected(filename)
      return
    }

    try {
      const response = await fetch(`/datasets/${filename}`)
      if (!response.ok) throw new Error('Dataset fetch failed')
      const parsed: ChartData = await response.json()
      useChart.getState().setData(parsed)
      setSelected(filename)
    } catch (err) {
      console.error('Fetch JSON Error:', err)
      alert('Failed to load selected dataset.')
    }
  }

  const handleSelectDataset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    loadDataset(event.target.value)
  }

  // Auto-load dataset on mount: prefer query param, then first available
  useEffect(() => {
    if (!data) {
      if (queryDataset) {
        // Add .json extension if not present
        const filename = queryDataset.endsWith('.json') ? queryDataset : `${queryDataset}.json`
        loadDataset(filename)
      } else if (defaultDatasets.length > 0) {
        loadDataset(defaultDatasets[0])
      }
    }
  }, [data])

  // If dataset set from query param, hide the selector entirely
  if (queryDataset) return null

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
            className={clsx(
              'w-full font-medium py-1.5 pl-3 pr-8 rounded-lg cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm',
              background
                ? 'bg-white/[0.08] hover:bg-white/[0.12] text-white'
                : 'bg-black/[0.08] hover:bg-black/[0.12] text-black',
            )}
            onChange={handleSelectDataset}
            value={selected}
          >
            {datasetOptions.map(name => (
              <option key={name} value={name} className="text-black">
                {name.replace('.json', '')}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon
              icon="ri:arrow-down-s-line"
              className={clsx('w-4 h-4', background ? 'text-white/40' : 'text-black/40')}
            />
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
