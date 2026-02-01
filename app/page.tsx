"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { FestEvent } from "@/types";
import { EVENTS as STATIC_EVENTS } from "@/constants";

// Dynamic imports for code splitting
const HomePage = dynamic(() => import("@/app/views/HomePage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const EventsPage = dynamic(() => import("@/app/views/EventsPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const EventDetailsPage = dynamic(() => import("@/app/views/EventDetailsPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const TeamPage = dynamic(() => import("@/app/views/TeamPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const SchedulePage = dynamic(() => import("@/app/views/SchedulePage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const HelpPage = dynamic(() => import("@/app/views/HelpPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const LegalPage = dynamic(() => import("@/app/views/LegalPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const AdminPage = dynamic(() => import("@/app/views/AdminPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});
const GalleryPage = dynamic(() => import("@/app/views/GalleryPage"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
});

export type Page =
  | "home"
  | "events"
  | "event-details"
  | "team"
  | "schedule"
  | "help"
  | "privacy"
  | "terms"
  | "cookies"
  | "admin"
  | "gallery";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedEventId]);

  useEffect(() => {
    const eventsRef = ref(db, "events");
    const unsubscribe = onValue(
      eventsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedEvents: FestEvent[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          fetchedEvents.sort((a, b) => a.name.localeCompare(b.name));
          setEvents(fetchedEvents);
        } else {
          setEvents(STATIC_EVENTS);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching events:", error);
        setEvents(STATIC_EVENTS);
        setLoading(false);
      },
    );

    return () => {};
  }, []);

  const navigateTo = (page: Page, eventId?: string) => {
    if (eventId) {
      setSelectedEventId(eventId);
    }
    setCurrentPage(page);
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />

      <main className="pt-20">
        {currentPage === "home" && (
          <HomePage
            events={events}
            onExplore={() => navigateTo("events")}
            onSelectEvent={(id) => navigateTo("event-details", id)}
            onSeeAll={() => navigateTo("events")}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === "events" && (
          <EventsPage
            events={events}
            onSelectEvent={(id) => navigateTo("event-details", id)}
          />
        )}

        {currentPage === "event-details" && selectedEvent && (
          <EventDetailsPage
            event={selectedEvent}
            onBack={() => navigateTo("events")}
          />
        )}

        {currentPage === "team" && <TeamPage />}

        {currentPage === "gallery" && <GalleryPage />}

        {currentPage === "schedule" && <SchedulePage />}

        {currentPage === "help" && <HelpPage />}

        {currentPage === "admin" && <AdminPage events={events} />}

        {(currentPage === "privacy" ||
          currentPage === "terms" ||
          currentPage === "cookies") && <LegalPage type={currentPage} />}

        {/* Global Newsletter / Footer CTA */}
        <section className="py-24 px-6 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-6 font-space uppercase">
            Stay In The Loop
          </h3>
          <p className="text-gray-400 mb-10 text-lg">
            Subscribe to get notifications about event registrations, schedules,
            and pro-night reveals.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-red-500 transition-colors text-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-500 transition-all"
            >
              Notify Me
            </button>
          </form>
        </section>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
