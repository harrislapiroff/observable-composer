import Dashboard from "../Dashboard"

export default function Editor({ config }) {
    return (
        <div className="flex h-screen">
            <div className="bg-slate-50 border-r border-slate-300 p-5 w-64 shrink-0">
                <h2 className="font-semibold">{config.notebook}</h2>
            </div>
            <div className="p-5">
                <Dashboard config={config} />
            </div>
            <div className="bg-slate-50 border-slate-300 p-5 border-l w-64 shrink-0">
                <h2 className="font-semibold">Grid</h2>
                Columns: {config.grid.columns || 'auto'}<br />
                Rows: {config.grid.rows || 'auto'}<br />
                Column gap: {config.grid.columnGap}<br />
                Row gap: {config.grid.rowGap}<br />
            </div>
        </div>
    )
}