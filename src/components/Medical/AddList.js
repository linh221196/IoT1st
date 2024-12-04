import { useState } from "react";
import {
    postAssignmentPatient,
    postSearchPatient, postVolunteerCallModify
} from "../../services/apiServices";
import {useSelector} from "react-redux";


const AddList = ({ PatientCall }) => {
    const [addList, setaddList] = useState([ //환자 검색 api 데이터 저장할 list
        /*{ username: "", userid: "" },*/
        /*{ username: "이름3", userid: "이메일" },
        { username: "이름4", userid: "이메일" },
        { username: "이름5", userid: "이메일" },*/
    ]); // 리스트를 저장할 상태
    const [inputText, setInputText] = useState(''); // 텍스트 필드의 입력 값
    const userInfo = useSelector(state => state.user.account)

    //텍스트 필드 값 변경 시
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    //검색 버튼을 눌렀을 때 그 id에 맞는 환자를 받아오기
    const searchPatient = async () => {
        if (inputText.trim() !== '') {
            try {
                const data = await postSearchPatient(inputText);
                console.log('Check response', data);
                let newItems = [];

                // 서버 응답이 성공적일 경우 리스트에 항목 추가
                if (data.status === "success" || (data.data && data.data.status === "success")) {
                    if (data.name && data.userid) { // 이메일로 검색한 단일 객체 결과
                        newItems = [{
                            username: data.name,
                            userid: data.userid
                        }];
                    } else if (data.data && Array.isArray(data.data)) { // 이름으로 검색한 결과가 배열일 경우
                        newItems = data.data.map((item) => ({
                            username: item.name,
                            userid: item.userid
                        }));
                    }

                    // 기존 리스트 초기화 후 새로운 항목들 추가
                    setaddList(newItems);
                    setInputText('');
                } else if (data.status === "DataEmpty" || (data.data && data.data.status === "DataEmpty")) {
                    alert('해당 환자를 찾을 수 없습니다.');
                } else {
                    alert('환자를 찾을 수 없습니다.');
                }
            } catch (error) {
                console.error("Error searching patient:", error);
                alert("서버와 통신 중 오류가 발생했습니다.");
            }
        }
    };
    //list에서 환자를 추가 할때
    const handleAddPatient = async (index) => {
        try {
            // API 호출
            const email = userInfo?.email;
            const userid = addList[index].userid;

            console.log('email: ', userInfo?.email, 'userid: ', userid)
            const data = await postAssignmentPatient(email, userid);
            console.log('Check response', data);

            // 서버 응답에 따른 처리
            if (data.status === "success") {
                alert("환자가 성공적으로 추가되었습니다.");
                PatientCall();
            } else if (data.status === "duplication") {
                alert("이미 담당하는 환자입니다.");
            } else {
                alert("환자를 추가하는 데 실패했습니다.");
            }

        } catch (error) {
            console.error("Error occurred:", error);
            alert("서버에서 환자 검색에 실패했습니다.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchPatient(); // Enter 키를 누르면 handleSearchItem 호출
                        }
                    }}
                    placeholder="환자 입력하세요"
                    style={styles.input}
                />
                <button onClick={searchPatient} style={styles.searchButton}>
                    검색
                </button>
            </div>

            {/* Divider Line */}
            <div style={styles.divider}></div>

            {/* List with Scroll */}
            <ul style={styles.list}>
                {addList.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                        <span style={styles.listText}>
                            {item.username} - {item.userid}
                        </span>
                        <button onClick={() => handleAddPatient(index)} style={styles.addButton}>
                            추가
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '500px',
        height: '500px', // 전체 높이를 제한
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    searchContainer: {
        display: 'flex',
        marginBottom: '20px',
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    divider: {
        height: '1px',
        backgroundColor: '#ccc',
        margin: '20px 0',
        width: '100%',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        overflowY: 'auto', // 스크롤 가능
        flex: 1, // 리스트가 남은 공간을 모두 차지
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    listText: {
        fontSize: '16px',
    },
    addButton: {
        padding: '8px 12px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
    },
};


export default AddList;
