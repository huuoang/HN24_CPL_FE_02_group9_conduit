import dateFormatter from "./dateFormatter";

it("should format date an ISO string", () => {
    const ISOString = "2020-01-01T00:00:00.000Z";
    expect(dateFormatter(date)).toBe("January 1, 2020");
});