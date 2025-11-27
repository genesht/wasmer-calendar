import type { RawEvent,PositionedEvent } from "./types";

const DAY_WIDTH = 600;
const DAY_HEIGHT = 720;

function createLayout(events: RawEvent[]): PositionedEvent[] {
    // Implementation of the layout algorithm goes here
    if (!events || events.length === 0) {
        return [];
    }   
    const items = events.map((event, index) => ({
        ...event,
        id: index,     })) as PositionedEvent[];

    items.sort((a, b) => a.start - b.start || a.end - b.end);

    const groups: PositionedEvent[][] = [];
    let currentGroup: PositionedEvent[] = [items[0]];
    let groupEnd = items[0].end;

    for (let i = 1; i < items.length; i++) {
        const evnt = items[i];
        if (evnt.start < groupEnd) {
            currentGroup.push(evnt);
            groupEnd = Math.max(groupEnd, evnt.end);
        } else {
            groups.push(currentGroup);
            currentGroup = [evnt];
            groupEnd = evnt.end;
        }
    }
    groups.push(currentGroup);
    // overlapping events A: 9:00–10:00 B: 9:30–11:00 C: 11:30–12:30 [ A, B ][ C ]

    const positionedItems: PositionedEvent[] = [];

    groups.forEach(group => {      
        const columns: PositionedEvent[][] = [];
        group.forEach(evnt => {
            let placed = false; 
            for (let i=0; i < columns.length; i++) {
                const col = columns[i];
                const lastInCol = col[col.length - 1];
                if (evnt.start >= lastInCol.end) {
                    col.push(evnt);
                    evnt.col = i;
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                columns.push([evnt]);
                evnt.col = columns.length - 1;
            }
        });

        // For example, for events A, B, C: col0: A, C col1: B  
        const container = document.querySelector(".calendar-events-column") as HTMLElement;
        const containerWidth = container?.clientWidth || DAY_WIDTH;
        const colWidth = containerWidth / columns.length;

        group.forEach(evnt => {
            positionedItems.push({
                ...evnt,
                width: colWidth,
                left: evnt.col * colWidth,
                top: (evnt.start / DAY_HEIGHT) * DAY_HEIGHT,
                height: ((evnt.end - evnt.start) / DAY_HEIGHT) * DAY_HEIGHT,
            });
        });
    });

    return positionedItems;           

}

export function layOutDay(events: RawEvent[]): PositionedEvent[] {
    const layout = createLayout(events);
    (window as any).__calendarEvents = layout;
    window.dispatchEvent(new Event("calendar-updated"));
    return layout;
}

(window as any).__layOutDay = layOutDay;