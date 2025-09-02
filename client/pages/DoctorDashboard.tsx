import React, { useMemo, useState } from "react";
import { useAppState } from "@/context/app-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function DoctorDashboard() {
  const { requests, setRequests } = useAppState();
  const [videoOpen, setVideoOpen] = useState(false);
  const [plan, setPlan] = useState([
    { time: "08:00", name: "Warm Spiced Oats", calories: 320 },
    { time: "12:30", name: "Moong Dal Khichdi", calories: 450 },
    { time: "19:30", name: "Steamed Veg + Ghee", calories: 420 },
  ]);
  const [selected, setSelected] = useState<string | null>(null);

  const accept = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "accepted" } : r));
  const reject = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "rejected" } : r));

  const selectedReq = useMemo(()=> requests.find(r=>r.id===selected) || null, [requests, selected]);

  if (!selectedReq) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Patient Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 && (
                  <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No requests</TableCell></TableRow>
                )}
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono">{r.id}</TableCell>
                    <TableCell className="capitalize">{r.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => accept(r.id)}>Accept</Button>
                      <Button size="sm" variant="destructive" onClick={() => reject(r.id)}>Reject</Button>
                      <Button size="sm" onClick={()=> setSelected(r.id)}>Open</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        <div className="ml-3">
          <Button variant="outline" onClick={()=> setSelected(null)}>Back to Requests</Button>
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
                  <TableCell><Input value={row.time} onChange={(e)=>{
                    const v = e.target.value; setPlan(p=>p.map((r,i)=>i===idx?{...r,time:v}:r));
                  }} /></TableCell>
                  <TableCell><Input value={row.name} onChange={(e)=>{
                    const v = e.target.value; setPlan(p=>p.map((r,i)=>i===idx?{...r,name:v}:r));
                  }} /></TableCell>
                  <TableCell><Input type="number" value={row.calories} onChange={(e)=>{
                    const v = parseInt(e.target.value||"0"); setPlan(p=>p.map((r,i)=>i===idx?{...r,calories:v}:r));
                  }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 flex gap-2">
            <Button onClick={()=>setPlan(p=>[...p,{time:"16:00",name:"Herbal Tea",calories:60}])}>Add Row</Button>
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Video Call</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Mock Video Consult</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full rounded-md bg-black/80" />
                <div className="text-center text-sm text-muted-foreground">Simulated video frame</div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
