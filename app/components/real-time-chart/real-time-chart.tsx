"use client"; 

import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartStreaming from 'chartjs-plugin-streaming';
import 'chartjs-plugin-streaming';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);
Chart.register(ChartStreaming);

const RealTimeChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Real-Time Data',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'realtime',
                        realtime: {
                            onRefresh: (chart) => {
                                // Consumimos el IP del servidor generado en el ESP32
                                fetch('http://192.168.0.19')
                                    .then(response => response.json())
                                    .then(data => {
                                        const currentTime = Date.now();
                                        chart.data.datasets[0].data.push({
                                            x: currentTime,
                                            y: data.analog_value
                                        });
                                        if (chart.data.datasets[0].data.length > 100) {
                                            chart.data.datasets[0].data.shift();
                                        }
                                        chart.update();
                                    })
                                    .catch(err => console.error('Error:', err));
                            },
                            delay: 2000
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, []);

    return <canvas ref={chartRef} width="800" height="400" />;
};

export default RealTimeChart;
