export interface RawEvent {
  // event initial properties 
  start: number;
  end: number;
}

export interface PositionedEvent extends RawEvent {
  // event after layout properties
  id: number;
  col: number; 
  width: number; 
  left: number;
  top: number;
  height: number;
}