import type { PositionedEvent } from "./types";

interface EventProps {
    event: PositionedEvent;
}

export function formatCompact(mins: number): string {
  const base = new Date(0, 0, 0, 9, 0); // 9:00 AM
  const date = new Date(base.getTime() + mins * 60000);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Event({ event }: EventProps) {
    const {top, left, width, height} = event;
    const start = formatCompact(event.start);
    const end = formatCompact(event.end);

    return (
        <div
            className="calendar-event"
            style={{ 
                top, 
                left, 
                width: width - 8,
                height 

            }}
        >
            <div className="calendar-event-title">Event</div>
            <div className="calendar-event-location">
                {start} – {end}
            </div>
        </div>
    );
}   