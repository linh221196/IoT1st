import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart.scss';

// 필요한 스케일 및 요소를 ChartJS에 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data = { name: '', values: [] } }) => {
    const { name, values: list } = data; // props에서 name과 list를 추출

    // X축 라벨 생성: 0부터 리스트 길이까지의 숫자
    const labels = list ? list.map((_, index) => index) : []; // 리스트가 없으면 빈 배열 반환

    // Y축 데이터는 전달받은 list 그대로 사용
    const dataValues = list || []; // 리스트가 없으면 빈 배열 반환

    // Chart.js 데이터 구성
    const chartData = {
        labels: labels, // X축 라벨
        datasets: [
            {
                label: name, // 그래프 라벨
                data: dataValues, // Y축 값
                fill: false,
                borderColor: 'red',
                backgroundColor: 'red',
                pointRadius: 0, // 포인트 제거
                pointHoverRadius: 0, // 호버 포인트도 제거
            },
        ],
    };

    // Chart.js 옵션 구성
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: '시간', // X축 제목
                },
            },
            y: {
                title: {
                    display: false,
                    text: '측정값', // Y축 제목
                },
            },
        },
    };

    if (!list || list.length === 0) {
        return (
            <div className="chart-container">
                <li>{name}</li>
                <Line data={chartData} options={options}/>
            </div>
        );
    }

    return (
        <div className="chart-container">
            <li>{name}</li>
            <Line data={chartData} options={options}/>
        </div>
    );
};

export default Chart;
