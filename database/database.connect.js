module.exports = () => {
    try {
        const mongoose = require('mongoose');
        let uri = process.env.DB_URL;
        if (process.env.APP_MODE == 'production') {
            uri = process.env.PROD_DB_URL;
            mongoose.connect(uri).then((res) => {
                console.log("Production db is connected successfully.");
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            mongoose.connect(uri).then(() => console.log("DB connected successfully.")).catch((err) => console.log(err));
        }
    }
    catch (err) {
        console.log(err);
    }
}