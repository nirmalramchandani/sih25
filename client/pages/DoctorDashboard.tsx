import React, { useMemo, useState } from "react";
import { useAppState } from "@/context/app-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function DoctorDashboard() {
  const { currentUser, doctors, requests, setRequests } = useAppState();
  const [videoOpen, setVideoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role:"doctor"|"patient"; text:string; ts:number}[]>([]);
  const [draft, setDraft] = useState("");
  const [plan, setPlan] = useState([
    { time: "08:00", name: "Warm Spiced Oats", calories: 320 },
    { time: "12:30", name: "Moong Dal Khichdi", calories: 450 },
    { time: "19:30", name: "Steamed Veg + Ghee", calories: 420 },
  ]);
  const [selected, setSelected] = useState<string | null>(null);

  const getDoctorProfileId = () => {
    const key = `app:doctor-map:${currentUser?.id || "anon"}`;
    let mapped = localStorage.getItem(key);
    if (!mapped) {
      mapped = doctors[0]?.id || "d1";
      localStorage.setItem(key, mapped);
    }
    return mapped;
  };
  const doctorProfileId = getDoctorProfileId();

  const accept = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "accepted" } : r));
  const reject = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "rejected" } : r));

  const selectedReq = useMemo(()=> requests.find(r=>r.id===selected) || null, [requests, selected]);
  const pendingForMe = useMemo(()=> requests.filter(r=>r.doctorId === doctorProfileId && r.status === "pending"), [requests, doctorProfileId]);
  const myPatients = useMemo(()=> requests.filter(r=>r.doctorId === doctorProfileId && r.status === "accepted"), [requests, doctorProfileId]);

  if (!selectedReq) {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="bg-gradient-to-br from-emerald-50 to-lime-50 border-emerald-100">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Pending</CardTitle></CardHeader>
            <CardContent className="pt-0 text-2xl font-bold">{pendingForMe.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Active Patients</CardTitle></CardHeader>
            <CardContent className="pt-0 text-2xl font-bold">{myPatients.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Total Requests</CardTitle></CardHeader>
            <CardContent className="pt-0 text-2xl font-bold">{pendingForMe.length + myPatients.length}</CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">Manage incoming requests and active patients</div>
            <div className="rounded-lg border">
              <div className="flex flex-wrap gap-2 border-b p-2 text-sm">
                <button className="rounded-md bg-muted px-3 py-1.5 font-medium">Requests</button>
                <button className="rounded-md px-3 py-1.5 hover:bg-muted" onClick={() => { /* anchor for a11y */ }}>
                  My Patients
                </button>
              </div>
              <div className="grid gap-6 p-3 sm:grid-cols-2">
                <div>
                  <div className="mb-2 text-sm font-semibold">Patient Requests</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Req ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingForMe.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No pending requests</TableCell></TableRow>
                      )}
                      {pendingForMe.map((r) => (
                        <TableRow key={r.id} className="hover:bg-muted/40">
                          <TableCell className="font-mono text-xs">{r.id}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">Pending</span>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button size="sm" variant="outline" onClick={() => accept(r.id)}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => reject(r.id)}>Reject</Button>
                            <Button size="sm" variant="ghost" onClick={()=> setSelected(r.id)}>Open</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <div className="mb-2 text-sm font-semibold">My Patients</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Req ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myPatients.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No active consultations</TableCell></TableRow>
                      )}
                      {myPatients.map((r)=> (
                        <TableRow key={r.id} className="hover:bg-muted/40">
                          <TableCell className="font-mono text-xs">{r.id}</TableCell>
                          <TableCell>{`Patient ${r.userId}`}</TableCell>
                          <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={()=> setSelected(r.id)}>Open</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const patient = {
    id: selectedReq.userId,
    name: `Patient ${selectedReq.userId.slice(-4)}`,
    age: 30,
    dosha: ["Vata","Pitta","Kapha"][Math.floor(Math.random()*3)],
  };

  const isApproved = selectedReq.status === "accepted";

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m)=> m.concat({ role: "doctor", text: draft.trim(), ts: Date.now() }, { role: "patient", text: "Thanks, noted!", ts: Date.now()+200 }));
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-4">
              <div><div className="text-xs text-muted-foreground">ID</div><div className="font-mono">{patient.id}</div></div>
              <div><div className="text-xs text-muted-foreground">Name</div><div className="font-medium">{patient.name}</div></div>
              <div><div className="text-xs text-muted-foreground">Age</div><div>{patient.age}</div></div>
              <div><div className="text-xs text-muted-foreground">Dosha</div><div className="font-medium">{patient.dosha}</div></div>
            </div>
          </CardContent>
        </Card>
        <div className="ml-3 flex gap-2">
          {!isApproved && <Button onClick={()=> accept(selectedReq.id)}>Approve</Button>}
          <Button variant="outline" onClick={()=> setSelected(null)}>Back</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editable Diet Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plan.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell><Input disabled={!isApproved} value={row.time} onChange={(e)=>{
                    const v = e.target.value; setPlan(p=>p.map((r,i)=>i===idx?{...r,time:v}:r));
                  }} /></TableCell>
                  <TableCell><Input disabled={!isApproved} value={row.name} onChange={(e)=>{
                    const v = e.target.value; setPlan(p=>p.map((r,i)=>i===idx?{...r,name:v}:r));
                  }} /></TableCell>
                  <TableCell><Input disabled={!isApproved} type="number" value={row.calories} onChange={(e)=>{
                    const v = parseInt(e.target.value||"0"); setPlan(p=>p.map((r,i)=>i===idx?{...r,calories:v}:r));
                  }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 flex gap-2">
            <Button disabled={!isApproved} onClick={()=>setPlan(p=>[...p,{time:"16:00",name:"Herbal Tea",calories:60}])}>Add Row</Button>
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={!isApproved}>Video Call</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Mock Video Consult</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full rounded-md bg-black/80" />
                <div className="text-center text-sm text-muted-foreground">Simulated video frame</div>
              </DialogContent>
            </Dialog>
            <Dialog open={chatOpen} onOpenChange={setChatOpen}>
              <DialogTrigger asChild>
                <Button disabled={!isApproved}>Chat</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Chat with {patient.name}</DialogTitle>
                </DialogHeader>
                <div className="h-96 rounded-md border bg-background">
                  <div className="flex h-full flex-col">
                    <div className="border-b px-4 py-2 text-xs text-muted-foreground">Secure consultation chat (mock)</div>
                    <div id="chat-scroll" className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
                      {messages.length === 0 && (
                        <div className="text-center text-xs text-muted-foreground">No messages yet. Say hello 👋</div>
                      )}
                      {messages.map((m, i) => (
                        <div key={i} className={m.role === "doctor" ? "flex justify-end" : "flex justify-start"}>
                          <div className="max-w-[75%]">
                            <div className={m.role === "doctor" ? "text-right text-[10px] text-muted-foreground" : "text-[10px] text-muted-foreground"}>
                              {new Date(m.ts).toLocaleTimeString()}
                            </div>
                            <div className={m.role === "doctor" ? "rounded-2xl bg-primary px-3 py-2 text-primary-foreground shadow-sm" : "rounded-2xl bg-muted px-3 py-2 shadow-sm"}>
                              {m.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t p-2">
                      <div className="mb-2 flex flex-wrap gap-2 text-xs">
                        <button className="rounded-full border px-2 py-1" onClick={()=>setDraft("Please follow the plan and hydrate 250ml now.")}>Hydration</button>
                        <button className="rounded-full border px-2 py-1" onClick={()=>setDraft("How are you feeling after lunch?")}>Check-in</button>
                        <button className="rounded-full border px-2 py-1" onClick={()=>setDraft("Schedule a follow-up for tomorrow 5pm.")}>Schedule</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Type a message" value={draft} onChange={(e)=>setDraft(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }} />
                        <Button onClick={send}>Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {!isApproved && (<div className="mt-2 text-xs text-muted-foreground">Approve the request to enable chat, video, and editing.</div>)}
        </CardContent>
      </Card>
    </div>
  );
}
