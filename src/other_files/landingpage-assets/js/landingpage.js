(function($) {
    $(document).ready(function() {
        let sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1Lu2mZ92J2Px3EoqksWlOuUWbD5VPg4JpjADZfd5TfIM/1/public/full?alt=json';
        $.getJSON(sheetUrl, function(data) {
            let res = data.feed.entry
            res.map(item => {
                if (item.gs$cell.row === '2' && item.gs$cell.col === '2') {
                    // $('.video-section__title h1').text()
                    const phrase = item.gs$cell.inputValue;
                    var word = 'you';
                    var output = phrase.replace(new RegExp('(' + word + ')'), '<span class="gradient-word">$1</span>');
                    $('.video-section__title h1').html(output);
                }
                if (item.gs$cell.row === '4' && item.gs$cell.col === '2') {
                    $('.video-section__body--list ul li:nth-child(1)').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '5' && item.gs$cell.col === '2') {
                    $('.video-section__body--list ul li:nth-child(2)').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '6' && item.gs$cell.col === '2') {
                    $('.video-section__body--list ul li:nth-child(3)').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '7' && item.gs$cell.col === '2') {
                    $('.video-section__body--list ul li:nth-child(4)').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '8' && item.gs$cell.col === '2') {
                    $('.video-section__body--list ul li:nth-child(5)').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '10' && item.gs$cell.col === '2') {
                    // $('.video-section__title h1').text()
                    const phrase = item.gs$cell.inputValue;
                    var word = 'increase ';
                    var output = phrase.replace(new RegExp('(' + word + ')'), '<span class="gradient-word">$1</span>');
                    $('.brands-section__title h2').html(output);
                }
            })
        })
    })

})(jQuery)