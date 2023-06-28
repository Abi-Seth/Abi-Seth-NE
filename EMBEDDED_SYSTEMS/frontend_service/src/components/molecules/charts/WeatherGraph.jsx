/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

const WeatherGraph = ({ temperatureData, humidityData }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        // Destroy the previous chart instance when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [temperatureData, humidityData])

    const chartData = {
        labels: temperatureData.map((record) => record.createdAt),
        datasets: [
            {
                label: 'Temperature',
                data: temperatureData.map((record) => record.temperature),
                fill: false,
                borderColor: 'red',
                backgroundColor: 'red',
                yAxisID: 'temperature-axis',
            },
            {
                label: 'Humidity',
                data: humidityData.map((record) => record.humidity),
                fill: false,
                borderColor: '#6366F1',
                backgroundColor: '#6366F1',
                yAxisID: 'humidity-axis',
            },
        ],
    }

    const chartOptions = {
        responsive: true, // Enable responsive resizing
        maintainAspectRatio: true, // Disable the default aspect ratio
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'DD/MM',
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5, // Adjust the maximum number of ticks to display on the x-axis
                },
            },
            y: {
                beginAtZero: true,
                position: 'left',
                grid: {
                    drawBorder: false,
                    // borderWidth: 4, // Increase the thickness of the grid lines
                },
                title: {
                    display: true,
                    text: 'Temperature',
                },
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                grid: {
                    drawBorder: false,
                    // borderWidth: 4, // Increase the thickness of the grid lines
                },
                title: {
                    display: true,
                    text: 'Humidity',
                },
            },
        },
        elements: {
            line: {
                tension: 0.4, // Adjust the tension to make the lines smoother
            },
        },
    }

    return <Line ref={chartRef} data={chartData} options={chartOptions} />
}

export default WeatherGraph
