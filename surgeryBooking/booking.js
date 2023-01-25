const express = require('express');
const app = express();

let currentBooking = {}; // variable to store current booking

// endpoint for booking an operating room
app.get('/bookingkamaroperasi/:bookingdate/:durasi;', (req, res) => {
    const bookingDate = new Date(req.params.bookingdate);
    const duration = parseInt(req.params.duration);
    let available = true;

    if (currentBooking.bookingDate) {
        const endTime = new Date(currentBooking.bookingDate);
        endTime.setHours(endTime.getHours() + currentBooking.duration);

        if (bookingDate < endTime || endTime.getTime() + 2*60*60*1000 > bookingDate.getTime()) {
            available = false;
        }
    }

    if (available) {
        currentBooking = { bookingDate: bookingDate, duration: duration };
        res.send(true);
    } else {
        res.send(false);
    }
});

app.listen(8080, () => {
    console.log('Booking room scheduling API listening on port 8080!');
});
