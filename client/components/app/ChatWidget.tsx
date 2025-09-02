import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useAppState } from "@/context/app-state";

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm your Ayurvedic assistant. Tell me what you ate or ask for tips." },
  ]);
  const { markMealTaken, updateWater } = useAppState();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    const t = text.toLowerCase();
    let reply = "Noted. How else can I help?";
    if (t.includes("water")) {
      updateWater(250);
      reply = "Logged 250ml water. Keep hydrating!";
    }
    if (t.includes("ate my lunch") || t.includes("lunch done") || t.includes("meal done")) {
      markMealTaken();
      reply = "Great! I marked your lunch as taken. Want a light herbal tea later?";
    }
    if (t.includes("tip") || t.includes("advice")) {
      reply = "Choose warm, cooked meals. Avoid iced drinks. Ginger and cumin can aid digestion.";
    }

    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    }, 400);
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3")}>
      {open && (
        <Card className="w-80 shadow-xl border-emerald-200/50">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <div className="text-sm font-semibold">Ayur Assistant</div>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Close</Button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto p-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("rounded-md px-3 py-2", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t p-2">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message... e.g., I drank water" className="mb-2 h-16" />
            <Button className="w-full" onClick={handleSend}>Send</Button>
          </div>
        </Card>
      )}
      {!open && (
        <Button size="lg" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setOpen(true)}>
          <MessageCircle />
        </Button>
      )}
    </div>
  );
};
