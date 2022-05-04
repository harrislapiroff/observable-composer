const EDITABLE_ATTRIBUTES = [
    ['Column', 'column'],
    ['Row', 'row'],
    ['Column Span', 'colSpan'],
    ['Row Span', 'rowSpan'],
]

export default function CellInspector({ config }) {

    return <div>
        <h2 class="font-bold">{config.name}</h2>
        {EDITABLE_ATTRIBUTES.map(([label, key]) => <div>
            <label for={`cell-inspector-input-${key}`}>{label}</label>
            <input className="border rounded-sm p-1" type="number" value={config[key]} disabled />
        </div>)}
    </div>
}