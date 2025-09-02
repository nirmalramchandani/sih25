import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState, User } from "@/context/app-state";

export default function Index() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppState();
  const [role, setRole] = useState<"user" | "doctor">("user");

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-lime-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-emerald-400 to-lime-500" />
          <div className="text-xl font-bold tracking-tight">AyurWell</div>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button variant="ghost" onClick={() => setRole("user")}>User</Button>
          <Button variant="ghost" onClick={() => setRole("doctor")}>Doctor</Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl items-start gap-8 px-6 pb-16 md:grid-cols-2">
        <div className="pt-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ayurvedic Diet Management
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Personalized sattvic nutrition, mock consults, and habit tracking — all in a clean, responsive prototype.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <li>• Take a short quiz to find your Dosha</li>
            <li>• Generate diet plans and track progress</li>
            <li>• Connect with doctors for consults</li>
            <li>• Scan products, get recipes, and chat with the bot</li>
          </ul>
        </div>
        <AuthArea onAuthed={(u) => { setCurrentUser(u); navigate("/dashboard"); }} defaultRole={role} />
      </main>
    </div>
  );
}

const AuthArea: React.FC<{ onAuthed: (u: User) => void; defaultRole: "user" | "doctor" }> = ({ onAuthed, defaultRole }) => {
  const [active, setActive] = useState<"signup" | "login">("signup");
  const [role, setRole] = useState<"user" | "doctor">(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [quiz, setQuiz] = useState({ warm: 2, spicy: 2, cold: 2, sweet: 2 });
  const dosha = useMemo(() => {
    const { warm, spicy, cold, sweet } = quiz;
    if (spicy > warm && spicy > cold) return "Pitta" as const;
    if (cold > warm && cold > spicy) return "Vata" as const;
    return "Kapha" as const;
  }, [quiz]);

  return (
    <Card className="border-emerald-200/40 shadow-lg">
      <CardContent className="p-6">
        <Tabs value={active} onValueChange={(v) => setActive(v as typeof active)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="login">Log in</TabsTrigger>
          </TabsList>
          <div className="mt-4" />
          <div className="mb-3 grid grid-cols-2 gap-2">
            <Button variant={role === "user" ? "default" : "outline"} onClick={() => setRole("user")}>Sign up as User</Button>
            <Button variant={role === "doctor" ? "default" : "outline"} onClick={() => setRole("doctor")}>Sign up as Doctor</Button>
          </div>

          <TabsContent value="signup" className="space-y-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            {role === "user" && (
              <div className="rounded-md border bg-muted/20 p-3">
                <div className="mb-2 text-sm font-medium">Quick Dosha Quiz</div>
                <QuizSlider label="Prefer warm foods" value={quiz.warm} onChange={(v)=>setQuiz({...quiz,warm:v})} />
                <QuizSlider label="Enjoy spicy taste" value={quiz.spicy} onChange={(v)=>setQuiz({...quiz,spicy:v})} />
                <QuizSlider label="Often feel cold" value={quiz.cold} onChange={(v)=>setQuiz({...quiz,cold:v})} />
                <QuizSlider label="Crave sweets" value={quiz.sweet} onChange={(v)=>setQuiz({...quiz,sweet:v})} />
                <div className="mt-2 text-xs text-muted-foreground">Suggested Dosha: <span className="font-semibold">{dosha}</span></div>
              </div>
            )}

            <Button className="w-full" onClick={() => onAuthed({ id: `u_${Date.now()}`, name: name || "Guest", email, role, dosha: role === "user" ? dosha : null })}>Continue</Button>
          </TabsContent>

          <TabsContent value="login" className="space-y-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant={role === "user" ? "default" : "outline"} onClick={() => setRole("user")}>User</Button>
              <Button variant={role === "doctor" ? "default" : "outline"} onClick={() => setRole("doctor")}>Doctor</Button>
            </div>
            <Button className="w-full" onClick={() => onAuthed({ id: `u_${Date.now()}`, name: "Member", email, role, dosha: role === "user" ? "Kapha" : null })}>Log in</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const QuizSlider: React.FC<{ label: string; value: number; onChange: (v: number)=>void }> = ({ label, value, onChange }) => {
  return (
    <div className="grid grid-cols-3 items-center gap-2 py-1 text-sm">
      <div className="col-span-1">{label}</div>
      <input className="col-span-2" type="range" min={1} max={4} value={value} onChange={(e)=>onChange(parseInt(e.target.value))} />
    </div>
  );
};
