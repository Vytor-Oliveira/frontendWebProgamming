const { realizarLogin } = require("../js/login");

beforeEach(() => {
  fetch.resetMocks();
});

describe("realizarLogin", () => {
  it("deve autenticar usuário e retornar token", async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: "123.abc.456" }), {
      status: 200,
    });

    const result = await realizarLogin("joao@teste.com", "123456");

    expect(result.token).toBe("123.abc.456");
  });
});
