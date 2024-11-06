import { useState } from "react";
import {
    postSearchPatient
} from "../services/apiServices";

const AddList = () => {
    const [list, setList] = useState([
        { userid: "이메일", username: "이름" }
    ]); // 리스트를 저장할 상태
    const [inputText, setInputText] = useState(''); // 텍스트 필드의 입력 값

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAddItem = async () => {
        if (inputText.trim() !== '') {
            try {
                // postSearchPatient API 호출
                const data = await postSearchPatient(inputText);
                console.log('Check response', data)
                
                // 서버 응답이 성공적일 경우 리스트에 항목 추가
                if (data && data.success) { // 성공 여부에 따라 조건 변경 가능
                    setList([...list, {
                        userid: data.userid,
                        username: data.name
                    }]);
                    setInputText(''); // 텍스트 필드 초기화
                } else { //else if문을 통해 data.status의 메세지에 따라 변경
                    alert('환자를 찾을 수 없습니다.');
                }
            } catch (error) {
                console.error("Error searching patient:", error);
                alert("서버와 통신 중 오류가 발생했습니다.");
            }
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
            <button onClick={handleAddItem}>검색</button>

            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        {item.userid} - {item.username}
                    </li> // 리스트 항목의 userid, username 출력
                ))}
            </ul>
        </div>
    );
};

export default AddList;
