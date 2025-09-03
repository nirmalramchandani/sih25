import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Sparkles, Dumbbell } from "lucide-react";

export const Hero: React.FC<{ onGetStarted?: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white to-white/60 p-8 shadow-lg ring-1 ring-black/5 dark:from-background dark:to-muted/20">
      <div className="absolute left-1/2 top-[-40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.green.300)/.35,transparent_60%)] blur-3xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-primary" /> Premium Fitness & Wellness</span>
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Build your strongest, healthiest self
          </h1>
          <p className="max-w-prose text-muted-foreground">
            Personalized workouts, clean nutrition, and mindful habits — designed with a minimalist, professional experience.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full px-6" onClick={onGetStarted}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6">
              Explore Plans
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-500" /> Habit streaks</div>
            <div className="flex items-center gap-2"><Dumbbell className="h-4 w-4 text-green-600" /> Smart workouts</div>
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border bg-white/80 p-5 shadow-xl backdrop-blur-md dark:bg-card/70">
              <div className="mb-3 text-sm font-medium">Today</div>
              <div className="grid grid-cols-3 gap-3">
                <StatTile label="Calories" value="1,240" accent="from-orange-400 to-pink-500" />
                <StatTile label="Steps" value="8,932" accent="from-green-400 to-emerald-500" />
                <StatTile label="Minutes" value="42" accent="from-blue-400 to-indigo-500" />
              </div>
              <div className="mt-4 rounded-xl border bg-muted/40 p-4">
                <div className="mb-1 text-xs text-muted-foreground">Weekly Activity</div>
                <div className="flex h-16 items-end justify-between gap-1">
                  {[40, 70, 55, 85, 60, 92, 50].map((h, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.05 }} className="w-full rounded-md bg-gradient-to-b from-primary/80 to-primary" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <motion.div whileHover={{ y: -2 }} className="rounded-xl border bg-gradient-to-br p-3 text-center shadow-sm" style={{ backgroundImage: undefined }}>
    <div className={`mx-auto mb-2 h-8 w-8 rounded-lg bg-gradient-to-br ${accent}`} />
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </motion.div>
);

export default Hero;
