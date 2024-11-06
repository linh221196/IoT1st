import { useState } from "react";
import {
    postAAssignmentPatient,
    postSearchPatient, postVolunteerCallModify
} from "../services/apiServices";
import {useSelector} from "react-redux";

const AddList = () => {
    const [addList, setaddList] = useState([
        { username: "이름", userid: "이메일" }
    ]); // 리스트를 저장할 상태
    const [inputText, setInputText] = useState(''); // 텍스트 필드의 입력 값
    const userInfo = useSelector(state => state.user.account)

    //텍스트 필드 값 변경 시
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    //검색 버튼을 눌렀을 때 그 id에 맞는 환자를 받아오기
    const handleSearchItem = async () => {
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

                    // 새로운 항목들 추가
                    setaddList([...addList, ...newItems]);
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
    const handleAddItem = async (index) => {
        try {
            // API 호출
            const email = userInfo?.email;
            const userid = addList[index].userid;

            console.log('email: ', userInfo?.email, 'userid: ', userid)
            const data = await postAAssignmentPatient(email, userid);
            console.log('Check response', data);

            // 서버 응답에 따른 처리
            if (data.status === "success") {
                alert("환자가 성공적으로 추가되었습니다.");
            } else if (data.status === "duplication") {
                alert("이미 담당하는 환자입니다.");
            } else {
                alert("환자를 추가하는 데 실패했습니다.");
            }

        } catch (error) {
            console.error("Error occurred:", error);
            alert("서버와 통신에 실패했습니다.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="아이템을 입력하세요"
            />
            <button onClick={handleSearchItem}>검색</button>

            <ul>
                {addList.map((item, index) => (
                    <li key={index}>
                        {item.username} - {item.userid}
                        <button onClick={() => handleAddItem(index)}>추가</button>
                    </li> // 리스트 항목의 userid, username 출력
                ))}
            </ul>
        </div>
    );
};

export default AddList;
