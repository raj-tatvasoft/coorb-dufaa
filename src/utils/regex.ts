export const regex = {
  Integer: /^-?\d*$/,
  Decimal: /^\d*\.?\d*$/,
  SaudiMobNo: /^(\+966|966)?5\d{8}$/,
  Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/,
};
