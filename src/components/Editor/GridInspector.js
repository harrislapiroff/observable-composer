import SidebarSection from "../SidebarSection";

const EDITABLE_ATTRIBUTES = [
    ['Columns', 'columns'],
    ['Rows', 'rows'],
    ['Column Gutter', 'columnGap'],
    ['Row Gutter', 'rowGap'],
]

export default function GridInspector({ config, onConfigChange }) {
    return <SidebarSection title="Grid">
       {EDITABLE_ATTRIBUTES.map(([label, key]) => <div key={key}>
            <label htmlFor={`grid-inspector-input-${key}`}>{label}</label>
            <input
                id={`grid-inspector-input-${key}`}
                className="border rounded-sm p-1"
                type="number"
                value={config[key] || null}
                onChange={e => onConfigChange(key, +e.target.value)}
            />
        </div>)}
    </SidebarSection>
}