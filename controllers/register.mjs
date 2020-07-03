const handleRegister = (postgres, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    if (!name || !email || !password) {
        res.status(400).json('Please enter valid credentials');
    } else {
        postgres.transaction(trx => {
            trx.insert({
                hash,
                email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => res.json(user[0]));
                })
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .catch(err => res.status(400).json('Unable to register'));
    }
};

export default handleRegister;