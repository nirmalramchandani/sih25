import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Sparkles, Dumbbell, User as UserIcon, Stethoscope } from "lucide-react";

export const Hero: React.FC<{ onGetStarted?: () => void; onLoginUser?: () => void; onRegisterUser?: () => void; onLoginDoctor?: () => void; onRegisterDoctor?: () => void }> = ({ onGetStarted, onLoginUser, onRegisterUser, onLoginDoctor, onRegisterDoctor }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-card">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />
        <img src="https://images.pexels.com/photos/6693969/pexels-photo-6693969.jpeg" alt="Essential oils and stones" className="absolute -left-10 top-10 h-40 w-56 rounded-3xl object-cover opacity-20 blur-sm" />
        <img src="https://images.pexels.com/photos/4151292/pexels-photo-4151292.jpeg" alt="Yoga silhouette" className="absolute -bottom-10 right-0 h-52 w-80 rounded-3xl object-cover opacity-15 blur-sm" />
      </div>
      <div className="absolute left-1/2 top-[-40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.slate.200)/.35,transparent_60%)] blur-3xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-foreground/70" /> Premium Fitness & Wellness</span>
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Where Ayurveda Meets Modern Fitness
          </h1>
          <p className="max-w-prose text-muted-foreground">
            Balance your health with holistic care and expert guidance.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onLoginUser}
              className="group cursor-pointer rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-emerald-600/30"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl border bg-emerald-50 p-2"><UserIcon className="h-5 w-5 text-emerald-700" /></div>
                <div className="text-sm font-semibold">Continue as User</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Personalized plans, tracking, and mindful guidance.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onLoginDoctor}
              className="group cursor-pointer rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-800/25"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl border bg-slate-100 p-2"><Stethoscope className="h-5 w-5 text-slate-800" /></div>
                <div className="text-sm font-semibold">Continue as Doctor</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Consult requests, chat, and diet plan sharing.</p>
            </motion.div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
              <img src="https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg" alt="Ayurvedic herbs and wellness ingredients" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/70 via-white/70 to-transparent" />
              <div className="relative text-sm text-foreground/80">“When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.”</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }} className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
              <img src="https://images.pexels.com/photos/4151292/pexels-photo-4151292.jpeg" alt="Yoga practitioner in calm setting" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/80 via-white/70 to-transparent" />
              <div className="relative text-sm text-foreground/80">“The art of healing comes from nature; the physician must start from nature, with an open mind.”</div>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-3xl border shadow-sm">
              <img
                src="https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg"
                alt="Ayurvedic flat lay with natural herbs, flowers, and wellness ingredients in a clean neutral setting."
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <motion.div whileHover={{ y: -1 }} className="rounded-xl border bg-white p-3 text-center shadow-sm">
    <div className="mx-auto mb-2 h-8 w-8 rounded-lg bg-slate-200" />
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </motion.div>
);

export default Hero;
