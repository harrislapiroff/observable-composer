import { useState } from "react"

export default function SidebarSection({ title, children }) {
    const [open, setOpen] = useState(true)
    return <div>
        <h2 className="border-y border-slate-200 px-2 py-1 cursor-pointer hover:bg-slate-50" style={{ marginTop: -1 }} onClick={() => setOpen(!open)}>
            <svg
                style={{
                    display: 'inline-block',
                    transition: 'transform .1s linear',
                    transform: open ? null : 'rotate(-90deg)',
                    marginRight: '0.25em',
                    verticalAlign: 1,
                }}
                width="11"
                height="7"
                viewBox="-0.5 -0.5 11 7"
            >
                <path d="M0 0L5 5L10 0" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
            {title}
        </h2>
        {open && <div className="p-2">
            {children}
        </div>}
    </div>
}