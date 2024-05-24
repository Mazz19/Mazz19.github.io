document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            const errorMessageDiv = document.getElementById('errorMessage');
            errorMessageDiv.innerHTML = '';  // Clear previous error message

            if (!time) {
                errorMessageDiv.innerHTML = 'Per favore, seleziona un\'ora.';
                return;
            }

            // Check if the appointment slot is already taken
            const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            const isSlotTaken = existingAppointments.some(app => app.date === date && app.time === time);

            if (isSlotTaken) {
                errorMessageDiv.innerHTML = 'Questo slot è già prenotato. Seleziona un altro orario.';
                return;
            }

            const newAppointment = { name, email, date, time };
            existingAppointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(existingAppointments));

            const confirmationMessage = `
                <div class="alert alert-success" role="alert">
                    Grazie, ${name}! La tua prenotazione per il ${date} alle ${time} è stata ricevuta.
                </div>
            `;

            document.getElementById('confirmationMessage').innerHTML = confirmationMessage;
            document.getElementById('confirmationMessage').style.display = 'block';

            document.getElementById('bookingForm').reset();

            displayAppointments();
        });
    }

    function displayAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const appointmentsDiv = document.getElementById('appointments');
        if (appointmentsDiv) {
            appointmentsDiv.innerHTML = '';

            appointments.forEach(app => {
                const appointmentCard = `
                    <div class="appointment-card">
                        <h5>${app.name}</h5>
                        <p>Email: ${app.email}</p>
                        <p>Data: ${app.date}</p>
                        <p>Ora: ${app.time}</p>
                    </div>
                `;
                appointmentsDiv.innerHTML += appointmentCard;
            });
        }
    }

    // Display appointments on page load if on appointments.html
    if (document.getElementById('appointments')) {
        displayAppointments();
    }
});
