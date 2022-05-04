import { Runtime, Inspector, Library } from '@observablehq/runtime'
import { useState, useEffect, useRef } from "react"
import useLocalStorage from '../../utils/useLocalStorage'
import Dashboard from "../Dashboard"
import Cell from '../Dashboard/Cell'
import CellInspector from './CellInspector'

const exampleConfig = require('../../examples/1.json')

export default function Editor() {
    const [config, setConfig] = useLocalStorage('document', exampleConfig)

    const [module, setModule] = useState()
    const [selectedCell, setSelectedCell] = useState()
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

    const nonCellVars = module ?
        Array.from(module._scope)
            .filter(([name, _]) => !module._runtime._builtin._scope.has(name)) :
        []

    const selectedCellConfig = selectedCell ? config.cells.find(d => d.name === selectedCell) : null
    
    return (
        <div className="flex h-screen">
            <div className="border-r border-slate-300 p-5 w-64 shrink-0 overflow-auto">
                <h2 className="font-semibold">{config.notebook}</h2>
                <ul>
                    {nonCellVars.map(([name, def]) => <button
                        className={[
                            'bg-slate-100',
                            'px-2',
                            'border-radius-1',
                            'my-1',
                            'rounded-md',
                            'block',
                            'w-full',
                            'text-left',
                            'hover:bg-slate-200',
                            'text-slate-800',
                            'text-sm',
                            'border-2',
                            name === selectedCell ? 'border-slate-400' : 'border-slate-100',
                        ].join(' ')}
                        key={name}
                        onClick={() => setSelectedCell(name)}
                    >{name} {cellDivs.current.has(name) && <span style={{ width: 10, height: 10, borderRadius: 5, display: 'inline-block' }} className="bg-slate-500" />}</button>)}
                </ul>
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
                            selected={selectedCell === name}
                            ref={d => cellDivs.current.set(name, d)}
                        />
                    })}
                </Dashboard>
            </div>
            <div className="border-slate-300 p-5 border-l w-64 shrink-0 overflow-auto">
                <div className="mb-5">
                    <h2 className="font-semibold">Grid</h2>
                    Columns: {config.grid.columns || 'auto'}<br />
                    Rows: {config.grid.rows || 'auto'}<br />
                    Column gap: {config.grid.columnGap}<br />
                    Row gap: {config.grid.rowGap}<br />
                </div>

                {selectedCell && <CellInspector config={selectedCellConfig} />}
            </div>
        </div>
    )
}