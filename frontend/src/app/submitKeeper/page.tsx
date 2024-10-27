"use client"

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase/firebase'

const SubmitKeeper: React.FC = () => {
    const { uid } = useUser();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [region, setRegion] = useState('');
    const [address, setAddress] = useState('');

    console.log("uid", uid);
    // const docSnap = await getDoc(doc(db, "Users", uid));
    // const name = docSnap.data()?.name
    const fetchUserName = async (uid: string) => { // ユーザーデータを取得する新しい関数を作成
        if (!uid) {
            return null;
        }
        const docSnap = await getDoc(doc(db, "Users", uid));
        return docSnap.data()?.name; // ここでオプショナルチェイニングを使用
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userName = await fetchUserName(uid);
        if (userName) { // userNameが存在する場合のみaddDocを実行
            await addDoc(collection(db, "Keepers"), {
                start_date: startDate,
                end_date: endDate,
                region: region,
                address: address,
                uid: uid,
                name: userName,
            });
            console.log("キーパー登録完了：");
            console.log({ startDate, endDate, region, address });
        } else {
            console.error("ユーザー名が取得できませんでした。");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Submit Information</h1>
            <p>User ID: {uid !== null ? uid : 'No user logged in'}</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label className="block mb-2">開始日時:</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">終了日時:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">地域:</label>
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">住所:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded p-2">
                    提出
                </button>
            </form>
        </div>
    );
};

export default SubmitKeeper;