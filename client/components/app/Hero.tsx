import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Sparkles, Dumbbell } from "lucide-react";

export const Hero: React.FC<{ onGetStarted?: () => void; onLoginUser?: () => void; onRegisterUser?: () => void; onLoginDoctor?: () => void; onRegisterDoctor?: () => void }> = ({ onGetStarted, onLoginUser, onRegisterUser, onLoginDoctor, onRegisterDoctor }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-card">
      <div className="absolute left-1/2 top-[-40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.slate.200)/.35,transparent_60%)] blur-3xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-foreground/70" /> Premium Fitness & Wellness</span>
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Balance Fitness & Ayurveda for a Healthier You
          </h1>
          <p className="max-w-prose text-muted-foreground">
            Modern training meets holistic wellness. Minimal, calming, and effective—built to keep you consistent.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button size="lg" className="h-11 w-full rounded-full bg-emerald-600 text-white hover:bg-emerald-600/90" onClick={onLoginUser}>
                Login as User
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button size="lg" variant="outline" className="h-11 w-full rounded-full border-emerald-600/40 hover:bg-emerald-50" onClick={onRegisterUser}>
                Register as User
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button size="lg" className="h-11 w-full rounded-full bg-slate-800 text-white hover:bg-slate-800/90" onClick={onLoginDoctor}>
                Login as Doctor
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button size="lg" variant="outline" className="h-11 w-full rounded-full border-slate-800/40 hover:bg-slate-50" onClick={onRegisterDoctor}>
                Register as Doctor
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center gap-6 pt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-foreground/70" /> Habit streaks</div>
            <div className="flex items-center gap-2"><Dumbbell className="h-4 w-4 text-foreground/70" /> Smart workouts</div>
          </div>
        </div>
        <div className="relative">
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <img
              src="https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg"
              alt="Ayurvedic flat lay with natural herbs, flowers, and wellness ingredients in a clean neutral setting."
              className="aspect-[4/3] w-full rounded-3xl border object-cover shadow-sm"
              loading="lazy"
            />
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
