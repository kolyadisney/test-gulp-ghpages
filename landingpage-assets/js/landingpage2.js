(function($) {
    $(document).ready(function() {
        let sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1Lu2mZ92J2Px3EoqksWlOuUWbD5VPg4JpjADZfd5TfIM/1/public/full?alt=json';
        $.getJSON(sheetUrl, function(data) {
            let res = data.feed.entry
            $('.testimonials-slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                infinite: false,
                // cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cssEase: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
                speed: 500,
                responsive: [{
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            })
            $('.slider-loader').fadeOut();
            $('.testimonial-section').css('min-height', '1px');
            res.map(item => {
                if (item.gs$cell.row === '2' && item.gs$cell.col === '3') {
                    // $('.video-section__title h1').text()
                    const phrase = item.gs$cell.inputValue;
                    var word = 'your';
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
                if (item.gs$cell.row === '10' && item.gs$cell.col === '3') {
                    // $('.video-section__title h1').text()
                    const phrase = item.gs$cell.inputValue;
                    var word = 'increase ';
                    var output = phrase.replace(new RegExp('(' + word + ')'), '<span class="gradient-word">$1</span>');
                    $('.brands-section__title h2').html(output);
                }

                //testimonials
                //slide1
                if (item.gs$cell.row === '14' && item.gs$cell.col === '3') {
                    $('.testimonials-slider .slick-slide:nth-child(1) .slide-text p').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '14' && item.gs$cell.col === '4') {
                    $('.testimonials-slider .slick-slide:nth-child(1) .slide-author h3').text(item.gs$cell.inputValue)
                }
                //slide2
                if (item.gs$cell.row === '15' && item.gs$cell.col === '3') {
                    $('.testimonials-slider .slick-slide:nth-child(2) .slide-text p').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '15' && item.gs$cell.col === '4') {
                    $('.testimonials-slider .slick-slide:nth-child(2) .slide-author h3').text(item.gs$cell.inputValue)
                }
                //slide3
                if (item.gs$cell.row === '16' && item.gs$cell.col === '3') {
                    $('.testimonials-slider .slick-slide:nth-child(3) .slide-text p').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '16' && item.gs$cell.col === '4') {
                    $('.testimonials-slider .slick-slide:nth-child(3) .slide-author h3').text(item.gs$cell.inputValue)
                }
                //slide4
                if (item.gs$cell.row === '17' && item.gs$cell.col === '3') {
                    $('.testimonials-slider .slick-slide:nth-child(4) .slide-text p').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '17' && item.gs$cell.col === '4') {
                    $('.testimonials-slider .slick-slide:nth-child(4) .slide-author h3').text(item.gs$cell.inputValue)
                }
                //slide5
                if (item.gs$cell.row === '18' && item.gs$cell.col === '3') {
                    $('.testimonials-slider .slick-slide:nth-child(5) .slide-text p').text(item.gs$cell.inputValue)
                }
                if (item.gs$cell.row === '18' && item.gs$cell.col === '4') {
                    $('.testimonials-slider .slick-slide:nth-child(5) .slide-author h3').text(item.gs$cell.inputValue)
                }
            })
        })
    })

})(jQuery)