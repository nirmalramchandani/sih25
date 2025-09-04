import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState, User } from "@/context/app-state";
import Hero from "@/components/app/Hero";
import FeatureCards from "@/components/app/FeatureCards";
import StreakTracker from "@/components/app/StreakTracker";
import NavBar from "@/components/app/NavBar";
import Footer from "@/components/app/Footer";
import Testimonials from "@/components/app/Testimonials";
import { motion } from "framer-motion";

export default function Index() {
  const { setCurrentUser } = useAppState();
  const [role, setRole] = useState<"user" | "doctor">("user");

  return (
    <div className="min-h-screen bg-white">
      <NavBar onGetStarted={() => document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth", block: "start" })} onSignIn={() => window.location.assign("/login")} />

      <main className="mx-auto grid max-w-6xl items-start gap-10 px-6 pb-10 md:grid-cols-2">
        <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="pt-4">
          <Hero
            onGetStarted={() => document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            onLoginUser={() => window.location.assign("/login?role=user")}
            onRegisterUser={() => { setRole("user"); document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            onLoginDoctor={() => window.location.assign("/login?role=doctor")}
            onRegisterDoctor={() => { setRole("doctor"); document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
          />
        </motion.div>
        <motion.div id="auth-card" initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="pt-4">
          <AuthArea
            onAuthed={(u) => {
              setCurrentUser(u);
              window.location.assign("/dashboard");
            }}
            defaultRole={role}
          />
        </motion.div>
      </main>
      <section id="features" className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 md:grid-cols-3">
        <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="md:col-span-2">
          <FeatureCards />
        </motion.div>
        <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
          <StreakTracker />
        </motion.div>
      </section>
      <Testimonials />
      <Footer />
    </div>
  );
}

const AuthArea: React.FC<{
  onAuthed: (u: User) => void;
  defaultRole: "user" | "doctor";
}> = ({ onAuthed, defaultRole }) => {
  const [active, setActive] = useState<"signup" | "login">("signup");
  const [role, setRole] = useState<"user" | "doctor">(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("Female");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState("Moderate");
  const [qualification, setQualification] = useState("BAMS");
  const [consent, setConsent] = useState(false);

  type Dosha = "Vata" | "Pitta" | "Kapha";
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const quiz = [
    {
      q: "Body build & weight tendency",
      options: [
        {
          label: "Slender; finds it hard to gain weight",
          w: { Vata: 2, Pitta: 1, Kapha: 0 },
        },
        {
          label: "Medium; gains/loses easily",
          w: { Vata: 0, Pitta: 2, Kapha: 1 },
        },
        {
          label: "Broad; gains weight easily",
          w: { Vata: 0, Pitta: 1, Kapha: 2 },
        },
      ],
    },
    {
      q: "Temperature preference / tolerance",
      options: [
        {
          label: "Prefers warmth; dislikes cold",
          w: { Vata: 2, Pitta: 0, Kapha: 1 },
        },
        {
          label: "Dislikes heat; enjoys cool",
          w: { Vata: 0, Pitta: 2, Kapha: 1 },
        },
        {
          label: "Tolerant; prefers moderate",
          w: { Vata: 1, Pitta: 0, Kapha: 2 },
        },
      ],
    },
    {
      q: "Skin & hair",
      options: [
        { label: "Dry skin/hair", w: { Vata: 2, Pitta: 0, Kapha: 0 } },
        {
          label: "Sensitive/rosy skin, early greying",
          w: { Vata: 0, Pitta: 2, Kapha: 0 },
        },
        { label: "Oily, thick hair", w: { Vata: 0, Pitta: 0, Kapha: 2 } },
      ],
    },
    {
      q: "Digestion & appetite",
      options: [
        {
          label: "Irregular appetite; gas/bloating",
          w: { Vata: 2, Pitta: 0, Kapha: 0 },
        },
        {
          label: "Strong appetite; gets irritable if meals delayed",
          w: { Vata: 0, Pitta: 2, Kapha: 0 },
        },
        {
          label: "Slow appetite; heaviness after meals",
          w: { Vata: 0, Pitta: 0, Kapha: 2 },
        },
      ],
    },
    {
      q: "Energy & sleep",
      options: [
        {
          label: "Variable energy; light sleeper",
          w: { Vata: 2, Pitta: 0, Kapha: 0 },
        },
        {
          label: "High drive; moderate sleep",
          w: { Vata: 0, Pitta: 2, Kapha: 0 },
        },
        {
          label: "Steady energy; deep long sleep",
          w: { Vata: 0, Pitta: 0, Kapha: 2 },
        },
      ],
    },
    {
      q: "Mind & emotions",
      options: [
        {
          label: "Worry/anxiety; quick ideas",
          w: { Vata: 2, Pitta: 0, Kapha: 0 },
        },
        {
          label: "Perfectionist; impatient",
          w: { Vata: 0, Pitta: 2, Kapha: 0 },
        },
        { label: "Calm; slow to change", w: { Vata: 0, Pitta: 0, Kapha: 2 } },
      ],
    },
    {
      q: "Bowel movements",
      options: [
        { label: "Dry/constipated", w: { Vata: 2, Pitta: 0, Kapha: 0 } },
        { label: "Loose/acidic", w: { Vata: 0, Pitta: 2, Kapha: 0 } },
        { label: "Sluggish", w: { Vata: 0, Pitta: 0, Kapha: 2 } },
      ],
    },
  ];

  const dosha = useMemo<Dosha>(() => {
    const totals = { Vata: 0, Pitta: 0, Kapha: 0 } as Record<Dosha, number>;
    answers.forEach((a, i) => {
      if (a >= 0) {
        const w = quiz[i].options[a].w;
        totals.Vata += w.Vata;
        totals.Pitta += w.Pitta;
        totals.Kapha += w.Kapha;
      }
    });
    const best = Object.entries(totals).sort(
      (a, b) => b[1] - a[1],
    )[0][0] as Dosha;
    return best;
  }, [answers]);

  return (
    <Card className="shadow-xl border border-[hsl(var(--primary)/.25)] bg-white/70 backdrop-blur-md dark:bg-card/60 rounded-2xl">
      <CardContent className="p-6 sm:p-8">
        <Tabs
          value={active}
          onValueChange={(v) => setActive(v as typeof active)}
        >
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted/50 p-1">
            <TabsTrigger
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              value="signup"
            >
              Sign up
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              value="login"
            >
              Log in
            </TabsTrigger>
          </TabsList>
          <div className="mt-4" />
          <div className="mb-3 grid grid-cols-2 gap-2">
            <Button
              variant={role === "user" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setRole("user")}
            >
              User
            </Button>
            <Button
              variant={role === "doctor" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setRole("doctor")}
            >
              Doctor
            </Button>
          </div>

          <TabsContent value="signup" className="space-y-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {role === "user" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-1">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value || "0"))}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Gender</Label>
                    <Input
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) =>
                        setWeight(parseInt(e.target.value || "0"))
                      }
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Height (cm)</Label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) =>
                        setHeight(parseInt(e.target.value || "0"))
                      }
                    />
                  </div>
                  <div className="col-span-2 grid gap-1">
                    <Label>Activity</Label>
                    <Input
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 rounded-xl border bg-muted/30 p-3">
                  <div className="mb-2 text-sm font-medium">
                    Dosha Assessment
                  </div>
                  <div className="mb-2 text-xs text-muted-foreground">
                    Answer the questions to estimate your predominant dosha.
                  </div>
                  <div className="mb-3 h-1 w-full rounded bg-muted">
                    <div
                      className="h-1 rounded bg-primary"
                      style={{ width: `${(quizStep / quiz.length) * 100}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      {quiz[quizStep].q}
                    </div>
                    <div className="grid gap-2">
                      {quiz[quizStep].options.map((o, idx) => (
                        <label
                          key={idx}
                          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-muted"
                        >
                          <input
                            type="radio"
                            name={`q-${quizStep}`}
                            checked={answers[quizStep] === idx}
                            onChange={() =>
                              setAnswers((a) => {
                                const c = [...a];
                                c[quizStep] = idx;
                                return c;
                              })
                            }
                          />
                          <span className="text-sm">{o.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuizStep((s) => Math.max(0, s - 1))}
                        disabled={quizStep === 0}
                      >
                        Back
                      </Button>
                      {quizStep < quiz.length - 1 ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            setQuizStep((s) => Math.min(quiz.length - 1, s + 1))
                          }
                          disabled={answers[quizStep] === -1}
                        >
                          Next
                        </Button>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          Result: <span className="font-semibold">{dosha}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {role === "doctor" && (
              <div className="grid gap-2">
                <Label>Qualification</Label>
                <Input
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g., BAMS, Nutritionist"
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={!!consent}
                onChange={(e) => setConsent(e.target.checked)}
              />{" "}
              I consent to storing my data locally for this demo
            </label>
            <Button
              className="w-full h-10"
              disabled={!consent}
              onClick={() =>
                onAuthed({
                  id: `u_${Date.now()}`,
                  name: name || "Guest",
                  email,
                  role,
                  dosha: role === "user" ? dosha : null,
                })
              }
            >
              Continue ({role === "user" ? `Dosha: ${dosha}` : "Doctor"})
            </Button>
          </TabsContent>

          <TabsContent value="login" className="space-y-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button
              className="w-full h-10"
              onClick={() =>
                onAuthed({
                  id: `u_${Date.now()}`,
                  name: role === "doctor" ? "Dr. Member" : "Member",
                  email,
                  role,
                  dosha: role === "user" ? "Kapha" : null,
                })
              }
            >
              Log in
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const QuizSlider: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className="grid grid-cols-3 items-center gap-2 py-1 text-sm">
      <div className="col-span-1">{label}</div>
      <input
        className="col-span-2"
        type="range"
        min={1}
        max={4}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};
