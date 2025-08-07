"use client"
import ConferenceHero from "@/components/conferencia/Hero";
import ConferenceSpeakers from "@/components/conferencia/Speakrs";
import ConferenceForm from "@/components/conferencia/Form";

export default function Home() {
    return (
        <div className="min-h-screen bg-conference-navy text-white">
            <ConferenceHero />
            <ConferenceSpeakers />
            <ConferenceForm />
        </div>
    );
}