'use client'
import events from "events"
import { useState } from "react"


interface ChoicesProps {
    name: string
    placeholder: string
    onChange: (value: string) => void
}
export default function Choices({ name, placeholder, onChange}: ChoicesProps) {
    const [choice, setChoice] = useState('')
    return (
        <div className="w-full">
            <input
                name={name}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 px-4 font-bold border-gray-700 bg-white bg-opacity-5 backdrop-blur-md backdrop-filter  border-solid border rounded-md my-2 text-gray-400"
            ></input>
        </div>
    )
}