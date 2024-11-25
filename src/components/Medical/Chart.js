import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart.scss';

// 필요한 스케일 및 요소를 ChartJS에 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
    // 예시 데이터: {datetime, value} 형태의 리스트
    const exampleData = [
        {'datetime': '2024-11-14T08:00:00', 'value': 10},
        {'datetime': '2024-11-14T08:00:00.500000', 'value': 11},
        {'datetime': '2024-11-14T08:00:01', 'value': 12},
        {'datetime': '2024-11-14T08:00:01.500000', 'value': 16},
        {'datetime': '2024-11-14T08:00:02', 'value': 14},
        {'datetime': '2024-11-14T08:00:02.500000', 'value': 13},
        {'datetime': '2024-11-14T08:00:03', 'value': 16},
        {'datetime': '2024-11-14T08:00:03.500000', 'value': 17},
        {'datetime': '2024-11-14T08:00:04', 'value': 18},
        {'datetime': '2024-11-14T08:00:04.500000', 'value': 15},
        {'datetime': '2024-11-14T08:00:05', 'value': 20},
        {'datetime': '2024-11-14T08:00:05.500000', 'value': 21},
        {'datetime': '2024-11-14T08:00:06', 'value': 22},
        {'datetime': '2024-11-14T08:00:06.500000', 'value': 23},
        {'datetime': '2024-11-14T08:00:07', 'value': 24},
        {'datetime': '2024-11-14T08:00:07.500000', 'value': 25},
        {'datetime': '2024-11-14T08:00:08', 'value': 26},
        {'datetime': '2024-11-14T08:00:08.500000', 'value': 27},
        {'datetime': '2024-11-14T08:00:09', 'value': 28},
        {'datetime': '2024-11-14T08:00:09.500000', 'value': 29},
        {'datetime': '2024-11-14T08:00:10', 'value': 10},
        {'datetime': '2024-11-14T08:00:10.500000', 'value': 11},
        {'datetime': '2024-11-14T08:00:11', 'value': 12},
        {'datetime': '2024-11-14T08:00:11.500000', 'value': 13},
        {'datetime': '2024-11-14T08:00:12', 'value': 14},
        {'datetime': '2024-11-14T08:00:12.500000', 'value': 15},
        {'datetime': '2024-11-14T08:00:13', 'value': 16},
        {'datetime': '2024-11-14T08:00:13.500000', 'value': 17},
        {'datetime': '2024-11-14T08:00:14', 'value': 18},
        {'datetime': '2024-11-14T08:00:14.500000', 'value': 19},
        {'datetime': '2024-11-14T08:00:15', 'value': 20},
        {'datetime': '2024-11-14T08:00:15.500000', 'value': 21},
        {'datetime': '2024-11-14T08:00:16', 'value': 22},
        {'datetime': '2024-11-14T08:00:16.500000', 'value': 23},
        {'datetime': '2024-11-14T08:00:17', 'value': 24},
        {'datetime': '2024-11-14T08:00:17.500000', 'value': 25},
        {'datetime': '2024-11-14T08:00:18', 'value': 26},
        {'datetime': '2024-11-14T08:00:18.500000', 'value': 27},
        {'datetime': '2024-11-14T08:00:19', 'value': 28},
        {'datetime': '2024-11-14T08:00:19.500000', 'value': 29},
        {'datetime': '2024-11-14T08:00:20', 'value': 10},
        {'datetime': '2024-11-14T08:00:20.500000', 'value': 11},
        {'datetime': '2024-11-14T08:00:21', 'value': 12},
        {'datetime': '2024-11-14T08:00:21.500000', 'value': 13},
        {'datetime': '2024-11-14T08:00:22', 'value': 14},
        {'datetime': '2024-11-14T08:00:22.500000', 'value': 15},
        {'datetime': '2024-11-14T08:00:23', 'value': 16},
        {'datetime': '2024-11-14T08:00:23.500000', 'value': 17},
        {'datetime': '2024-11-14T08:00:24', 'value': 18},
        {'datetime': '2024-11-14T08:00:24.500000', 'value': 19},
        {'datetime': '2024-11-14T08:00:25', 'value': 20},
        {'datetime': '2024-11-14T08:00:25.500000', 'value': 21},
        {'datetime': '2024-11-14T08:00:26', 'value': 22},
        {'datetime': '2024-11-14T08:00:26.500000', 'value': 23},
        {'datetime': '2024-11-14T08:00:27', 'value': 24},
        {'datetime': '2024-11-14T08:00:27.500000', 'value': 25},
        {'datetime': '2024-11-14T08:00:28', 'value': 26},
        {'datetime': '2024-11-14T08:00:28.500000', 'value': 27},
        {'datetime': '2024-11-14T08:00:29', 'value': 28},
        {'datetime': '2024-11-14T08:00:29.500000', 'value': 29}
    ];

    // 초 단위 라벨 생성
    const labels = exampleData.map((_, index) => index / 2); // 0.5초 간격, index를 초 단위로 변환
    const dataValues = exampleData.map(item => item.value); // value 값을 Y축 데이터로 사용

    const data = {
        labels: labels, // X축 라벨
        datasets: [
            {
                label: '측정 데이터', // 그래프 라벨
                data: dataValues, // Y축 값
                fill: false,
                borderColor: 'blue',
                backgroundColor: 'blue',
                pointRadius: 0, // 포인트 제거
                pointHoverRadius: 0, // 호버 포인트도 제거
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'category', // X축 타입 설정
                title: {
                    display: true,
                    text: '시간 (초)', // X축 제목
                },
            },
            y: {
                title: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>시간별 측정 데이터</h2>
            <div className="chart-wrapper">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Chart;
