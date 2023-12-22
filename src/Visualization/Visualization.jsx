import React, { useState } from 'react'
import * as d3 from "d3"

export default function Visualization() {
    const [text, setText] = useState("")
    const [sentiment, setSentiment] = useState(null)

    const anaylzeSentiment = async () => {
        try {
            const resp = await fetch("http://localhost:3002/analyze-sentiment", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text})
            })
            if (!resp.ok) {
                throw new Error(`HTTP error! Status:${resp.status} `)
            }
            const data = await resp.json()
            setSentiment(data.sentiment)
            updateVisualization(data.sentiment)
        } catch (error) {
            console.error('Error analyzing sentiment:', error)
        }
    }

    const updateVisualization = (sentimentScore) => {
        const svg = d3.select("#chart")
        const bar = svg.selectAll("rect").data([sentimentScore])

        bar.enter().append("rect")
        .attr("width, d => d * 10")
        .attr("height, 30")
        .attr("fill", d => (d > 0 ? "blue" : d < 0 ? "red" : "gray"))

        bar.transition()
        .duration(500)
        .attr("width", d => d * 10)
    }
  return (
    <div>Visualization
        <textarea value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={anaylzeSentiment}>Analyze Sentiment</button>
        <div id="chart"></div>
    </div>
  )
}
