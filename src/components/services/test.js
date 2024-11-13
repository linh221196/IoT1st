import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import './test.scss'; // SCSS 파일을 import

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, notes }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const dateString = format(day, 'yyyy-MM-dd'); // 날짜를 문자열로 변환하여 저장

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                                ? 'selected'
                                : format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'not-valid'
                                    : 'valid'
                    }`}
                    key={day.toString()}
                    onClick={() => onDateClick(new Date(cloneDay))}
                >
                    <span
                        className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}
                    >
                        {formattedDate}
                    </span>
                    {/* 메모가 있는 날짜에 표시 */}
                    {notes[dateString] && (
                        <div className="note-indicator">
                            {/* 빨간 원 */}
                            <Icon icon="bi:circle-fill" style={{ color: '#e74c3c', fontSize: '20px' }} />
                            <span className="note-count">x5</span> {/* 곱하기 숫자 */}
                            {/* 주황 원 */}
                            {/* <Icon icon="bi:circle-fill" style={{ color: '#f39c12', fontSize: '20px' }} /> */}
                            {/* 초록 원 */}
                             <Icon icon="bi:circle-fill" style={{ color: '#2ecc71', fontSize: '20px' }} />
                            <span className="note-count">x3</span> {/* 곱하기 숫자 */}
                        </div>
                    )}
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day.toString()}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className="body">{rows}</div>;
};

const Test = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [notes, setNotes] = useState({
        '2024-11-12': '메모 내용'
    }); // 날짜별 메모 상태 관리

    // 백엔드에서 메모 데이터를 가져오는 함수
    const fetchNotes = async (month) => {
        try {
           //api 코드
            const data = [
                { date: '2024-12-16', content: '메모 내용' },
                { date: '2024-11-14', content: '다른 메모 내용' }
            ];

            const notesByDate = {};
            data.forEach(note => {
                notesByDate[note.date] = note.content; // 예: { '2024-11-13': '메모 내용' }
            });
            setNotes(notesByDate);
        } catch (error) {
            console.error("메모 데이터를 가져오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchNotes(currentMonth); // 월이 변경될 때마다 메모를 가져옵니다.
    }, [currentMonth]);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
                notes={notes}
            />
        </div>
    );
};

export default Test;
