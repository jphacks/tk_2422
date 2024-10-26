// "use client"

import { useUser } from '../context/UserContext';

export default function SubmitKeeper() {
    const uid = useUser() || { uid: null }; // useUserの戻り値を確認
    return (
        <div>
             {uid.uid !== null ? uid.uid : 'none'}
        </div>
    );
}