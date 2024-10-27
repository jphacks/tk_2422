"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner"; // Add a spinner component if you have one

const regions = ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州", "沖縄"] as const;
const regionMap: Record<string, string> = {
  北海道: "hokkaido",
  東北: "tohoku",
  関東: "kanto",
  中部: "chubu",
  近畿: "kinki",
  中国: "chugoku",
  四国: "shikoku",
  九州: "kyushu",
  沖縄: "okinawa",
};

const SubmitKeeper: React.FC = () => {
  const router = useRouter();
  const { uid } = useUser();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserName = async (uid: string) => {
    if (!uid) return null;
    const docSnap = await getDoc(doc(db, "Users", uid));
    return docSnap.data()?.name;
  };

  const clearForm = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setRegion("");
    setAddress("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("日付を選択してください");
      return;
    }

    setLoading(true);

    try {
      const userName = await fetchUserName(uid);
      if (userName) {
        const regionRomaji = regionMap[region] || region;
        await addDoc(collection(db, "Keepers"), {
          start_date: startDate,
          end_date: endDate,
          region: regionRomaji,
          address: address,
          uid: uid,
          name: userName,
        });
        console.log("キーパー登録完了");
        clearForm();
        router.push("/home");
      } else {
        setError("ユーザー情報の取得に失敗しました。");
      }
    } catch (error) {
      setError("登録中にエラーが発生しました。");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Keeper登録</h1>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "pointer-events-none opacity-50" : ""}`}>
          <div className="space-y-4">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 px-4">開始時間</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full h-14 rounded-full bg-white/10 hover:bg-white/20 hover:text-white text-white justify-start text-left font-normal border-0", !startDate && "text-gray-400")}
                    disabled={loading}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-gray-100" />
                    {startDate ? format(startDate, "PPP", { locale: ja }) : <span>開始時間を選択</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 px-4">終了時間</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full h-14 rounded-full bg-white/10 hover:bg-white/20 hover:text-white text-white justify-start text-left font-normal border-0", !endDate && "text-gray-400")}
                    disabled={loading}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-gray-100" />
                    {endDate ? format(endDate, "PPP", { locale: ja }) : <span>終了日を選択</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Region Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 px-4">地域</label>
              <Select value={region} onValueChange={setRegion} disabled={loading}>
                <SelectTrigger className="pl-4 w-full h-14 rounded-full bg-white/10 hover:bg-white/20 text-gray-100 border-0">
                  <SelectValue placeholder="地域を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 px-4">住所</label>
              <Input
                type="text"
                placeholder="住所を入力してください"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-14 rounded-full bg-white/10 text-white placeholder-gray-400 px-6"
                required
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm px-4">{error}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all transform hover:scale-105" disabled={loading}>
            {loading ? <Spinner /> : "登録"}
          </Button>

          <p className="text-center text-sm text-gray-400">
            By registering, you agree to our{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitKeeper;
