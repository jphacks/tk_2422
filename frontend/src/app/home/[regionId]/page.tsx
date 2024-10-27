"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function RegionPage({ params }: { params: { regionId: string } }) {
  const [keepers, setKeepers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRegion = async () => {
      try {
        const keepersRef = collection(db, "Keepers");
        const q = query(keepersRef, where("region", "==", params.regionId));
        const querySnapshot = await getDocs(q);

        const keepersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKeepers(keepersData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    getRegion();
  }, [params.regionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{params.regionId}のページ</h1>
      {keepers.length > 0 ? (
        <ul>
          {keepers.map((keeper) => (
            <li key={keeper.id}>
              <p>ID: {keeper.id}</p>
              <p>Data: {JSON.stringify(keeper)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available for region {params.regionId}.</p>
      )}
    </div>
  );
}
