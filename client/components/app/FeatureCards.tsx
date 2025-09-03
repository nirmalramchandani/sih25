import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, Apple, Dumbbell } from "lucide-react";

const items = [
  {
    title: "Workouts",
    desc: "Adaptive plans with strength, mobility, and recovery.",
    icon: Dumbbell,
    accent: "from-emerald-400 to-green-600",
    cta: "View Routines",
  },
  {
    title: "Nutrition",
    desc: "Clean, balanced meals and actionable tips.",
    icon: Apple,
    accent: "from-orange-400 to-rose-500",
    cta: "See Meal Plans",
  },
  {
    title: "Tracking",
    desc: "Realtime progress with gentle coaching.",
    icon: Activity,
    accent: "from-blue-400 to-indigo-600",
    cta: "Open Tracker",
  },
];

export const FeatureCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(({ title, desc, icon: Icon, accent, cta }) => (
        <motion.div key={title} whileHover={{ y: -4 }}>
          <Card className="group relative overflow-hidden rounded-2xl border bg-white/70 p-5 shadow-md backdrop-blur-md transition-colors hover:shadow-lg dark:bg-card/70">
            <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-30`} />
            <div className="flex items-start justify-between">
              <div className="rounded-xl border bg-white/70 p-2 shadow-sm dark:bg-background/60">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-lg font-semibold">{title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <div className="mt-4">
              <Button variant="outline" className="rounded-full">
                {cta}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCards;
