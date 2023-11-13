const supertest = require("supertest");

const request = supertest("http://localhost:3001");

test("Deve responder na porta 3001", () => {
  // acessar a url http://localhost:3001
  // verificar a resposta 200

  return request.get("/").then((res) => {
    expect(res.status).toBe("200");
  });
});
