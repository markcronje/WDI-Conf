var price = 15; //price
$(document).ready(function() {
    var $cart = $('#selected-seats'), //Sitting Area
        $counter = $('#counter'), //Votes
        $total = $('#total'); //Total money
    var seatstaken = [];

    var sc = $('#seat-map').seatCharts({
        map: [ //Seating charts
            'a[,A1]a[,A2]a[,A3]a[,A4]a[,A5]a[,A6]a[,A7]a[,A8]a[,A9],a[,A10]',
            'a[,B1]a[,B2]a[,B3]a[,B4]a[,B5]a[,B6]a[,B7]a[,B8]a[,B9]a[,B10]',
            'a[,C1]a[,C2]a[,C3]a[,C4]a[,C5]a[,C6]a[,C7]a[,C8]a[,C9]a[,C10]',
            'a[,D1]a[,D2]a[,D3]a[,D4]a[,D5]a[,D6]a[,D7]a[,D8]a[,D9]a[,D10]',
            'a[,E1]a[,E2]a[,E3]a[,E4]a[,E5]a[,E6]a[,E7]a[,E8]a[,E9]a[,E10]',
            'a[,F1]a[,F2]a[,F3]a[,F4]a[,F5]a[,F6]a[,F7]a[,F8]a[,F9]a[,F10]',
            'a[,G1]a[,G2]a[,G3]a[,G4]a[,G5]a[,G6]a[,G7]a[,G8]a[,G9]a[,G10]'
        ],

        // 'a[ID,LABEL]a[ID2,LABEL2]a___a[JUST_ID1]aa',

        naming: {
            top: false,
            getLabel: function(character, row, column) {
                return column;
            }
        },
        legend: { //Definition legend
            node: $('#legend'),
            items: [
                ['a', 'available', 'Available'],
                ['a', 'unavailable', 'Sold']
            ]
        },
        click: function() { //Click event
            console.log(this.settings.row + " " + this.settings.label);
            console.log(this.status());
            if (this.status() == 'available') { //optional seat

                $('<li>R' + (this.settings.row + 1) + ' S' + this.settings.label + '</li>')
                    .attr('id', 'cart-item-' + this.settings.id)
                    .data('seatId', this.settings.id)
                    .appendTo($cart);

                $counter.text(sc.find('selected').length + 1);
                $total.text(recalculateTotal(sc) + price);
                seatstaken.push(this.settings.row + " " + this.settings.label);
                return 'selected';
            } else if (this.status() == 'selected') { //Checked
                //Update Number
                $counter.text(sc.find('selected').length - 1);
                //update totalnum
                $total.text(recalculateTotal(sc) - price);

                //Delete reservation
                $('#cart-item-' + this.settings.id).remove();
                //optional
                return 'available';
            } else if (this.status() == 'unavailable') { //sold
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });
    //sold seat
    sc.get(['1_2', '4_4', '4_5', '6_6', '6_7', '8_5', '8_6', '8_7', '8_8', '10_1', '10_2']).status('unavailable');
});
//sum total money

function recalculateTotal(sc) {
    var total = 0;
    sc.find('selected').each(function() {
        total += price;
    });
    return total;
}

$('.checkout-button').on('click', function() {
    console.log("Click event of the button");
});
