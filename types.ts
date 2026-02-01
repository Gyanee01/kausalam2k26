
export type EventCategory = 'Technical' | 'Cultural' | 'Sports' | 'Workshops';

export interface FestEvent {
  id: string;
  name: string;
  category: EventCategory;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  icon: string;
  gridSpan: 'small' | 'medium' | 'large';
  registrationUrl: string;
}
