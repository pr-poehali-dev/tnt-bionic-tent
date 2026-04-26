
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Gallery from "./pages/Gallery";
import Constructor from "./pages/Constructor";
import VRTour from "./pages/VRTour";
import Contacts from "./pages/Contacts";
import Header from "@/components/Header";
import Intro from "@/components/Intro";

const queryClient = new QueryClient();

function Layout() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem("tnt_intro_date");
    if (last !== today) {
      setShowIntro(true);
    }
  }, []);

  const finishIntro = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("tnt_intro_date", today);
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-800">
      {/* Фоновый прозрачный логотип */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-0 select-none">
        <div className="font-cormorant text-center opacity-[0.04]">
          <div className="text-[18vw] leading-none font-light tracking-[0.15em] text-neutral-900">
            TRUE
          </div>
          <div className="text-[10vw] leading-none font-light tracking-[0.3em] text-neutral-700 mt-2">
            NATURE
          </div>
        </div>
      </div>

      <Header />
      <main className="relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order" element={<Order />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/constructor" element={<Constructor />} />
          <Route path="/vr-tour" element={<VRTour />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {showIntro && <Intro onFinish={finishIntro} />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
