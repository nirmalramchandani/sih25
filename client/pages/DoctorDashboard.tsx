import React, { useState } from "react";
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

  const accept = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "accepted" } : r));
  const reject = (id: string) => setRequests(requests.map(r => r.id === id ? { ...r, status: "rejected" } : r));

  return (
    <div className="grid gap-4 md:grid-cols-2">
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
                  <TableCell>{r.id}</TableCell>
                  <TableCell className="capitalize">{r.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => accept(r.id)}>Accept</Button>
                    <Button size="sm" variant="destructive" onClick={() => reject(r.id)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
