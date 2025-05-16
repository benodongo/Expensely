$(document).ready( function () {
    $('#d2c_advanced_table').DataTable();


    $('#d2c_advanced_table_2').DataTable({
        dom: "<'row align-items-center mb-2'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: [
            {
                extend: 'colvis',
                className: 'btn d2c_filter_btn',
                text: '<i class="fas fa-sliders-h"></i> Filter',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdf',
                className: 'btn d2c_pdf_btn',
                text: '<i class="fas fa-file-pdf"></i>',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'print',
                className: 'btn d2c_danger_print_btn',
                text: '<i class="fas fa-print"></i>',
                exportOptions: {
                    columns: ':visible' 
                }
            }
        ]
    });

    function dataTable_3() {
        // Check if the element with the ID exists
        if ($('#d2c_advanced_table_3').length === 0) {
            console.error("Element with ID 'd2c_advanced_table_3' not found.");
            return;
        }
    
        var table = $('#d2c_advanced_table_3').DataTable();
    
        new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'print',
                    className: 'btn d2c_danger_print_btn',
                    text: '<i class="fas fa-print"></i>',
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ]
        });
    
        table.buttons(0, null).container().prependTo(
            table.table().container()
        );
        var d2c_advanced_table_3 = '#d2c_advanced_table_3' + '_wrapper';
        $(d2c_advanced_table_3 + ' .dt-buttons').css('float', 'left').css('margin-right', '5px');
        $(d2c_advanced_table_3 + ' .row.dt-row').css('width', '100%');
    }
    
    if ($('#d2c_advanced_table_3').length > 0) {
        dataTable_3();
    }
});