const handleSignin = (postgres, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json('Wrong email or password');
    } else {
        postgres
            .select('email', 'hash')
            .from('login')
            .where({email})
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    return postgres
                        .select('*')
                        .from('users')
                        .where({email})
                        .then(user => {
                            res.json(user[0]);
                        })
                        .catch(err => res.status(400).json('Unable to get user'));
                } else {
                    res.status(400).json('Wrong email or password');
                }
            })
            .catch(err => res.status(400).json('Wrong email or password'));
    }
};

export default handleSignin;