import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "user" | "doctor";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  dosha?: "Vata" | "Pitta" | "Kapha" | null;
};

export type Progress = {
  waterMl: number;
  waterGoalMl: number;
  mealsPlanned: number;
  mealsTaken: number;
};

export type Meal = {
  time: string;
  name: string;
  calories: number;
  properties: string[]; // e.g., ["Hot", "Rasa: Madhura"]
};

export type DietPlan = {
  date: string;
  notes?: string;
  meals: Meal[];
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
};

export type ConsultRequest = {
  id: string;
  userId: string;
  doctorId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "doctor" | "diet" | "water";
  title: string;
  message: string;
  time: string;
  read?: boolean;
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export type AppState = {
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  progress: Progress;
  setProgress: (p: Progress) => void;
  dietPlan: DietPlan | null;
  setDietPlan: (p: DietPlan | null) => void;
  doctors: Doctor[];
  requests: ConsultRequest[];
  setRequests: (r: ConsultRequest[]) => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "time" | "read">) => void;
  markAllRead: () => void;
  updateWater: (deltaMl: number) => void;
  markMealTaken: () => void;
  generateMockPlan: (overrides?: Partial<DietPlan>) => DietPlan;
};

const AppStateContext = createContext<AppState | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => load<User | null>("app:currentUser", null));
  const [progress, setProgress] = useState<Progress>(() => load<Progress>("app:progress", {
    waterMl: 0,
    waterGoalMl: 2500,
    mealsPlanned: 3,
    mealsTaken: 0,
  }));
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(() => load<DietPlan | null>("app:dietPlan", null));
  const [doctors] = useState<Doctor[]>([
    { id: "d1", name: "Dr. Anaya Verma", specialty: "Ayurvedic Diet", rating: 4.9 },
    { id: "d2", name: "Dr. Rohan Mehta", specialty: "Digestive Health", rating: 4.7 },
    { id: "d3", name: "Dr. Kavya Iyer", specialty: "Metabolic Care", rating: 4.8 },
  ]);
  const [requests, setRequests] = useState<ConsultRequest[]>(() => load<ConsultRequest[]>("app:requests", []));
  const [notifications, setNotifications] = useState<Notification[]>(() => load<Notification[]>("app:notifications", []));

  useEffect(() => save("app:currentUser", currentUser), [currentUser]);
  useEffect(() => save("app:progress", progress), [progress]);
  useEffect(() => save("app:dietPlan", dietPlan), [dietPlan]);
  useEffect(() => save("app:requests", requests), [requests]);
  useEffect(() => save("app:notifications", notifications), [notifications]);

  const addNotification = (n: Omit<Notification, "id" | "time" | "read">) => {
    setNotifications((prev) => [{ id: uid("ntf"), time: new Date().toISOString(), read: false, ...n }, ...prev].slice(0, 50));
  };
  const markAllRead = () => setNotifications((prev) => prev.map((x) => ({ ...x, read: true })));

  const updateWater = (deltaMl: number) => {
    setProgress((p) => ({ ...p, waterMl: Math.max(0, Math.min(p.waterGoalMl, p.waterMl + deltaMl)) }));
    addNotification({ type: "water", title: "Hydration logged", message: `+${deltaMl}ml water added.` });
  };
  const markMealTaken = () => {
    setProgress((p) => ({ ...p, mealsTaken: Math.min(p.mealsPlanned, p.mealsTaken + 1) }));
    addNotification({ type: "diet", title: "Meal recorded", message: "Marked one meal as taken." });
  };

  const generateMockPlan = (overrides?: Partial<DietPlan>): DietPlan => {
    const base: DietPlan = {
      date: new Date().toISOString().slice(0, 10),
      notes: "Personalized as per dosha balance with sattvic emphasis",
      meals: [
        { time: "08:00", name: "Warm Spiced Oats", calories: 320, properties: ["Warm", "Rasa: Madhura", "Sattvic"] },
        { time: "12:30", name: "Moong Dal Khichdi", calories: 450, properties: ["Light", "Tridoshic", "Sattvic"] },
        { time: "16:00", name: "Herbal Tea + Nuts", calories: 180, properties: ["Warm", "Rasa: Kashaya"] },
        { time: "19:30", name: "Steamed Veg + Ghee", calories: 420, properties: ["Light", "Grounding"] },
      ],
    };
    const plan = { ...base, ...overrides };
    setDietPlan(plan);
    addNotification({ type: "diet", title: "Diet plan generated", message: `7-day plan for ${plan.date} created.` });
    return plan;
  };

  const value = useMemo<AppState>(() => ({
    currentUser,
    setCurrentUser,
    progress,
    setProgress,
    dietPlan,
    setDietPlan,
    doctors,
    requests,
    setRequests,
    notifications,
    addNotification,
    markAllRead,
    updateWater,
    markMealTaken,
    generateMockPlan,
  }), [currentUser, progress, dietPlan, doctors, requests, notifications]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
