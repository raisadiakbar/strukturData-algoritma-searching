const express = require('express');
const app = express();

app.get('/calculateage/:dateofbirth', (req, res) => {
    const dateOfBirth = new Date(req.params.dateofbirth);
    const today = new Date();
    let age = today - dateOfBirth;

    age = new Date(age);

    const ageInYears = age.getUTCFullYear() - 1970;
    const ageInMonths = age.getUTCMonth();
    const ageInDays = age.getUTCDate()-1;

    res.send({
        "umur": {
            "year": ageInYears,
            "month": ageInMonths,
            "day": ageInDays
        }
    });
});

app.listen(8080, () => {
    console.log('Age calculation API listening on port 8080!');
});
