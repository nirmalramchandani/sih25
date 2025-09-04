import React from "react";
import Hero from "@/components/app/Hero";
import NavBar from "@/components/app/NavBar";
import Footer from "@/components/app/Footer";
import Testimonials from "@/components/app/Testimonials";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar onGetStarted={() => window.location.assign("/login")} onSignIn={() => window.location.assign("/login")} />

      {/* Full-screen hero with fixed background image */}
      <Hero
        onLoginUser={() => window.location.assign("/login?role=user")}
        onRegisterUser={() => window.location.assign("/login?role=user")}
        onLoginDoctor={() => window.location.assign("/login?role=doctor")}
        onRegisterDoctor={() => window.location.assign("/login?role=doctor")}
      />

      {/* Content sections without additional images */}
      <Testimonials />
      <Footer />
    </div>
  );
}
