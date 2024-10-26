"use client"

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const SubmitKeeper: React.FC = () => {
    const { uid } = useUser();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [region, setRegion] = useState('');
    const [address, setAddress] = useState('');

    console.log("uid", uid);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ここでフォームのデータを処理するロジックを追加
        console.log({ startDate, endDate, region, address });
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