// Table types
export const TABLE_TYPES = {
  STANDARD: 'Standard',
  VIP: 'VIP',
  PREMIUM: 'Premium',
};

// Table status
export const TABLE_STATUS = {
  AVAILABLE: 'Available',
  UNAVAILABLE: 'Unavailable',
};

// Booking status
export const BOOKING_STATUS = {
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
};

// Payment methods
export const PAYMENT_METHODS = {
  CASH: 'Cash',
  GCASH: 'GCash',
};

// Time slots (24-hour format)
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

// Duration options (in hours)
export const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6];

// Add-ons
export const ADDONS = [
  { id: 1, name: 'Extra Cue Stick', price: 50 },
  { id: 2, name: 'Chalk Set', price: 30 },
  { id: 3, name: 'Ball Set Upgrade', price: 100 },
  { id: 4, name: 'Refreshments Package', price: 200 },
];
