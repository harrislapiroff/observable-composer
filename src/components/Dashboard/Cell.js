import { forwardRef  } from "react"

export default forwardRef(({
    height = 'auto',
    width = 'auto',
    column = 1,
    row = 1,
    columnSpan = 1,
    rowSpan = 1,
    selected = false,
}, ref) => {
    return <div
        className={`p-2 rounded-md border-2 ${selected ? 'border-slate-500' : 'border-white'}`}
        style={{
            overflow: 'auto',
            height,
            width,
            gridColumn: `${column} / span ${columnSpan}`,
            gridRow: `${row} / span ${rowSpan}`,
        }}
        ref={ref}
    />
})