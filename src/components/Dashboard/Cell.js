import { forwardRef  } from "react"

export default forwardRef(({
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
            gridRow: `${row} / span ${rowSpan}`,
        }}
        ref={ref}
    />
})