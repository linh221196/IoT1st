
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import "./Calendar.scss"

dayjs.locale('ko');

const Calendar = () => {

    const [newValue, setValue] = useState(dayjs())

    return (

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
        >
            <div className="container">
                <Row className='g-4'>
                    <Col className='calendar-container border'>
                        <StaticDatePicker
                            orientation='portrait'
                            openTo='day'
                            value={newValue}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(params) => <input {...params} />}
                            locale={ko}
                            views={['year', 'month', 'day']}
                            format="MM월 DD일"
                            localeText={{
                                toolbarTitle: '날짜 선택',
                                cancelButtonLabel: '취소',
                                clearButtonLabel: '초기화',
                                todayButtonLabel: '오늘',
                                okButtonLabel: '확인',
                            }}
                            slotProps={{
                                calendarHeader: {
                                    labelFormat: (month) => `${month.month() + 1}월 ${month.date()}일`,
                                },
                                actionBar: {
                                    actions: ['clear', 'today', 'cancel', 'accept'],
                                },

                            }}
                            disablePast

                        />
                    </Col>
                    <Col className='note-container border'>Note</Col>
                </Row>

            </div>

        </LocalizationProvider>
    )


}
export default Calendar