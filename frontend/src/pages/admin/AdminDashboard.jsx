import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
    const revenueChartRef = useRef(null);
    const topBooksChartRef = useRef(null);
    const topFavoritesChartRef = useRef(null);

    useEffect(() => {
        let revenueChartInstance = null;
        let topBooksChartInstance = null;
        let topFavoritesChartInstance = null;

        // Mock data
        const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
        const dataPoints = [1500000, 2300000, 1800000, 3200000, 2900000, 4500000];

        if (revenueChartRef.current) {
            revenueChartInstance = new Chart(revenueChartRef.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Doanh Thu (VNĐ)',
                        data: dataPoints,
                        backgroundColor: 'rgba(255, 209, 102, 0.5)',
                        borderColor: '#ef476f',
                        borderWidth: 4,
                        tension: 0.3,
                        pointBackgroundColor: '#06d6a0',
                        pointBorderColor: '#000',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    family: 'Comic Sans MS, cursive',
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#000'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#000',
                                lineWidth: 2,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                font: { weight: 'bold' },
                                color: '#000',
                                callback: function(value) {
                                    return value.toLocaleString('vi-VN') + 'đ';
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: '#000',
                                lineWidth: 2
                            },
                            ticks: {
                                font: { weight: 'bold' },
                                color: '#000'
                            }
                        }
                    }
                }
            });
        }

        const topLabels = ['Naruto', 'One Piece', 'Bleach', 'Dragon Ball', 'Attack on Titan'];
        const topData = [150, 120, 90, 80, 60];

        if (topBooksChartRef.current) {
            topBooksChartInstance = new Chart(topBooksChartRef.current, {
                type: 'bar',
                data: {
                    labels: topLabels,
                    datasets: [{
                        label: 'Số lượng bán ra',
                        data: topData,
                        backgroundColor: [
                            '#ef476f',
                            '#ffd166',
                            '#06d6a0',
                            '#118ab2',
                            '#073b4c'
                        ],
                        borderColor: '#000',
                        borderWidth: 3
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: '#000',
                                lineWidth: 2,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                font: { weight: 'bold' },
                                color: '#000',
                                stepSize: 1
                            }
                        },
                        y: {
                            grid: { display: false },
                            ticks: {
                                font: { weight: 'bold', size: 14, family: 'Nunito, sans-serif' },
                                color: '#000'
                            }
                        }
                    }
                }
            });
        }

        const favLabels = ['One Piece', 'Naruto', 'Dragon Ball', 'Hunter x Hunter', 'Death Note'];
        const favData = [500, 450, 400, 350, 300];

        if (topFavoritesChartRef.current) {
            topFavoritesChartInstance = new Chart(topFavoritesChartRef.current, {
                type: 'bar',
                data: {
                    labels: favLabels,
                    datasets: [{
                        label: 'Lượt Yêu Thích',
                        data: favData,
                        backgroundColor: '#ef476f',
                        borderColor: '#000',
                        borderWidth: 3,
                        hoverBackgroundColor: '#ffd166'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            grid: { display: false },
                            ticks: {
                                font: { weight: 'bold', size: 14 },
                                color: '#000'
                            }
                        },
                        x: {
                            grid: { color: '#000', lineWidth: 2, borderDash: [5, 5] },
                            ticks: {
                                font: { weight: 'bold' },
                                color: '#000',
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (revenueChartInstance) revenueChartInstance.destroy();
            if (topBooksChartInstance) topBooksChartInstance.destroy();
            if (topFavoritesChartInstance) topFavoritesChartInstance.destroy();
        };
    }, []);

    return (
        <div className="p-8">
            <div data-aos="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                <div>
                    <h1 className="text-5xl font-comic text-dark tracking-widest uppercase transform -rotate-1"
                        style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>
                        THỐNG KÊ DOANH THU
                    </h1>
                    <p className="font-black text-gray-500 mt-2 uppercase">Báo cáo siêu cấp vip pro</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/admin/products"
                        className="flex items-center gap-2 bg-primary hover:bg-white text-white hover:text-primary px-6 py-3 border-4 border-black rounded shadow-comic hover:shadow-comic-lg transition font-black uppercase transform -rotate-1">
                        KHO TRUYỆN TRANH
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
                <div data-aos="fade-up" className="bg-white border-4 border-black shadow-comic-lg p-6">
                    <h2 className="text-3xl font-comic text-dark uppercase mb-4 text-center" style={{ WebkitTextStroke: '1px black' }}>
                        THỐNG KÊ DOANH THU NĂM NAY
                    </h2>
                    <div className="w-full h-96">
                        <canvas ref={revenueChartRef}></canvas>
                    </div>
                </div>
                
                <div data-aos="fade-up" data-aos-delay="200" className="bg-white border-4 border-black shadow-comic-lg p-6">
                    <h2 className="text-3xl font-comic text-primary uppercase mb-4 text-center transform -rotate-1" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #FFD166' }}>
                        TOP 5 TRUYỆN BÁN CHẠY NHẤT
                    </h2>
                    <div className="w-full h-[400px]">
                        <canvas ref={topBooksChartRef}></canvas>
                    </div>
                </div>
                
                <div data-aos="fade-up" data-aos-delay="300" className="bg-white border-4 border-black shadow-comic-lg p-6">
                    <h2 className="text-3xl font-comic text-[#06D6A0] uppercase mb-4 text-center transform rotate-1" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}>
                        TOP 5 TRUYỆN ĐƯỢC YÊU THÍCH NHẤT ❤️
                    </h2>
                    <div className="w-full h-[400px]">
                        <canvas ref={topFavoritesChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
