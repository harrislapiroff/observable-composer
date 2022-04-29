import Dashboard from "../Dashboard"

export default function Editor({ config }) {
    return (
        <div style={{ display: 'flex' }}>
            <div></div>
            <Dashboard config={config} />
            <div></div>
        </div>
    )
}