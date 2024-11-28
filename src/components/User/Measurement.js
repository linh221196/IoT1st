import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import './Measurement.scss'; // SCSS 파일을 import
import NoteList from '../User/NoteList'
import {useSelector} from "react-redux";
import UserHeadBar from "../HeadBar/UserHeaderBar";
import {postMeasureList} from "../services/apiServices";

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
            const dayNotes = notes[dateString] || [];

            // 정상과 비정상 상태 개수 카운트
            const normalCount = dayNotes.filter(note => note.status === '정상').length;
            const abnormalCount = dayNotes.filter(note => note.status === '비정상').length;

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
                    {dayNotes.length > 0 && (
                        <div className="note-indicator">
                            {/* 비정상이 있는 경우 비정상만 표시 */}
                            {abnormalCount > 0 ? (
                                <>
                                    <Icon icon="bi:circle-fill" style={{ color: '#e74c3c', fontSize: '20px' }} />
                                    <span className="note-count">x{abnormalCount}</span>
                                </>
                            ) : (
                                // 비정상이 없고 정상만 있는 경우 정상 표시
                                normalCount > 0 && (
                                    <>
                                        <Icon icon="bi:circle-fill" style={{ color: '#2ecc71', fontSize: '20px' }} />
                                    </>
                                )
                            )}
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

const Measurement = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [measurements, setMeasurements] = useState([]);
    const [measurementsByDate, setMeasurementsByDate] = useState({});

    const userInfo = useSelector(state => state.user.account);

    const transformMeasurements = (data) => {
        const transformedData = {};

        // 측정 항목 이름 매핑
        const measurementNames = {
            airFlowResult: "공기 흐름",
            bodyTempResult: "체온",
            ecgResult: "심전도",
            emgResult: "근전도",
            eogResult: "눈전도",
            gsrResult: "피부 전도도",
            nibpResult: "혈압",
            spo2Result: "산소포화도",
        };

        const mapResults = (results, measurementKey) => {
            results.forEach((item) => {
                const date = item.date;
                const statusString = item[measurementKey];
                const statusBoolean = statusString === "정상"; // "정상" → true, 나머지 → false

                if (!transformedData[date]) {
                    transformedData[date] = [];
                }

                transformedData[date].push({
                    measurement: measurementNames[measurementKey], // 매핑된 이름 사용
                    status: statusBoolean, // boolean 값으로 변환
                });
            });
        };

        // 데이터를 처리
        if (data.airFlowResults) {
            mapResults(data.airFlowResults, "airFlowResult");
        }
        if (data.bodyTempResults) {
            mapResults(data.bodyTempResults, "bodyTempResult");
        }
        if (data.ecgResults) {
            mapResults(data.ecgResults, "ecgResult");
        }
        if (data.emgResults) {
            mapResults(data.emgResults, "emgResult");
        }
        if (data.eogResults) {
            mapResults(data.eogResults, "eogResult");
        }
        if (data.gsrResults) {
            mapResults(data.gsrResults, "gsrResult");
        }
        if (data.nibpResults) {
            mapResults(data.nibpResults, "nibpResult");
        }
        if (data.spo2Results) {
            mapResults(data.spo2Results, "spo2Result");
        }

        return transformedData;
    };


    // 백엔드에서 메모 데이터를 가져오는 함수
    const fetchNotes = async () => {
        try {
            //api 코드
            const data = await postMeasureList(userInfo.email)
            console.log('측정결과 환자 :', data)

            const transformedData = transformMeasurements(data);
            console.log('받아온 데이터 변환', transformedData);

            setMeasurementsByDate(transformedData);
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

    const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

    return (
        <>
        <div className="container">
            <div className="calendar">
                    <RenderHeader
                        currentMonth={currentMonth}
                        prevMonth={prevMonth}
                        nextMonth={nextMonth}
                    />
                    <RenderDays/>
                    <RenderCells
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                        onDateClick={onDateClick}
                        notes={measurementsByDate}
                    />
                </div>
                <div className="note-list">
                    <NoteList measurements={measurementsByDate[selectedDateString] || []} date={selectedDateString}
                              userid={userInfo.email}/>
                </div>
            </div>
        </>
    );
};

export default Measurement;
