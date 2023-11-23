const ValidationError = require('../errors/ValidatonError');

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select(["id", "name","email"]);
    };

    const save = async (user) => {
        if(!user.name) {
            throw new ValidationError("Nome é um atributo obrigatório!");
        }
        if(!user.email) {
            throw new ValidationError("Email é um atributo obrigatório!");
        }
        if(!user.passwd) {
            throw new ValidationError("Senha é um atributo obrigatório!");
        }

        const userDb = await findAll({email: user.email}) 

        if(userDb && userDb.length > 0) {
            throw new ValidationError("E-mail já cadastrado!");
        }

        return app.db('users').insert(user, ["id", "name","email"]);
    };

    return { findAll, save };
};