import { Runtime, Inspector } from '@observablehq/runtime'
import { useEffect, useRef } from 'react'

import Cell from './Cell.js'

export default function Dashboard({ config }) {
    useEffect(() => {
        (async () => {
            const notebookUrl = `https://api.observablehq.com/${config.notebook}.js?v=3`
            const { default: notebook } = await import(/* webpackIgnore: true */notebookUrl)
            new Runtime().module(notebook, name => {
                if (config.cells.map(d => d.name).includes(name)) {
                    return new Inspector(cellRefs.current.get(name))
                }
            })
        })()
    }, [config])

    const cellRefs = useRef(new Map())

    return (
        <div style={{
            display: 'grid',
            columnGap: config.grid.columnGap,
            rowGap: config.grid.rowGap,
        }}>
            {config.cells.map(
                ({
                    name,
                    height,
                    width,
                    column,
                    columnSpan,
                    row,
                    rowSpan,
                }) => <Cell
                    height={height}
                    width={width}
                    column={column}
                    columnSpan={columnSpan}
                    row={row}
                    rowSpan={rowSpan}
                    key={name}
                    ref={el => cellRefs.current.set(name, el)}
                />
            )}
        </div>
    )
}