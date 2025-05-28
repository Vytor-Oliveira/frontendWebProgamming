const { parseJwt } = require("../js/utils");

describe("parseJwt", () => {
  it("deve decodificar um token JWT válido", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJ1c2VybmFtZSI6IkpvYW8iLCJpc19hZG1pbiI6dHJ1ZX0." +
      "abc123";

    const result = parseJwt(token);
    expect(result).toEqual({ username: "Joao", is_admin: true });
  });

  it("deve retornar null se o token for inválido", () => {
    const result = parseJwt("token.invalido");
    expect(result).toBeNull();
  });
});


