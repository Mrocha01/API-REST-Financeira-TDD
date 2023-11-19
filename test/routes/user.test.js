const request = require("supertest");

const app = require("../../src/app.js");

test("Deve listar todos os usuarios", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Deve inserir usuario com sucesso", () => {
  const mail = `${Date.now()}@mail.com`;
  
  return request(app)
    .post("/users")
    .send({ name: "Walter Mitty", email: mail, passwd:"12345"})
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Walter Mitty");
    });
});

test("Não deve inserir um usuario sem nome", () => {
  
  return request(app)
  .post("/users")
  .send({ email: "walter@mail.com", passwd:"12345"})
  .then((res) => {
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome é um atributo obrigatório!")
  });
});