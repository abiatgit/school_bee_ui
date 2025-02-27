"use client"
import { useEffect } from "react";

export default function Messages() {
    useEffect(() => {
        console.log("hello")
    }, [])
    return <div>hello</div>
}