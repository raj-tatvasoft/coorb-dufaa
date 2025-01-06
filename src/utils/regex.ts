export const regex = {
  Integer: /^-?\d*$/,
  MobileNo: /^\+?\d*$/,
  PositiveNo: /^\d*$/,
  Decimal: /^\d*\.?\d*$/,
  SaudiMobNo: /^(\+966|966)?5\d{8}$/,
  Password:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/,
  Expenses: /^(?!-)([0-9]+(\.[0-9]+)?)$/,
};
