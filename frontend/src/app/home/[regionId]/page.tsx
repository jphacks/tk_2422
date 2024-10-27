"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Mail } from "lucide-react";
import { useUser } from '@/app/context/UserContext';

interface Keeper {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function RegionPage({ params }: { params: { regionId: string } }) {
  const [keepers, setKeepers] = useState<Keeper[]>([]);
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
        })) as Keeper[];
        setKeepers(keepersData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    getRegion();
  }, [params.regionId]);

  const regionNames: { [key: string]: string } = {
    hokkaido: "北海道",
    tohoku: "東北",
    kanto: "関東",
    chubu: "中部",
    kinki: "近畿",
    chugoku: "中国",
    shikoku: "四国",
    kyushu: "九州",
    okinawa: "沖縄",
  };

  const user = useUser(); // ユーザー情報を取得
  const travelerUid = user.uid; // ユーザーのUIDを取得


  const registerKeeper = async (keeperId: string) => { // 修正: registerKeeper関数を実装

    try {
      const matchRef = collection(db, "Matches"); // Matchコレクションを参照
      await addDoc(matchRef, {
        keeper_uid: keeperId, // keeperのIDを保存
        traveler_uid: travelerUid, // travelerのUIDを保存
      });
      console.log("Keeper registered successfully!");
    } catch (error) {
      console.error("Error registering keeper:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-black to-gray-800 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          {regionNames[params.regionId] || params.regionId}のKeeper一覧
        </motion.h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3 bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-2/3 bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : keepers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {keepers.map((keeper) =>
              keeper.id === travelerUid ? null :
                (
                  <motion.div
                    key={keeper.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { // 修正: カードクリック時の処理
                      if (confirm(`${keeper.name}を登録しますか？`)) { // 確認ポップアップ
                        registerKeeper(keeper.id); // 登録用関数を呼び出し
                        window.location.href = '/home'; // /homeにリダイレクト
                      }
                    }}
                  >
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                      <CardHeader>
                        <CardTitle>
                          <CardTitle className="text-white">{keeper.name}</CardTitle>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-300">{keeper.address}</p>
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-300">{keeper.phone}</p>
                          </div>
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-300">{keeper.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl mt-12"
          >
            ごめんなさい！{regionNames[params.regionId] || params.regionId}には現在Keeperがいないみたい:(
          </motion.p>
        )}
      </main>
    </div>
  );
}