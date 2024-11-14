import React from 'react';
import styles from './NoteList.scss';

// NoteList 컴포넌트
const NoteList = ({ measurements, date, userid }) => {
    // 비정상이 먼저 표시되도록 measurements 정렬
    const sortedMeasurements = measurements.slice().sort((a, b) => {
        if (a.status === '비정상' && b.status === '정상') return -1;
        if (a.status === '정상' && b.status === '비정상') return 1;
        return 0;
    });

    return (
        <div className={styles['note-list']}>
            <h3>{date ? `${date} 측정 상태` : '날짜를 선택하세요'} (ID: {userid})</h3>
            {sortedMeasurements.length > 0 ? (
                sortedMeasurements.map((item, index) => (
                    <NoteItem
                        key={index}
                        measurement={item.measurement}
                        status={item.status}
                    />
                ))
            ) : (
                <p>데이터가 없습니다</p>
            )}
        </div>
    );
};

// NoteItem 컴포넌트
const NoteItem = ({ measurement, status }) => {
    return (
        <div className={styles['note-item']}>
            <p className={styles['note-measurement']}>{measurement}</p>
            <p className={styles['note-status']}>{status === '정상' ? '🟢 정상' : '🔴 비정상'}</p>
        </div>
    );
};

export default NoteList;