import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Scan(){
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<{name:string; qty:string; kcal:number; tags:string[]} | null>(null);

  const scan = () => {
    setResult({ name: "Oats", qty: "100g", kcal: 389, tags:["Warm","Rasa: Madhura","Light"] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Barcode Scanner</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2 flex items-center gap-2">
            <Input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Enter or paste barcode" />
            <input type="file" accept="image/*" onChange={(e)=> setFileName(e.target.files?.[0]?.name || null)} />
          </div>
          <Button onClick={scan}>Scan (mock)</Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{result.name} • {result.qty}</div>
                <div className="text-xs text-muted-foreground">Calories: {result.kcal} • Source: {fileName || code || "mock"}</div>
              </div>
              <div className="flex flex-wrap gap-1">{result.tags.map((t,i)=>(<Badge key={i} variant="secondary">{t}</Badge>))}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
