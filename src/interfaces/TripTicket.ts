// đây là vé bán xe bus
export interface TripTicket {
  tripCarId: number;
  tripName: string;
  departureDate: string;
  departureTime: string;
  departureEndTime: string;
  pickupPoint: string;
  payPonit: string;
  seatNumber: number;
  emptySeatNumber: number;
  priceSeatNumber: number;
  fullName?: string;
  phoneNumber?: string;
  rickshawId?: number;
}

