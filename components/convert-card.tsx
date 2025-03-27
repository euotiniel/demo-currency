"use client";

import * as React from "react";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { useRates, useAllCoinsCode } from "@/hooks/useCoins";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConvertCard() {
  const [amount, setAmount] = React.useState(1);
  const [fromCoin, setFromCoin] = React.useState("");
  const [toCoin, setToCoin] = React.useState("");

  const { data: allCoins } = useAllCoinsCode();
  const { data: rates, isLoading } = useRates(fromCoin);
  const convertedAmount = rates?.conversion_rates?.[toCoin]
    ? amount * rates.conversion_rates[toCoin]
    : 0;

  React.useEffect(() => {
    if (allCoins?.length) {
      setFromCoin(fromCoin || allCoins[0]);
      setToCoin(toCoin || allCoins[1] || allCoins[0]);
    }
  }, [allCoins]);

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  };

  return (
    <Card className="p-6 shadow-sm border-0 bg-gradient-to-b from-white to-slate-50">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Input
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="h-12 w-full sm:w-[250px] text-lg pr-24 border-slate-200 bg-white focus-visible:ring-1 focus-visible:ring-slate-300 rounded-md transition-all"
              type="number"
              min="0"
              step="any"
            />

            <Select value={fromCoin} onValueChange={setFromCoin}>
              <SelectTrigger className="absolute right-2 top-1/2 transform -translate-y-1/2 w-20 h-8 text-sm border-0 bg-transparent hover:bg-slate-100 focus:ring-0 flex items-center justify-between px-2">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]">
                {allCoins?.map((coin: string) => (
                  <SelectItem key={coin} value={coin} className="text-sm">
                    {coin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwap}
            className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            disabled={!fromCoin || !toCoin || isLoading}
          >
            <ArrowLeftRight className="h-4 w-4 text-slate-500" />
            <span className="sr-only">Swap currencies</span>
          </Button>
        </div>

        <div className="w-full sm:w-auto">
          <div className="relative">
            <div className="h-12 w-full sm:w-[250px] flex items-center px-3 bg-white border border-slate-200 rounded-md pr-24">
              {isLoading ? (
                <div className="flex items-center space-x-2 text-slate-400">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-xs">Converting...</span>
                </div>
              ) : (
                <p className="text-lg font-medium truncate">
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </p>
              )}
            </div>
            <Select value={toCoin} onValueChange={setToCoin}>
              <SelectTrigger className="absolute right-2 top-1/2 transform -translate-y-1/2 w-20 h-8 text-sm border-0 bg-transparent hover:bg-slate-100 focus:ring-0 flex items-center justify-between px-2">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]">
                {allCoins?.map((coin: string) => (
                  <SelectItem key={coin} value={coin} className="text-sm">
                    {coin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {!isLoading && fromCoin && toCoin && (
        <p className="text-xs text-center text-slate-500 mt-4 font-light">
          1 {fromCoin} = {rates?.conversion_rates?.[toCoin].toFixed(6)} {toCoin}
        </p>
      )}
    </Card>
  );
}
