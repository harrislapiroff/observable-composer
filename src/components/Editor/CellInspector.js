import SidebarSection from "../SidebarSection"

const EDITABLE_ATTRIBUTES = [
    ['Column', 'column'],
    ['Row', 'row'],
    ['Column Span', 'columnSpan'],
    ['Row Span', 'rowSpan'],
]

export default function CellInspector({ config, onConfigChange }) {
    return <SidebarSection title={`Cell: ${config.name}`}>
        {EDITABLE_ATTRIBUTES.map(([label, key]) => <div key={key}>
            <label htmlFor={`cell-inspector-input-${key}`}>{label}</label>
            <input
                id={`cell-inspector-input-${key}`} 
                className="border rounded-sm p-1"
                type="number"
                value={config[key]}
                onChange={e => onConfigChange(key, +e.target.value)}
            />
        </div>)}
    </SidebarSection>
}