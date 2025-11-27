import { useEffect, useState } from "react";
import "./calendar.css";
import Event from "./Event";
import type { PositionedEvent } from "./types";

export default function Calendar() {
    const [events, setEvents] = useState<PositionedEvent[]>([]);
    const [nowOffset, setNowOffset] = useState<number | null>(null); // plus: actualHours
    
    useEffect(() => {
        const updateEvents = () => {
            const evnts = (window as any).__calendarEvents as PositionedEvent[] || [];
            setEvents(evnts);
        };

        window.addEventListener("calendar-updated", updateEvents);
        updateEvents();

        return () => window.removeEventListener("calendar-updated", updateEvents);
    }, []);

    useEffect(() => {
        const updateNow = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();   

            const offset = ((hours - 9) * 60) + minutes; // since 9 AM
            if (offset >= 0 && offset <= 720) {
                setNowOffset(offset);
            } else {
                setNowOffset(null);
            }
        };
        updateNow();
        const id = setInterval(updateNow, 60 * 1000); // update every minute
        return () => clearInterval(id);
    }, []);

    return (
        <div className="calendar-container">
            <div className="calendar-time-column">
                {Array.from({ length: 12 }).map((_, i) => {
                const hour = 9 + i;
                const label = hour < 12 ? `${hour}:00` : `${hour - 12}:00`;
                const suffix = hour < 12 ? "AM" : "PM";

                return (
                    <div key={hour} className="calendar-time-slot">
                    <div className="calendar-time-label">
                        {label} <span className="calendar-time-suffix">{suffix}</span>
                    </div>
                    </div>
                );
                })}
            </div>

            <div className="calendar-events-column">
                <div className="calendar-events-grid">
                    {nowOffset !== null && (
                        <div
                        className="calendar-now-line"
                        style={{ top: nowOffset }}
                        >
                        <span className="calendar-now-label">Now</span>
                        </div>
                    )}
                    {events.map(ev => (
                        <Event key={ev.id} event={ev} />
                    ))}
                </div>
            </div>
        </div>
    );
}