import { Runtime, Inspector } from '@observablehq/runtime'
import { forwardRef, useEffect, useState, useRef } from 'react'

const Cell = forwardRef(({
    height = 'auto',
    width = 'auto',
    column = 1,
    row = 1,
    columnSpan = 1,
    rowSpan = 1,
}, ref) => {
    return <div
        style={{
            overflow: 'auto',
            height,
            width,
            gridColumn: `${column} / span ${columnSpan}`,
            gridRow: `${row} / span ${columnSpan}`,
        }}
        ref={ref}
    />
})

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