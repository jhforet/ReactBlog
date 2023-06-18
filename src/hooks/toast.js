import { useState, useRef } from "react";
// 고유한 키값을 가져오기 위해서 uuid 추가
import { v4 as uuidv4 } from 'uuid';

const useToast = () => {
    const [, setToastRerender] = useState(false);
    const toasts = useRef([]);

    // 토스트 아이디가 다를 경우 남겨두고 같으면 삭제한다.
    const deleteToast = (id) => {
        const filteredToasts = toasts.current.filter(toast => {
            return toast.id !== id;
        });

        toasts.current = filteredToasts;
        setToastRerender(prev => !prev);
    };

    const addToast = (toast) => {
        const id = uuidv4()
        const toastWithId = {
            ...toast,
            id
        }

        toasts.current = [
            ...toasts.current,
            toastWithId
        ];
        setToastRerender(prev => !prev);

        // 5초 뒤에 자동 삭제
        setTimeout(() => {
            deleteToast(id, toasts, setToastRerender);
        }, 5000);
    };

    return [
        toasts.current,
        addToast,
        deleteToast
    ];
};

export default useToast;