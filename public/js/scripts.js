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
            fetch('/api/appointments/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, time })
            })
            .then(response => response.json())
            .then(data => {
                if (data.isSlotTaken) {
                    errorMessageDiv.innerHTML = 'Questo slot è già prenotato. Seleziona un altro orario.';
                    return;
                }

                // If slot is not taken, book the appointment
                fetch('/api/appointments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, date, time })
                })
                .then(response => response.json())
                .then(data => {
                    const confirmationMessage = `
                        <div class="alert alert-success" role="alert">
                            Grazie, ${name}! La tua prenotazione per il ${date} alle ${time} è stata ricevuta.
                        </div>
                    `;

                    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;
                    document.getElementById('confirmationMessage').style.display = 'block';

                    document.getElementById('bookingForm').reset();

                    displayAppointments();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    function displayAppointments() {
        fetch('/api/appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsDiv = document.getElementById('appointments');
            if (appointmentsDiv) {
                appointmentsDiv.innerHTML = '';

                data.appointments.forEach(app => {
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
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Display appointments on page load if on appointments.html
    if (document.getElementById('appointments')) {
        displayAppointments();
    }
});
