"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar as CalendarIcon, Luggage, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { motion } from "framer-motion";
import Header from "@/components/header";

const regions = [
  { id: "hokkaido", name: "北海道", path: "M280,40 h80 v60 h-80 Z" },
  { id: "tohoku", name: "東北", path: "M280,100 h80 v80 h-80 Z" },
  { id: "kanto", name: "関東", path: "M280,180 h80 v60 h-80 Z" },
  { id: "chubu", name: "中部", path: "M200,180 h80 v60 h-80 Z" },
  { id: "kinki", name: "近畿", path: "M200,240 h80 v60 h-80 Z" },
  { id: "chugoku", name: "中国", path: "M120,240 h80 v60 h-80 Z" },
  { id: "shikoku", name: "四国", path: "M120,300 h80 v40 h-80 Z" },
  { id: "kyushu", name: "九州", path: "M40,240 h80 v100 h-80 Z" },
  { id: "okinawa", name: "沖縄", path: "M40,360 h40 v40 h-40 Z" },
];

export default function Component() {
  const [date, setDate] = useState<Date>();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-black to-gray-800">
      <Header />

      <main className="container mx-auto mt-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br border-white from-gray-950 via-black to-gray-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-100 dark:text-gray-200">荷物を預ける場所を探す</h2>
          <div className="flex flex-wrap gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("bg-gray-900 w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-5 w-5 text-gray-100" />
                  {date ? format(date, "PPP", { locale: ja }) : <span className="text-gray-100">日付を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="area" className="sr-only">
                エリア
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <Input
                  id="area"
                  placeholder="エリアを入力"
                  className="pl-10 bg-gray-900 border-white text-white rounded-md"
                  value={selectedRegion ? regions.find((r) => r.id === selectedRegion)?.name || "" : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="w-32">
              <Label htmlFor="luggage" className="sr-only">
                荷物数
              </Label>
              <div className="relative">
                <Luggage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <Input id="luggage" type="number" placeholder="荷物数" className="pl-10 bg-gray-900 border-white text-white rounded-md" min="1" />
              </div>
            </div>

            <Button className="border-[1px] border-white bg-gray-900 hover:bg-gray-800 text-white">
              <Search className="mr-2 h-4 w-4 " />
              検索
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br bg-gray-900 dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 dark:text-gray-200">料金表</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-gray-300 dark:text-gray-400">荷物サイズ</th>
                  <th className="text-right py-3 text-gray-300 dark:text-gray-400">料金（1日あたり）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 text-gray-100 dark:text-gray-200">小（リュック等）</td>
                  <td className="text-right py-3 text-gray-100 dark:text-gray-200">¥500</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 text-gray-100 dark:text-gray-200">中（キャリーケース）</td>
                  <td className="text-right py-3 text-gray-100 dark:text-gray-200">¥800</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-100 dark:text-gray-200">大（大型スーツケース）</td>
                  <td className="text-right py-3 text-gray-100 dark:text-gray-200">¥1,200</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br bg-gray-900 dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-100 dark:text-gray-200">エリアから探す</h2>
            <div className="aspect-w-4 aspect-h-3">
              <svg viewBox="0 0 400 440" className="w-full h-full">
                <TooltipProvider>
                  {regions.map((region) => (
                    <Tooltip key={region.id}>
                      <TooltipTrigger asChild>
                        <g
                          onClick={() => handleRegionClick(region.id)}
                          tabIndex={0}
                          role="button"
                          aria-label={`${region.name}を選択`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleRegionClick(region.id);
                            }
                          }}
                        >
                          <motion.path
                            d={region.path}
                            fill={selectedRegion === region.id ? "hsl(142, 76%, 36%)" : "hsl(151, 55%, 41%)"}
                            stroke="#111827"
                            strokeWidth="2"
                            className="cursor-pointer transition-colors duration-200 hover:fill-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          />
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="p-2 text-sm">{region.name}</div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </svg>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
