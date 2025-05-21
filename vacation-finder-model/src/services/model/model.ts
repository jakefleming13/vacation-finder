//interface to allow the front-end to communicate with the backend
export interface VacationEntry {
  id: string;
  location: string;
  name: string;
  photoUrl?: string;
}
