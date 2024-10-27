"use client";

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const KeeperList = () => {
    const [keepers, setKeepers] = useState([]);

    useEffect(() => {
        const fetchKeepers = async () => {
            const docSnap = await getDoc(doc(db, "Keepers"));
            console.log("keepers", docSnap);
            // setKeepers(keeperData);
        };

        fetchKeepers();
    }, []);

    return (
        <div>
            <h1>Keepers List</h1>
            <ul>
                {keepers.map(keeper => (
                    <li key={keeper.id}>{keeper.name}</li> // ここでkeeperの名前を表示
                ))}
            </ul>
        </div>
    );
};

// ... 既存のコード ...