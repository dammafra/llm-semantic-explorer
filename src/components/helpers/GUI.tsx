import { useStore, type VisualizerData } from '@stores'
import { COLORS } from '@utils'
import { useEffect, useRef } from 'react'
import { Pane } from 'tweakpane'

export function GUI() {
  const state = useStore()

  const containerRef = useRef<HTMLDivElement>(null!)
  const fileInputRef = useRef<HTMLInputElement>(null!)
  const paneRef = useRef<Pane>(null!)

  useEffect(() => {
    paneRef.current = new Pane({ container: containerRef.current })

    if (!state.data) {
      paneRef.current
        .addButton({ title: 'Load JSON' })
        .on('click', () => fileInputRef.current?.click())
      return
    }

    paneRef.current
      .addBinding(state, 'spreadScale', {
        label: 'Distance',
        min: 1,
        max: 10,
        step: 0.1,
      })
      .on('change', e => state.setSpreadScale(e.value))

    const tabs = paneRef.current.addTab({ pages: [{ title: 'Paths' }, { title: 'Clusters' }] })
    tabs.on('select', e => {
      if (e.index < 0) return
      state.setMode(e.index === 0 ? 'paths' : 'clusters')
    })

    const pathsTab = tabs.pages[0]

    state.data.paths.forEach(path => {
      const folder = pathsTab.addFolder({ title: path.name })

      const titleElement = folder.element.querySelector('.tp-fldv_t')!
      const dot = document.createElement('span')
      dot.className = 'inline-block w-2 h-2 rounded-full mr-2'
      dot.style.backgroundColor = COLORS[path.id]
      titleElement.prepend(dot)

      folder.addBinding(path, 'prompt', { readonly: true })
      folder.addBinding(path, 'response', { readonly: true })
    })

    const clustersTab = tabs.pages[1]

    state.data.clusters.forEach((cluster, id) => {
      const folder = clustersTab.addFolder({ title: cluster.name })

      const titleElement = folder.element.querySelector('.tp-fldv_t')!
      const dot = document.createElement('span')
      dot.className = 'inline-block w-2 h-2 rounded-full mr-2'
      dot.style.backgroundColor = COLORS[id]
      titleElement.prepend(dot)

      folder.addBinding(cluster, 'count', { readonly: true })
    })

    return () => paneRef.current.dispose()
  }, [state.data])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const parsed: VisualizerData = JSON.parse(e.target?.result as string)
        state.setData(parsed)
      } catch (err) {
        console.error('JSON Error:', err)
        alert('JSON format error.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <div
        ref={containerRef}
        className="absolute left-0 top-0 w-70 p-1 z-9999 **:rounded-none! bg-[#28292e]"
      />
    </>
  )
}
