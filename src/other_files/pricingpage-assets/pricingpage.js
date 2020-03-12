(function($) {
    $(document).ready(function() {


        let pricePer100Sessions = 0;
        //get price from google sheet
        let sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1Yjg_Pk6GGwlERB1kDdS_h0DupyKDJJAapc_aKTagPUg/1/public/full?alt=json';
        $.getJSON(sheetUrl, function(data) {
            let res = data.feed.entry
            res.map(item => {
                //addons price
                if (item.gs$cell.row === "8" && item.gs$cell.col === "2") {
                    let addonCurrentAPIPrice = parseInt(item.gs$cell.numericValue).toFixed(0);
                    $('.addons-inner .addons-item .item-price strong span').text(addonCurrentAPIPrice)
                }
                //startup plan price
                if (item.gs$cell.row === "4" && item.gs$cell.col === "2") {
                    let startupPackagePrice = parseInt(item.gs$cell.numericValue).toFixed(0);
                    $('.card1 .card-plan-price').val(startupPackagePrice);
                }
                //startup lead price
                if (item.gs$cell.row === "4" && item.gs$cell.col === "3") {
                    let startupLeadPrice = parseInt(item.gs$cell.numericValue).toFixed(0);
                    $('.card1 .lead-price').val(startupLeadPrice);
                }
                //growth plan price
                if (item.gs$cell.row === "5" && item.gs$cell.col === "2") {
                    let growthPackagePrice = parseInt(item.gs$cell.numericValue).toFixed(0);
                    $('.card2 .card-plan-price').val(growthPackagePrice);
                }
                //growth lead price
                if (item.gs$cell.row === "1" && item.gs$cell.col === "2") {
                    pricePer100Sessions = parseInt(item.gs$cell.numericValue).toFixed(0);
                    $('.sessions-slider .sessions-info .price-info span strong').text(pricePer100Sessions);
                    $('.right-pricing-side .total-row-right .session-limit strong span, .mobile-fixed-total .total-row-right .session-limit strong span').text(pricePer100Sessions);
                }
                calcSupportPlanPrice();
                calcTotalSum();
                calcMobileTotalSum();
                // console.log(item.gs$cell)
            })
        })


        let sessionPriceForTotal;
        let planPriceForTotal;
        let totalPriceVal;
        let addonPriceForTotal = 0;
        let mobileSessionPriceForTotal;
        let mobilePlanPriceForTotal;
        let mobileTotalPriceVal;
        let mobileAddonPriceForTotal = 0;

        function calcTotalSum() {
            sessionPriceForTotal = parseInt($('.right-pricing-side .session-price').text())
            planPriceForTotal = parseInt($('.right-pricing-side .plan-price strong span').text())
            if ($('.right-pricing-side .total-addons-wrapper .total-addon-item').length !== 0) {
                let addonPrice;
                let total = 0;
                $('.right-pricing-side .total-addons-wrapper .total-addon-item .total-row-right strong span').each(function() {
                    addonPrice = parseInt($(this).text());
                    total += addonPrice;
                })
                addonPriceForTotal = total;
            } else {
                addonPriceForTotal = 0;
            }
            totalPriceVal = sessionPriceForTotal + planPriceForTotal + addonPriceForTotal;
            $('.right-pricing-side .main-total-value').text(totalPriceVal);
        }

        function calcMobileTotalSum() {
            mobileSessionPriceForTotal = parseInt($('.mobile-fixed-total .session-price').text())
            mobilePlanPriceForTotal = parseInt($('.mobile-fixed-total .plan-price strong span').text())
            if ($('.mobile-fixed-total .total-addons-wrapper .total-addon-item').length !== 0) {
                let mobileAddonPrice;
                let mobileTotal = 0;
                $('.mobile-fixed-total .total-addons-wrapper .total-addon-item .total-row-right strong span').each(function() {
                    mobileAddonPrice = parseInt($(this).text());
                    mobileTotal += mobileAddonPrice;
                })
                mobileAddonPriceForTotal = mobileTotal;
            } else {
                mobileAddonPriceForTotal = 0;
            }
            mobileTotalPriceVal = mobileSessionPriceForTotal + mobilePlanPriceForTotal + mobileAddonPriceForTotal;
            $('.mobile-fixed-total .main-total-value').text(mobileTotalPriceVal);
        }



        $('.js-range-slider').ionRangeSlider({
            type: "single",
            min: 0,
            max: 500000,
            from: 100000,
            to: 10000,
            grid: false,
            step: 10000,
            onChange: function(data) {
                let sessionsNumber = data['input'].val();
                let sessionsRate = sessionsNumber / 100000;
                let sessionsTotalPrice = Math.ceil(sessionsRate) * pricePer100Sessions;
                $('.sessions-slider .sessions-info .leads-info strong').text(sessionsNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                if (sessionsTotalPrice === 0 && sessionsNumber < 500000) {
                    $('.sessions-slider .sessions-info .price-info span strong').text('50');
                    $('.right-pricing-side .total-card .user-session .session-pricing, .mobile-fixed-total .total-card .user-session .session-pricing').text(sessionsNumber / 1000);
                    $('.right-pricing-side .total-row-right .session-limit strong span, .mobile-fixed-total .total-row-right .session-limit strong span').text('50');
                } else if (sessionsNumber < 500000 && sessionsTotalPrice > 0) {
                    $('.sessions-slider .sessions-info .price-info span strong').text(sessionsTotalPrice);
                    $('.right-pricing-side .total-card .user-session .session-pricing, .mobile-fixed-total .total-card .user-session .session-pricing').text(sessionsNumber / 1000);
                    $('.right-pricing-side .total-row-right .session-limit strong span, .mobile-fixed-total .total-row-right .session-limit strong span').text(sessionsTotalPrice);
                }
                if (sessionsNumber === '500000') {
                    $('.info-unlimit').show();
                    $('.info-limit').hide();
                    $('.total-card .total-footer .total-btn.trial-btn').css('display', 'none');
                    $('.total-card .total-footer .total-btn.talk-btn').css('display', 'block');
                    $('.sessions-slider .sessions-info .leads-info strong').text('unlimited');
                    $('.total-card .session-limit .total-row-value').hide();
                    $('.sessions-slider .irs--flat .irs-single').text('unlimited');
                    if ($('.total-card.custom-total').length === 0) {
                        $('.total-card .plan-price strong:nth-child(1)').hide();
                        $('.total-card .user-session .session-limit .user-session-count').hide();
                        $('.total-card .user-session .total-row-right .session-limit strong:nth-child(1)').hide();
                        $('.total-card .main-total strong:nth-child(2)').hide();
                    }
                    if ($('.custom-price').length === 0) {
                        $('.total-card .user-session .session-limit').append('<strong class="custom-price">custom</strong>');
                        $('.total-card .plan-price').append('<strong class="custom-price">custom</strong>');
                        $('.total-carde .main-total').append('<strong class="custom-price">custom</strong>');
                    }
                    $('.total-card').addClass('custom-total');
                } else {
                    $('.info-unlimit').hide();
                    $('.info-limit').show();
                    $('.total-card .plan-price strong:nth-child(1)').show();
                    $('.total-card .user-session .session-limit .user-session-count').show();
                    $('.total-card .user-session .total-row-right .session-limit strong:nth-child(1)').show();
                    $('.total-card .main-total strong:nth-child(2)').show();
                    $('.sessions-slider .irs--flat .irs-single').text(sessionsNumber);
                    $('.custom-price').remove();
                    $('.total-card').removeClass('custom-total');
                    $('.sessions-slider .sessions-info .leads-info strong').text(sessionsNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    $('.total-card .total-footer .total-btn.trial-btn').css('display', 'block');
                    $('.total-card .total-footer .total-btn.talk-btn').css('display', 'none');
                }
                $('.sessions-slider .irs--flat .irs-max').text('Unlimited').show();
                $('.sessions-slider .irs--flat .irs-min').text('50/mo').show();

                calcTotalSum();
                calcMobileTotalSum();
            },
            onStart: function(data) {
                setTimeout(function() {
                    $('.sessions-slider .irs--flat .irs-max').text('Unlimited').show();
                    $('.sessions-slider .irs--flat .irs-min').text('50/mo').show();
                    let sessionsNumber = data['input'].val();
                    let sessionsRate = sessionsNumber / 100000;
                    let sessionsTotalPrice = Math.ceil(sessionsRate) * pricePer100Sessions;
                    $('.sessions-slider .sessions-info .price-info span strong').text(sessionsTotalPrice);
                    $('.right-pricing-side .total-row-right .session-limit strong span, .mobile-fixed-total .total-row-right .session-limit strong span').text(sessionsTotalPrice);
                    $('.sessions-slider .sessions-info .leads-info strong').text(sessionsNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    $('.right-pricing-side .total-card .user-session .session-pricing, .mobile-fixed-total .total-card .user-session .session-pricing').text(sessionsNumber / 1000);
                    calcSupportPlanPrice();
                    calcTotalSum();
                    calcMobileTotalSum();
                }, 10)

            }

        });
        let headerHeight = $('.menu .navbar').outerHeight() + 10;
        setTimeout(function() {
            $('.right-pricing-side').stickySidebar({
                containerSelector: '.right-pricing-side',
                innerWrapperSelector: '.total-card-wrapp',
                topSpacing: 80,
                resizeSensor: true
            });
        }, 1000)


        //team size number
        $('.team-size-plus').click(function() {
            let inputVal = $('.team-size .team-size-field input').val();
            let newVal = parseInt(inputVal) + 1;
            $('.team-size .team-size-field input').val(newVal);
            $('.seats-value').text(newVal)
            calcSupportPlanPrice();
            calcTotalSum();
            calcMobileTotalSum();
        })
        $('.team-size-minus').click(function() {
            let inputVal = $('.team-size .team-size-field input').val();
            let newVal = parseInt(inputVal) - 1;
            $('.team-size .team-size-field input').val(newVal);
            if (newVal === 0) {
                $('.team-size .team-size-field input').val(1);
            } else {
                $('.seats-value').text(newVal)
            }
            calcSupportPlanPrice();
            calcTotalSum();
            calcMobileTotalSum();
        })

        $('.team-size .team-size-field input').change(function() {
            let currentVal = $(this).val();
        })

        //addons logic
        $('.addons-inner .addons-item .item-button .btn').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            let addonID = $(this).parents('.addons-item').attr('id');
            let totalAddonsLength;


            if ($(this).hasClass('active')) {
                $(this).text('Remove');
                $(this).addClass('btn-primary').removeClass('btn-primary-outline');
                //add addon item
                let addonName = $(this).parents('.addons-item').find('.item-title h3').text();
                let addonPrice = $(this).parents('.addons-item').find('.item-price strong span').text();
                $('.total-addons-wrapper').append('<div class="total-addon-item ' + addonID + '-addon"><div class="total-row-left"><strong class="total-row-value">' + addonName + '</strong></div><div class="total-row-right"><strong>$<span>' + addonPrice + '</span>/mo</strong></div></div>');
                totalAddonsLength = $('.total-addons-wrapper .total-addon-item').length;


            } else {
                $(this).text('Add');
                $(this).addClass('btn-primary-outline').removeClass('btn-primary');
                $('.total-card .add-on .' + addonID + '-addon').remove();
                totalAddonsLength = $('.total-addons-wrapper .total-addon-item').length;
            }

            if (totalAddonsLength === 0) {
                $('.total-card .add-on').hide();
            } else {
                $('.total-card .add-on').show();
            }

            calcTotalSum();
            calcMobileTotalSum();
        })


        //card logic
        $('.card .card-button label').click(function() {
            $(this).parents('.card').addClass('selected-card');
            $('.card .card-button label').not(this).parents('.card').removeClass('selected-card');
            $('.card .card-button input').not(this).removeAttr('checked');
            let checkFlag = $(this).parent().find('input').prop('checked');
            let cardPlanPrice = $(this).parent().parent().find('.card-plan-price').val();
            let leadsPrice = $(this).parent().parent().find('.lead-price').val();
            let userCount = $('.team-size .team-size-field input').val();
            let totalSupportPlanPrice = parseInt(cardPlanPrice) + (parseInt(userCount) * parseInt(leadsPrice));
            let supportPlanValue = $(this).parents('.card').find('.card-head h3').text();
            if (supportPlanValue === 'Enterprise') {
                $('.irs--flat').addClass('blocked');
                $('.info-unlimit').show();
                $('.info-limit').hide();
                $('.sessions-slider .irs--flat .irs-single').hide();
                if ($('.total-card.custom-total').length === 0) {
                    $('.total-card .plan-price strong:nth-child(1)').hide();
                    $('.total-card .user-session .session-limit .user-session-count').hide();
                    $('.total-card .user-session .total-row-right .session-limit strong:nth-child(1)').hide();
                    $('.total-card .main-total strong:nth-child(2)').hide();
                }
                if ($('.custom-price').length === 0) {
                    $('.total-card .user-session .session-limit').append('<strong class="custom-price">custom</strong>');
                    $('.total-card .plan-price').append('<strong class="custom-price">custom</strong>');
                    $('.total-card .main-total').append('<strong class="custom-price">custom</strong>');
                }
                $('.total-card').addClass('custom-total');
                $('.total-card .total-footer .total-btn.trial-btn').css('display', 'none');
                $('.total-card .total-footer .total-btn.talk-btn').css('display', 'block');
            } else {
                $('.right-pricing-side .plan-price strong span').text(totalSupportPlanPrice);
                $('.total-card .plan-price strong:nth-child(1)').show();
                $('.total-card .user-session .session-limit .user-session-count').show();
                $('.total-card .user-session .total-row-right .session-limit strong:nth-child(1)').show();
                $('.total-card .main-total strong:nth-child(2)').show();
                $('.custom-price').remove();
                $('.irs--flat').removeClass('blocked');
                $('.info-unlimit').hide();
                $('.info-limit').show();
                $('.sessions-slider .irs--flat .irs-single').show();
                $('.total-card').removeClass('custom-total');
                $('.total-card .total-footer .total-btn.trial-btn').css('display', 'block');
                $('.total-card .total-footer .total-btn.talk-btn').css('display', 'none');
            }

            if (!checkFlag) {
                $('.card .card-button label').not(this).text('Select this')
                $(this).text('Selected');
                $('.right-pricing-side .total-card .total-row .plan-value').text(supportPlanValue);
            }
            calcTotalSum();
            calcMobileTotalSum();
        })

        function calcSupportPlanPrice() {
            $('.pricing-table1 .card-button input').each(function() {
                if ($(this).prop('checked') === true) {
                    $(this).parents('.card').addClass('selected-card');
                    let supportPlanValue = $(this).parents('.card').find('.card-head h3').text();
                    $('.total-card .total-row .plan-value').text(supportPlanValue);
                    $(this).parents('.card').find('label').text('Selected');
                    let cardPlanPrice = $(this).parent().parent().find('.card-plan-price').val();
                    let leadsPrice = $(this).parent().parent().find('.lead-price').val();
                    let userCount = $('.team-size .team-size-field input').val();
                    let totalSupportPlanPrice = parseInt(cardPlanPrice) + (parseInt(userCount) * parseInt(leadsPrice));
                    $('.right-pricing-side .plan-price strong span').text(totalSupportPlanPrice);
                }
            })
        }
        // calcSupportPlanPrice();
        calcTotalSum();
        calcMobileTotalSum();

        //mobile total card 
        $('.mobile-total-title').click(function() {
            $(this).parent().find('.total-card').slideDown();
            $(this).parent().addClass('total-open');
            $('html, body').addClass('fixed-content')
        })

        $('.close-mobile-total').click(function() {
            $(this).parent().parent().removeClass('total-open');
            $(this).parent().slideUp();
            $('html, body').removeClass('fixed-content')

        })

        $('.selecting-btn').click(function(e) {
            e.preventDefault();
            $(this).parent().find('label').trigger('click');
        })
        $('.addon-selecting-btn').click(function(e) {
            e.preventDefault();
            $(this).parent().find('.item-button a').trigger('click');
        })
    });

    $(window).scroll(function() {
        let scroll = $(this).scrollTop();
        let mobileTotalOffset = $('.right-pricing-side').offset().top - $(window).height();
        if (scroll > mobileTotalOffset) {
            $('.mobile-fixed-total').fadeOut(100);
        } else {
            $('.mobile-fixed-total').fadeIn(100);
        }

        if ($('.is-affixed .inner-wrapper-sticky').css('position') === 'relative') {
            $('.is-affixed').addClass('bottom-fixed');
        } else {
            $('.is-affixed').removeClass('bottom-fixed');
        }
    });

    $(window).load(function() {
        var stripe = Stripe('pk_live_ML7QLqiBsTXHPaIvahNifO0k00BDIyPLml');
        // Handle click on the buy button
        $('.stripeCardButton').click(function(e) {
            e.preventDefault();

            // 1) Format an object with all data about the selected plan
            // Below, there is an example of the data formatting 
            // TODO => We need to replace this with the real data selected by the user
            var totalMonthlyPrice = parseInt($('.right-pricing-side .total-card .main-total-value').text());
            var totalMonthlySession = parseInt($('.right-pricing-side .total-card .user-session-count .session-pricing').text()) * 1000;
            var totalSessionPrice = parseInt($('.right-pricing-side .total-card .session-price').text());
            var seatsNumber = $('.team-size .team-size-field input[type=number]').val();
            var planName = $('.right-pricing-side .total-card .plan-value').text();
            var planPrice = parseInt($('.right-pricing-side .total-card .plan-price strong span').text());
            getValues = () => {
                if ($('.right-pricing-side .total-addon-item').length > 0) {
                    var addonsArr = [];
                    $('.right-pricing-side .total-addon-item').each(function() {
                        addonName = $(this).find('.total-row-left .total-row-value').text();
                        addonPrice = parseInt($(this).find('.total-row-right strong span').text());
                        addonsArr.push({
                            "name": addonName,
                            "monthly_price": addonPrice
                        })
                    })

                    return addonsArr

                } else {
                    return [];
                }
            }

            plan_data = {
                "total_monthly_price": totalMonthlyPrice,
                "monthly_user_sessions": {
                    "nb_sessions": totalMonthlySession,
                    "monthly_price": totalSessionPrice
                },
                "nb_seats": seatsNumber,
                "support_plan": {
                    "name": planName,
                    "monthly_price": planPrice
                },
                "addons": getValues(),
                "test_mode": false
            };

            // 2) Call the API endpoint to retrieve the Stripe checkout session token
            $.ajax({
                type: "POST",
                url: "https://api.air360.io/payments/get_session_token",
                data: JSON.stringify(plan_data),
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(data, textStatus, jqXHR) {
                    var result = JSON.parse(data);

                    // 3) If it's a success, then we redirect the user to Stripe checkout page
                    if (result.success == true) {
                        stripe.redirectToCheckout({
                            sessionId: result.session_token
                        }).then(function(result) {
                            // If `redirectToCheckout` fails due to a browser or network
                            // error, display the localized error message to your customer
                            // using `result.error.message`.
                            console.error(result);
                        });
                    }
                },
                error: function(xhr, textStatus, errorThrown) {

                }
            });
        });
    })
})(jQuery);