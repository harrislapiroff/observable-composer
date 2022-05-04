import ErrorBoundary from '../ErrorBoundary.js'

import Cell from './Cell.js'

export default function Dashboard({ config, children }) {
    return (
        <div
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