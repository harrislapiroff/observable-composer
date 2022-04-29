import { Runtime, Inspector } from '@observablehq/runtime'
import { forwardRef, useEffect, useState, useRef } from 'react'

const Cell = forwardRef(({ x, y, height, width }, ref) => {
    return <div
        style={{
            position: 'absolute',
            overflow: 'auto',
            top: y,
            left: x,
            height,
            width,
            border: '1px solid #CCC',
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
        <div style={{ position: 'relative' }}>
            {config.cells.map(
                ({ name, x, y, height, width }) => <Cell
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                    key={name}
                    ref={el => cellRefs.current.set(name, el)}
                />
            )}
        </div>
    )
}