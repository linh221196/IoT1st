import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// 필요한 스케일 및 요소를 ChartJS에 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Test = () => {
    // 예시 데이터: {datetime, value} 형태의 리스트
    const exampleData = [
        { datetime: '2024-11-14T08:00:00', value: 20 },
        { datetime: '2024-11-14T09:00:00', value: 30 },
        { datetime: '2024-11-14T10:00:00', value: 10 },
        { datetime: '2024-11-14T11:00:00', value: 35 },
        { datetime: '2024-11-14T12:00:00', value: 40 },
        { datetime: '2024-11-14T13:00:00', value: 38 },
        { datetime: '2024-11-14T14:00:00', value: 36 },
        { datetime: '2024-11-14T15:00:00', value: 40 },
        { datetime: '2024-11-14T16:00:00', value: 32 },
        { datetime: '2024-11-14T17:00:00', value: 30 },
    ];

    // 그래프 데이터 변환
    const labels = exampleData.map(item => item.datetime); // datetime 값을 X축 라벨로 사용
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
                    text: '시간', // X축 제목
                },
            },
            y: {
                title: {
                    display: true,
                    text: '값', // Y축 제목
                },
            },
        },
    };

    return (
        <div>
            <h2>시간별 측정 데이터</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Test;
