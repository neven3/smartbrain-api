const handleProfile = postgres => (req, res) => {
    const { id } = req.params;

    postgres
        .select('*')
        .from('users')
        .where({ id })
        .then(response => {
            if (response.length === 0) res.status(400).json('User not found');
            else res.json(response[0]);
        })
        .catch(err => res.status(400).json('Something went wrong'));
};

export default handleProfile;