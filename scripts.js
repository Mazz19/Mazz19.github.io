document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const confirmationMessage = `
        <div class="alert alert-success" role="alert">
            Grazie, ${name}! La tua prenotazione per il ${date} alle ${time} è stata ricevuta.
        </div>
    `;

    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;
    document.getElementById('confirmationMessage').style.display = 'block';

    document.getElementById('bookingForm').reset();
});
