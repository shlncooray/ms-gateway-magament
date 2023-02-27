import { validateIPv4Address } from "./util";

describe("validateIPv4Address", () => {
  const validExpected = { isValid: true, message: null };
  const inValidExpected = { isValid: false, message: "Invalid IPv4 Address" };
  it("should be equal to return { isValid: true, message: null } with a valid ipv4address", () => {
    const ipv4Address = "100.1.0.144";

    const actual = validateIPv4Address(ipv4Address);

    expect(actual).toEqual(validExpected);
  });

  it("should be equal to return { isValid: true, message: 'Invalid IPv4 Address' } with a valid ipv4address", () => {
    const ipv4Address = "100.1.0.1444";

    const actual = validateIPv4Address(ipv4Address);

    expect(actual).toEqual(inValidExpected);
  });

  it("should be equal to return { isValid: true, message: null } with a valid ipv4address", () => {
    const ipv4Address = "255.255.255.255";

    const actual = validateIPv4Address(ipv4Address);

    expect(actual).toEqual(validExpected);
  });

  it("should be equal to return { isValid: true, message: 'Invalid IPv4 Address' } with a valid ipv4address", () => {
    const ipv4Address = "255.255.255.256";

    const actual = validateIPv4Address(ipv4Address);

    expect(actual).toEqual(inValidExpected);
  });
});
