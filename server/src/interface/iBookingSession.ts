export interface BookingSession {
    hotel: {
      id: string;
      name: string;
    };
    checkIn: Date;
    checkOut: Date;
    rooms: {
      index: number;
      roomTypeId: string;
      roomTypeName: string;
      guests: {
        adults: number;
        children: number;
        infants: number;
      };
      price: number;
    }[];
    totalPrice: number;
    extraAdultPrice: number;
    extraChildPrice: number;
    createdAt: Date;
    expiresAt: Date;
  }
  declare module 'express-session' {
    interface SessionData {
      booking?: BookingSession;
    }
  }