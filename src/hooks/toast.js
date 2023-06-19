// 고유한 키값을 가져오기 위해서 uuid 추가
import { v4 as uuidv4 } from 'uuid';
// 기존에 addToast가 있어서 add로 대체
import { addToast as add, removeToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

const useToast = () => {
    const dispatch = useDispatch();

    // 토스트 아이디가 다를 경우 남겨두고 같으면 삭제한다.
    const deleteToast = (id) => {
        dispatch(removeToast(id))
    };

    const addToast = (toast) => {
        const id = uuidv4()
        const toastWithId = {
            ...toast,
            id
        }

        dispatch(add(toastWithId));

        // 5초 뒤에 자동 삭제
        setTimeout(() => {
            deleteToast(id);
        }, 5000);
    };

    return {
        addToast,
        deleteToast
    };
};

export default useToast;