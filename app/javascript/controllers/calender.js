document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var flightTableBody = document.getElementById('flight-table-body');
    var flightTable = document.getElementById('flight-table');
    var flightDetails = document.getElementById('flight-details');
    var detailsContent = document.getElementById('details-content');
    var editButton = document.getElementById('edit-button');
    var deleteButton = document.getElementById('delete-button');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      dateClick: function(info) {
        fetchFlights(info.dateStr);
      },
      dayRender: function(info) {
        // Check if there's a flight on this date and add a green dot if so
        fetch(`/flights?date=${info.dateStr}`)
          .then(response => response.json())
          .then(data => {
            if (data.flights.length > 0) {
              var dot = document.createElement('div');
              dot.style.backgroundColor = 'green';
              dot.style.borderRadius = '50%';
              dot.style.width = '10px';
              dot.style.height = '10px';
              dot.style.position = 'absolute';
              dot.style.top = '5px'; // Adjust position as needed
              dot.style.right = '5px'; // Adjust position as needed
              info.el.appendChild(dot);
            }
          });
      }
    });
  
    calendar.render();
  
    function fetchFlights(date) {
      // Fetch flights for the selected date
      fetch(`/flights?date=${date}`)
        .then(response => response.json())
        .then(data => {
          populateFlightTable(data.flights);
          flightTable.style.display = 'table'; // Show the table
        });
    }
  
    function populateFlightTable(flights) {
      flightTableBody.innerHTML = '';
      flights.forEach(flight => {
        var row = `<tr>
                     <td>${flight.date}</td>
                     <td>${flight.uav_type}</td>
                     <td>${flight.callsign}</td>
                     <td>${flight.from}</td>
                     <td>${flight.to}</td>
                     <td>${flight.mission_type}</td>
                     <td>${flight.pic}</td>
                   </tr>`;
        flightTableBody.innerHTML += row;
      });
    }
  
    window.fetchFlightDetails = function(id) {
      // Fetch flight details by ID
      fetch(`/flights/${id}`)
        .then(response => response.json())
        .then(data => {
          detailsContent.innerHTML = `
            <p>Date: ${data.flight.date}</p>
            <p>UAV Type: ${data.flight.uav_type}</p>
            <p>Callsign: ${data.flight.callsign}</p>
            <p>From: ${data.flight.from}</p>
            <p>To: ${data.flight.to}</p>
            <p>Takeoff Time: ${data.flight.takeoff_time}</p>
            <p>Landing Time: ${data.flight.landing_time}</p>
            <p>Flight Duration: ${data.flight.flight_duration} min</p>
            <p>Mission Type: ${data.flight.mission_type}</p>
            <p>PIC: ${data.flight.pic}</p>
          `;
          editButton.setAttribute('href', `/flights/${id}/edit`);
          editButton.style.display = 'inline-block';
          deleteButton.setAttribute('action', `/flights/${id}`);
          deleteButton.style.display = 'inline-block';
          flightDetails.style.display = 'block';
        });
    };
  });
  