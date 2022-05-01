import { Runtime, Inspector, Library } from '@observablehq/runtime'
import { useState, useEffect, useRef } from "react"
import Dashboard from "../Dashboard"
import Cell from '../Dashboard/Cell'

export default function Editor({ config }) {
    const [module, setModule] = useState()
    const cellDivs = useRef(new Map())

    useEffect(() => {
        let dispose = () => {}
        (async () => {
            const notebookUrl = `https://api.observablehq.com/${config.notebook}.js?v=3`
            const { default: notebook } = await import(/* webpackIgnore: true */notebookUrl)
            const runtime = new Runtime()
            const module = runtime.module(notebook, name => {
                if (cellDivs.current.has(name)) {
                    return new Inspector(cellDivs.current.get(name))
                }
            })
            setModule(module)
            dispose = d => runtime.dispose()
        })()
        return () => dispose()
    }, [config])

    const nonCellVars = module ? Array.from(module._scope).filter(([name, _]) => !module._runtime._builtin._scope.has(name)) : []
    
    return (
        <div className="flex h-screen">
            <div className="border-r border-slate-300 p-5 w-64 shrink-0 overflow-auto">
                <h2 className="font-semibold">{config.notebook}</h2>
                {nonCellVars.map(([name, def]) => <button
                    className={[
                        'bg-slate-100',
                        'px-2',
                        'py-1',
                        'border-radius-1',
                        'my-2',
                        'rounded-md',
                        'block',
                        'w-full',
                        'text-left',
                        'hover:bg-slate-200',
                        'text-slate-800',
                        'text-sm',
                        cellDivs.current.has(name) ? 'border' : null,
                        'border-slate-400'
                    ].join(' ')}
                    key={name
                }>{name}</button>)}
            </div>
            <div className="p-5 bg-slate-50 overflow-auto">
                <Dashboard config={config}>
                    {config.cells.map(({
                        name,
                        height,
                        width,
                        column,
                        columnSpan,
                        row,
                        rowSpan,
                    }) => {
                        return <Cell
                            height={height}
                            width={width}
                            column={column}
                            columnSpan={columnSpan}
                            row={row}
                            rowSpan={rowSpan}
                            key={name}
                            ref={d => cellDivs.current.set(name, d)}
                        />
                    })}
                </Dashboard>
            </div>
            <div className="border-slate-300 p-5 border-l w-64 shrink-0 overflow-auto">
                <h2 className="font-semibold">Grid</h2>
                Columns: {config.grid.columns || 'auto'}<br />
                Rows: {config.grid.rows || 'auto'}<br />
                Column gap: {config.grid.columnGap}<br />
                Row gap: {config.grid.rowGap}<br />
            </div>
        </div>
    )
}