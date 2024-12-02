import AirFlow from "./AirFlow.png"
import BodyTemp from './BodyTemp.png'
import ECG from './ECG.png'
import EMG from './EMG.png'
import EOG from './EOG.png'
import Gluco from './Gluco.png'
import GSR from './GSR.png'
import NIBP from './NIBP.png'
import SPO2 from './SPO2.png'

import airflowimoticon from './airflowimoticon.png'
import bodytempimoticon from './bodytemp-imoticon.png'
import ecgimoticon from './ecg-imoticon.png'
import emgimoticon from './emg-imoticon.png'
import eogimoticon from './eog-imoticon.png'
import glocometerimoticon from './glocometer-imoticon.png'
import gsrimoticon from './gsr-imoticon.png'
import nibpimoticon from './NIBP-imoticon.png'
import spo2imoticon from './spo2-imoticon.png'



const Devices =
    [{
        id: 1,
        name: "Air FLow 호흡센서",
        img: AirFlow,
        des: "Air FLow 호흡센서",
        imoticon: airflowimoticon,
        link: "https://youtube.com/watch?v=OV4k2_rI1kY"
    },
    {
        id: 2,
        name: "Body Temp 체온센서",
        img: BodyTemp,
        des: "Body Temp 체온센서",
        imoticon: bodytempimoticon,
        link: "https://youtube.com/shorts/rARYU-K6Pvg?feature=share"
    },
    {
        id: 3,
        name: "NIBP 혈압 측정계",
        img: NIBP,
        des: "혈압 측정계",
        imoticon: nibpimoticon,
        link: "https://youtu.be/OZ8qV-8iLY4"
    },
    // {
    //     id: 4,
    //     name: "GULOMETER 혈당 측정계",
    //     img: Gluco,
    //     des: "혈당 측정계"
    // },
    {
        id: 5,
        name: "SPO2 산소 포화도",
        img: SPO2,
        des: "산소 포화도",
        imoticon: spo2imoticon,
        link: "https://youtu.be/6C6QVqHql3E"
    },
    {
        id: 6,
        name: "EOG 안구전도",
        img: EOG,
        des: "안구전도",
        imoticon: eogimoticon,
        link: "https://youtube.com/shorts/OTFLTgPVpjE"
    },
    {
        id: 7,
        name: "ECG 심전도",
        img: ECG,
        des: "심전도",
        imoticon: ecgimoticon,
        link: "https://youtube.com/shorts/02mXnly17CU"
    },
    {
        id: 8,
        name: "EMG 근전도",
        img: EMG,
        des: "근전도",
        imoticon: emgimoticon,
        link: "https://youtube.com/shorts/ZzRvqzrSlK0?feature=share"
    },
    {
        id: 9,
        name: "GSR Galvanic Skin Response",
        img: GSR,
        des: "GSR Galvanic Skin Response",
        imoticon: gsrimoticon,
        link: "https://youtu.be/7AhsPkVztqI"
    },
    ]
export default Devices