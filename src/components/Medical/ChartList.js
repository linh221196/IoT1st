import React from "react";
import './Chart.scss';

const ChartList = ({ data }) => {
    // 데이터에서 필요한 값 추출
    const spo2 = data.find(item => item.name === 'Spo2')?.value || null;
    const bodytemp = data.find(item => item.name === 'BodyTemp')?.value || null;
    const nibp = data.find(item => item.name === 'NIBP')?.value || null;

    return (
        <div className="chart-container" style={{padding: '10px'}}>
            <ul className="chart-ul">
                <li className="spo2-item">
                    {spo2 !== null ? `Spo2: ${spo2}` : 'Spo2 측정 값 없음'}
                </li>
                <li className="bodytemp-item">
                    {bodytemp !== null ? `Body Temperature: ${bodytemp}` : 'Body Temperature 측정 값 없음'}
                </li>
                <li className="nibp-item">
                    {nibp !== null ? (
                        <>
                            NIBP<br/>
                            수축기: {nibp.systolic} / 이완기: {nibp.diastolic}
                        </>
                    ) : (
                        'NIBP 측정 값 없음'
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ChartList;