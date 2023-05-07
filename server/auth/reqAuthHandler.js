const modelUserRegistration = require('../models/userRegistration');

const reqAuthHandler = (req, res, next) => {
        const userID = req.session.userID;
        if (!userID) {
            res.status(401).send("User not logged in");
            return;
        }
        modelUserRegistration.findById(userID)
            .then((user) => {
                if (user === null) {
                    req.session.destroy((err) => {
                        if (err) {
                            res.status(500).send("An authentication error occurred");
                            return;
                        }
                        res.status(401).send("User not logged in");
                    });
                    return;
                }
                next();
            })
            .catch(() => {
                res.status(500).send("An authentication error occurred");
            });
}


module.exports = reqAuthHandler;