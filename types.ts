export type StaffMenu = {
  staff: string;
  id: string | number;
  color?: string;
};

export type Shift = {
  staffId: number;
  start: any;
  end: any;
  title: string | number;
  type?: string; //* used to swap with title in db for better readability (title = "Jake C", we already know that with staffId, but fullCalendar format is weird)
  borderColor?: string;
  backgroundColor?: string;
  findId?: string; //* used for editing deleting shifts only in batch phase (remove before sending to server)
};

export type Staff = {
  id: number;
  name: string;
  admin: boolean;
  phone?: string;
  avatar?: string;
  email?: string;
  color?: string;
};

export type Event = {
  id: number;
  title: string;
  allDay?: boolean;
  date: string;
  start: string;
  end: string;
  backgroundColor: string;
  type: string;
};

export type TimeOff = {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  backgroundColor: string;
  staffId: number;
  allDay: boolean;
  requestedOffDays: string;
};

export type User = {
  name: string;
  email: string;
  image: string;
  staffId: number;
  admin: boolean;
};

export type Session = {
  user: User;
};

export type Settings = {
  defaultStart: Date | string;
  defaultEnd: Date | string;
  defaultStartWeekend: Date | string;
};
