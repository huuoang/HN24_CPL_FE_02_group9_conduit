import errorHandler from "./errorHandler";

describe("Catch error", () => {
    const errors = [401, 403, 404, 500];

    test.each(errors)("Status %p should throw error", (statusCode) => 
        {
            const resError = {
                response : new Response(null,{status:statusCode}),
            };

            expect(() => errorHandler(resError)).toThrow();
        });
});
