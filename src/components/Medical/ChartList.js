import React from "react";
import './Chart.scss';

const ChartList = ({ spo2, bodytemp, nibp }) => {
    return (
        <div className="chart-container" style={{ padding: '15px' }}>
            <ul className="chart-ul">
                <li>{spo2 !== null ? `Spo2 측정 값: ${spo2}` : 'Spo2 측정 값 없음'}</li>
                <li>{bodytemp !== null ? `Body Temperature: ${bodytemp}` : 'Body Temperature 측정 값 없음'}</li>
                <li>{nibp !== null ? `NIBP: ${nibp}` : 'NIBP 측정 값 없음'}</li>
            </ul>
        </div>
    );
}

export default ChartList;