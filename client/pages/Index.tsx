import React from "react";
import Hero from "@/components/app/Hero";
import NavBar from "@/components/app/NavBar";
import Footer from "@/components/app/Footer";
import Testimonials from "@/components/app/Testimonials";

export default function Index() {
  const bgUrl = "https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg";
  return (
    <div
      className="min-h-screen w-full bg-fixed bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <NavBar onGetStarted={() => window.location.assign("/login")} onSignIn={() => window.location.assign("/login")} />

      <Hero
        onLoginUser={() => window.location.assign("/login?role=user")}
        onRegisterUser={() => window.location.assign("/login?role=user")}
        onLoginDoctor={() => window.location.assign("/login?role=doctor")}
        onRegisterDoctor={() => window.location.assign("/login?role=doctor")}
      />

      <Testimonials />
      <Footer />
    </div>
  );
}
