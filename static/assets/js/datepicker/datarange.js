$(function() {
    function logDateRange(start, end) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    }

    function updateReportRange(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('input[name="daterange"]').daterangepicker({ opens: 'left' }, logDateRange);

    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: { format: 'M/DD hh:mm A' }
    });

    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function(start, end, label) {
        var years = moment().diff(start, 'years');
        alert("You are " + years + " years old!");
    });

    var start = moment().subtract(29, 'days');
    var end = moment();

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, updateReportRange);

    updateReportRange(start, end);

    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: { cancelLabel: 'Clear' }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
});



$(function() {
    $("#fp-date-time-1").flatpickr();
    $("#fp-date-time-2").flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
    $("#fp-date-time-3").flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
    $("#fp-date-time-4").flatpickr({
        minDate: "today",
        maxDate: new Date().fp_incr(14) // 14 days from now
    });
    $("#fp-date-time-5").flatpickr({
        enable: [new Date(2023, 8, 14),new Date(2023, 8, 30) ,new Date(2023, 8, 26), new Date(2023, 9, 14),new Date(2023, 10, 30) ,new Date(2023, 11, 26)]
    });
    $("#fp-date-time-6").flatpickr({
        mode: "multiple",
        dateFormat: "Y-m-d"
    });
    $("#fp-date-time-7").flatpickr({
        mode: "multiple",
        dateFormat: "Y-m-d"
    });
    $("#fp-date-time-8").flatpickr({
        wrap: true,
        altInput: true,
        dateFormat: "YYYY-MM-DD",
        altFormat: "DD-MM-YYYY",
        allowInput: true,
        parseDate: (datestr, format) => {
            return moment(datestr, format, true).toDate();
        },
        formatDate: (date, format, locale) => {
            // locale can also be used
            return moment(date).format(format);
        }
    });
});



$(document).ready(function(){
    $('#input-mask-1').mask('00/00/0000');
    $('#input-mask-2').mask('00:00:00');
    $('#input-mask-3').mask('00/00/0000 00:00:00');
    $('#input-mask-4').mask('00000-000');
    $('#input-mask-5').mask('0-00-00-00');
    $('#input-mask-6').mask('000.000.000.000.000,00', {reverse: true});
    $('#input-mask-7').mask("#.##0,00", {reverse: true});
    $('#input-mask-8').mask('0000-0000');
    $('#input-mask-9').mask('(00) 00000-0000');
    $('#input-mask-10').mask('(000) 000-0000');
    $('#input-mask-11').mask('(00) 00000-0000');
    $('#input-mask-12').mask('000.000.000-00', {reverse: true});
    $('#input-mask-13').mask('00.000.000/0000-00', {reverse: true});
    $('#input-mask-14').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
          'Z': {
            pattern: /[0-9]/, optional: true
          }
        }
    });
});
  


// TouchPin
$(function() {
    if (document.querySelector("input[data-toggle='touchspin']")) {
        $("input[data-toggle='touchspin']").TouchSpin();
    }
});