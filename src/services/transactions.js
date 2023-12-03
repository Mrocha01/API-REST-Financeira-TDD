module.exports = (app) => {
    const find = (userId, filter = {}) => {
        return app.db("transactions")
            .join("accounts", "accounts.id", "acc_id")
                .where(filter)
                    .andWhere("accounts.user_id", "=", userId)
                        .select();
    };

    const findOne = (id) => {
        return app.db("transactions")
        .where({id})
        .first();
    }

    const save = (transaction) => {
        const newTransaction = { ...transaction };

        if((transaction.type === "I" && transaction.amount < 0) ||
        (transaction.type === "O" && transaction.amount > 0)) {
            newTransaction.amount *= -1;
        }
        
        return app.db("transactions")
        .insert(newTransaction, '*');
    };

    const updateOne = (id, transaction) => {
        return app.db('transactions')
        .where({id})
        .update(transaction, '*');
    };

    const deleteOne = (id) => {
        return app.db("transactions")
        .where({id})
        .del();
    };

    return { find, save, findOne, updateOne, deleteOne };
};