document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'today',
        center: 'title',
        right: 'prev,next'
      },
      initialDate: '2023-04-12',
      navLinks: true, // can click day/week names to navigate views
      nowIndicator: true,
  
      weekNumbers: false,
      weekNumberCalculation: 'ISO',
  
      editable: true,
      selectable: true,
      dayMaxEvents: true,
      padding: 20,
      events: [
        {
          title: 'Anniversary',
          start: '2023-04-01',
          color: '#EF4E4E'
        },
        {
          title: 'Birthday',
          start: '2023-04-07',
          end: '2023-01-10',
          color: '#00AA5D'
        },
        {
          title: 'Long Event',
          start: '2023-04-16',
          end: '2023-01-10',
          color: '#383838'
        },
        {
          title: 'Date',
          start: '2023-04-24',
          end: '2023-01-10',
          color: '#0dcaf0'
        },
      ],
    });
  
    calendar.render();
  });