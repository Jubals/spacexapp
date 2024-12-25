export interface Launch {
    id: string;
    flight_number: number;
    name: string;
    date: string;
    success: boolean | null;
    rocketName: string;
  }