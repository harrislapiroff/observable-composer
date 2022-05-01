import ErrorBoundary from '../ErrorBoundary.js'

import Cell from './Cell.js'

export default function Dashboard({ config, children }) {
    return (
        <div
            className="bg-white p-3"
            style={{
                display: 'grid',
                columnGap: config.grid.columnGap,
                rowGap: config.grid.rowGap,
            }}
        >
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </div>
    )
}