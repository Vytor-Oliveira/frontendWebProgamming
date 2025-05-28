const { cadastrarUsuario } = require("../js/cadastro");

beforeEach(() => {
  fetch.resetMocks();
});

describe("cadastrarUsuario", () => {
  it("deve enviar dados e retornar resposta", async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: "Cadastro realizado" }), {
      status: 200,
    });

    const result = await cadastrarUsuario({
      nome: "João",
      email: "joao@teste.com",
      senha: "123456",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://puffwear.up.railway.app/cadastro",
      expect.objectContaining({ method: "POST" })
    );

    expect(result).toEqual({ message: "Cadastro realizado" });
  });
});
