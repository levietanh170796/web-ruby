var ready;
ready = function () {
    //slide
    $('#search_text').autocomplete({
        source: "products/autocomplete",
        minLength: 1,
        select: function (event, ui) {
            console.log(event);
            $('#search_text').val(ui.item);
            var id = ui["item"]["id"];
            show_details(id, $('#id' + id).attr("src"));
        }
        }).autocomplete('instance')._renderItem = function(ul, item) {
            var a = Math.floor(Math.random()*10 +1);
            var markup = [
                '<span class="img">',
                '<img id = "id' + item.id  + '" src =' + $('#' + a).attr("src") + '/>',
                '</span>',
                '<span class="title">' + item.value + '</span>',
                '<span class="author">' + item.manufactuer + '</span>',
                '<span class="price">' + item.price + '</span>'];
            return $('<li class = "abc">')
                .append(markup.join(''))
                .appendTo(ul);
        };

    $(".owl-carousel").owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 200,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });

    // click item
    $('.item-over-lay').click(function (e) {
        show_details($(this).attr('data-ProductID'), $(this).attr('data-image'))
    });

    function show_details(productId, imgurl) {
        $.get("/product/" + productId, function (data) {
            $('.cart').slideUp();
            $('.modal-body').html(data);
            $('.modal-body .image .img').css('background-image','url('+imgurl+')');
            $('.modal-body .quick_buy_button_details').attr('data-ProductImage',imgurl);
            $('.modal-body .add_to_card_details').attr('data-ProductImage',imgurl);
            showcart();
            var quantity;
            $(".input_qty").on('keyup keydown change', function (events) {
                quantity = $(this).val();
            });

            $(".add_to_card_details").on('click', function (e) {
                e.stopPropagation();
                $(this).attr('data-Quantity',quantity);
                addToCart(this);
            });
            $(".quick_buy_button_details").on('click', function (e) {
                e.stopPropagation();
                $(this).attr('data-Quantity',quantity);
                addToCart(this);
            });
            $('.order-box.inModal').on('click', function (e) {
                e.stopPropagation();
                $(".cart.inModal").animate({height: 'toggle', opacity: 'toggle'}, 'slow');
            });
            $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index_gradient])
            $('.prod_modal .image .add_to_card_details').css('background', gradient[index_gradient - 1])
            $('#dialog-details').modal("show");
        }, "html");
    }

/// login modal
$('#login').click(function (e) {
    $.get("/login", function (data) {
        $('.modal-body').html(data);
        $('.slider').click(function (e) {
            $('.slider').toggleClass('checked');
            $('.slider:before').toggleClass('checked');
        })
        $('#dialog-login .gradient').css('background', gradient[index_gradient])
    })
    $('#dialog-login').modal("show");
});

$("#adv-search").hide();
$("#btn-search").click(function (event) {
    $(this).toggleClass("active");
    $("#adv-search").animate({width:'toggle'},250);

});


// add to cart
$(".add_to_card").on('click', function (e) {
    e.stopPropagation();
    addToCart(this);
});

// quick buy
$(".quick_buy_button").on('click', function (e) {
    e.stopPropagation();
    addToCart(this);
});

//add to cart
function addToCart(clicked) {
    var currentcart = [];
    var item;
    currentcart = JSON.parse(sessionStorage.getItem('cart'));
    if (currentcart === null) currentcart = [];
    item = {
        "id": $(clicked).attr('data-ProductID'),
        "name": $(clicked).attr('data-ProductName'),
        "price": $(clicked).attr('data-ProductPrice'),
        "image": $(clicked).attr('data-ProductImage'),
        "quantity": parseInt($(clicked).attr('data-Quantity')),
    };
    if (parseInt($(clicked).attr('data-Quantity')) <= 0) {
        alert("so luong phai lon hon 0 !");
    }
    else {
        checkExist(currentcart, item);
        sessionStorage.setItem('cart', JSON.stringify(currentcart));
        $('.fa-shopping-cart').addClass('shake');
        setTimeout(function () {
            $('.fa-shopping-cart').removeClass('shake');
        }, 800);

        showcart();
    }
}

function checkExist(Array, item) {
    var i = Array.length;
    while (i--) {
        if (Array[i]['id'] === item['id']) {
            Array[i]['quantity'] = Array[i]['quantity'] + item['quantity'];
            return;
        }
    }
    Array.push(item);
}

function showcart() {
    var total_price = 0;
    var total = 0;
    currentcart = JSON.parse(sessionStorage.getItem('cart'));
    var cart = $(".cart");
    var cartPage = $(".body_table");
    var reviewOrder = $(".review-order");
    cart.html("");
    cartPage.html("");
    reviewOrder.html("");
    if (currentcart !== null && currentcart.length > 0) {
        $.each(currentcart, function (index, value) {
            total_price += value['price'] * value['quantity'];
            total += parseInt(value['quantity']);
            var url = value['image'];
            cart.append(
                "<div class='card' " + "data-stt='" + index + "'>" +
                '<div class="thumbnail-img"' + 'style="background-image: url(' + url + ')"></div>' +
                '<div class="info" >' +
                "<p class='name'>" + value['name'] + "</p> " +
                '<p class="price">' + value['price'] + '</p>' +
                '<p class="quantity">' + value['quantity'] + '</p>' +
                '</div>' +
                "<div><i class='delete-btn fa fa-times-circle'>" + "</i></div>" +
                "</div>"
            );

            cartPage.append(
                '<tr class="card" data-stt="' + index + '">' +
                '<td>' +
                '<img src=' + url + '>' +
                '</td>' +
                '<td>' +
                "<h3 class='name'>" + value['name'] + "</h3>" +
                '</td>' +
                '<td>' +
                '<span class="price">' + value['price'] + '</span>' +
                '</td>' +
                '<td>' +
                '<input id="' + value['id'] + '" class="input_qty" name="qty" autofocus="autofocus" autocomplete="off" min="1" max="9999" value=' + value['quantity'] + ' type="number">' +
                '</td>' +
                '<td>' +
                '<i class="delete-btn fa fa-times-circle fa-2x"></i>' +
                '</td>' +
                '<td>' +
                '<i class="edit-btn fa fa-pencil fa-2x" data-id="' + value['id'] + '"></i>' +
                '</td>' +
                '</tr>'
            );

            reviewOrder.append(
                '<div class="form-group">' +
                '<div class="col-sm-3 col-xs-3">' +
                '<img class="img-responsive" src="' + url + '" />' +
                '</div>' +
                '<div class="col-sm-6 col-xs-6">' +
                '<div class="col-xs-12">' + value['name'] + '</div>' +
                '<div class="col-xs-12"><small>Quantity:<span>' + value['quantity'] + '</span></small></div>' +
                '</div>' +
                '<div class="col-sm-3 col-xs-3 text-right">' +
                '<h6>' + value['price'] + '$</h6>' +
                '</div>' +
                '</div>' +
                '<div class="form-group"><hr /></div>' +
                '<input type="hidden" name="name" value="' + value['name'] + '">' +
                '<input type="hidden" name="product_id" value="' + value['id'] + '">' +
                '<input type="hidden" name="quantity" value="' + value['quantity'] + '">' +
                '<input type="hidden" name="price" value="' + value['price'] + '">'
            );
        });

        $(".payment").css("display", "block");

        cart.append("<div class=\"pay\"><a href='/cart'>" +
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="-2 -2 110 110"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#353434;}.cls-3,.cls-6{fill:none;stroke-miterlimit:10;stroke-width:2px;}.cls-3{stroke:#343434;}.cls-4{mask:url(#mask);}.cls-5{opacity:0.75;mix-blend-mode:screen;}.cls-6{stroke:#fff;}.cls-7{filter:url(#luminosity-invert);}</style><filter id="luminosity-invert" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/></filter><mask id="mask" x="-2" y="-2.95" width="112" height="113" maskUnits="userSpaceOnUse"><g class="cls-7"><g transform="translate(-57.67 -34.95)"><image width="112" height="113" transform="translate(55.67 32)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABxCAIAAACC3rC5AAAACXBIWXMAAAsSAAALEgHS3X78AAAEsUlEQVR4Xu2d24KrIAxFA8z//7EwD6lpiggBI62a9XDOXLSjyx3AO4BhGA/CtSaYjffeOelSpZRijK2ppiJd9PMgg865lJLcJqyz4NcppV/w27H0ivAYeu9RCv0rl8I3Bqx+Bz5HkalCvffeezhtzblfCm9KaVmW1qxqTBKKKnFt0aCWxD38CjUFZ/9F5HSh6JEKfHJespqYoPVEoaTyF7qLaQtzitBpS98LL5eT0qoslErs11RyuFb1Jii0JujAex9CwGAuy5LWEeKvgRvbOcf7ydZMUtSEUjZPKiV1UCKPamsOEQolTxV0FZUZulE4mtAQApX58aX5ClT+mIyDUT0kVHfbfhHF8h8vebR5dZUZFNLhlRpM6PE//JtQ+cNoTkeE3tUmwst/wGm30HvbRI7ktE8otpv3tokM57RD6C17oQpjOfWtCV5470MIAPAQmwiubAgBtUqQTufWIzStCe8GrrJcqKjkn1bsHCx8+YC/LfTJNhH0KGxM20m+/SBJQowxyU5xN4R6jeMF94B3+hVqJW/FzhEWfs23FXuGpPB3hVqxF2kW/u4vLJ5FmiEtC7V4VqiHtPxTi2eFekgLQi2eTVJKOATa/qosFB652y4HQyoS6nsuIH44xZa0IBQEe6zG3lGoQmiT9uU+twSrfvvzD6HWenYRY9xW/cc3jz2KPEZx/JQLtdazl5pQs9nL1thbqI3nB9juhr6/sgZ0gG0z2j4FYtTJatraUAXKCbU9ThVeQq1HGibrl17/2QHQYbJ+6S10fxajTS7U0MKEKmNClTGhyphQZUyoMiZUGROqjAlVxoTqQIdBTKgyL6F2nOkI3N5bqOQCcmNLduTzZbB5HamxR3Yu7h1Jq3oVCleOGL0U2lBjmN0rR6xfGmB7Lu6tz/qlAbbn4vI8mtAutrpyoX590IDRpPhggsKVIxZSIa50E/0f/2ZZFuecCZUTY8wuny/06c45q/om0vuUrOqF7N0u81HysFY9GAK29Q7Fki/e3GBwKrfLFNrKtD4Hxg6X7FERWo6h7YZWqF/6WVZmu6EVtrubnN0MppRsr2lL88rkXaF0B7M5JbzgAYC1VhJns8InJPfC1tJH3T3YCRJW7ONCwYZQDIxn88b39sDIhlAg6IuIdoeT1keUCT/xfuBxkBij5C4ZUe7i+qDXB/b4tNYSmyAUCmvhdz089wZ49v6d1rQvpImjw3rOOeG2ugGUzWZfREiFwmfvJN9i14W6DblN6BIKnzm9t9OujojTJxSekVPhGL5It1C4e04xm2M2AY69/ieEkKa8LHMO2KEDwJE1GkkoQrWPXeHVo0rjzeFsIuNCgQ1Or34AhcabXSOkIoeEApN4XafYaELneHOP8TY0g9rygyUzE3/C+x7VhAJbPgDoHQ9PhlKpnoCjJc/BhXPrG11/dlDF99DV35CrKRShUeoPasVgnjra0yz5DC5Ut6wGmLYwJwpFsob11JXZ4tdHSk9QiZwuFCGt1AKcVHEI9TnIHJXIJKEEriqajTHqrip9Mh/AaX24kNlCEZ6grNeSK6Y9tCLpS+O27wjl8EaWk0pjAz6Z/7zsQL4lTuX7QrfwnqQ+5bdiaBiX5R+twM3tH2ReFwAAAABJRU5ErkJggg=="/></g></g></mask></defs><title>pay2</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><path class="cls-2" d="M139.07,69.3h-4.3L125.87,54a2,2,0,0,0-1.3-.9,2.32,2.32,0,0,0-1.6.3l-10.2,7-5.5-6.7a1.75,1.75,0,0,0-1.4-.7,2,2,0,0,0-1.5.6L88.87,69.3h-4.6a7.81,7.81,0,0,0-7.8,7.8v40a7.81,7.81,0,0,0,7.8,7.8h54.8a7.81,7.81,0,0,0,7.8-7.8v-40A7.81,7.81,0,0,0,139.07,69.3Zm3.8,35.6h-12.7a7.8,7.8,0,1,1,0-15.6h12.7Zm-19.4-47,6.7,11.4H120l-4.7-5.7Zm-17.8.1,9.2,11.3H94.47Zm33.4,63H84.27a3.8,3.8,0,0,1-3.8-3.8v-40a3.8,3.8,0,0,1,3.8-3.8h54.8a3.8,3.8,0,0,1,3.8,3.8v8.2h-12.7a11.75,11.75,0,1,0,0,23.5h12.7v8.2A3.82,3.82,0,0,1,139.07,121Z" transform="translate(-57.67 -34.95)"/><circle class="cls-2" cx="72.8" cy="62.15" r="2.9"/><circle class="cls-3" cx="54" cy="54" r="53"/><g class="cls-4"><g class="cls-5"><circle class="cls-6" cx="54" cy="54" r="53"/></g></g></g></g></svg>' +
            '</a></div>');
        $(".card .delete-btn").click(function () {
            var attr = $(this).parent().parent().attr('data-stt');
            currentcart.splice(attr, 1);
            sessionStorage.setItem('cart', JSON.stringify(currentcart));
            showcart();
            // if (currentcart.length < 1) {
            //     cart.html("");
            //     cart.append("<p id='nothing'>Nothing has been chosen<p/>");
            // }
        });

        $(".card .edit-btn").click(function () {
            var index = $(this).parent().parent().attr('data-stt');
            var id = $(this).attr('data-id');
            var qty = $("#" + id + ".input_qty").val();
            if (qty <= 0) {
                currentcart.splice(index, 1);
            } else {
                currentcart[index]['quantity'] = qty;
            }

            sessionStorage.setItem('cart', JSON.stringify(currentcart));
            showcart();
        });

    } else {
        cartPage.append("<tr><td colspan='5'><p align='center' style='font-size: 20px; margin-top: 25px ;'>Nothing has been chosen<p/></td></tr>");
        $(".payment").css("display", "none");
        cart.append('<p class="nothing"> Nothing has been chosen <p/>');
    }
    $(".price_text").text(total_price + " $");
    $(".total_cart").text(total + ' sản phẩm');
}

showcart();
$(".order-box .fa").click(function (event) {
    $(".cart").animate({height: 'toggle', opacity: 'toggle'}, 'slow');
});


$(".order-btn").click(function (e) {
    sessionStorage.removeItem('cart');
});
// Quotes about learning from goodreads -- http://www.goodreads.com/quotes/tag/learning


// smooth scroll
$(document).ready(function () {
    'use strict';
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });
});


// full Page
var index_gradient = 3;
var gradient = [
    "#dfdfdf",
    "linear-gradient(135deg, rgba(255,174,39,1) 0%,rgba(222,73,109,1) 100%",
    "linear-gradient(135deg, rgba(31, 162, 255, 1) 0%,rgba(18, 216, 250, 1) 50%,rgba(166, 255, 203, 1) 100%)",
    "linear-gradient(135deg, rgba(171,73,222,1) 0%,rgba(73,84,222,1) 100%)",
    "linear-gradient(135deg, rgba(222,73,109,1) 0%,rgba(171,73,222,1) 100%)"
];
$('#fullpage').fullpage({
    anchor: ['section1', 'section2', 'section3', 'section4', 'section5'],
    onLeave: function (index, nextIndex, direction) {
        if (index === 1) {
            $('.section.best-sell').css('background', gradient[1])
            $('#gradient').css('z-index', '-1')
            $('.slideshow').css('z-index', -100)
            $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
            $('.prod_modal .image .add_to_card_details').css('background', gradient[index + 1])
            index_gradient = index + 1
        }
        if (index === 2) {
            if (direction === 'up') {
                $('#gradient').css('z-index', '-200')
                $('#gradient').css('background', gradient[0])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index - 1])
                index_gradient = index - 1
            }
            if (direction === 'down') {
                $('.section.best-sell').css('background', 'none')
                $('#gradient').css('background', gradient[2])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index + 1])
                index_gradient = index
            }
        }
        if (index === 3) {
            if (direction === 'up') {
                $('#gradient').css('background', gradient[1])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index - 2])
                index_gradient = index - 1
            }
            if (direction === 'down') {
                $('#gradient').css('background', gradient[3])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index + 1])
                index_gradient = index
            }
        }
        if (index === 4) {
            if (direction === 'up') {
                $('#gradient').css('background', gradient[2])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index - 2])
                index_gradient = index -2
            }
            if (direction === 'down') {
                $('#gradient').css('background', gradient[4])
                $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index])
                $('.prod_modal .image .add_to_card_details').css('background', gradient[index + 1])
                index_gradient = index
            }
        }
        if (index === 5) {
            $('#gradient').css('background', gradient[3])
            $('.prod_modal .image .quick_buy_button_details').css('background', gradient[index - 1])
            $('.prod_modal .image .add_to_card_details').css('background', gradient[index - 2])
            index_gradient = index - 1
        }
    },

    afterLoad: function (anchorLink, index) {
        if (index === 1) {
            // $('.section.best-sell').css('background', 'none')
            $('.slideshow').css('z-index', 10)
        }
        if (index === 2) {
            $('#gradient').css('background', 'linear-gradient(135deg, rgba(255,174,39,1) 0%,rgba(222,73,109,1) 100%')
            $('.section.best-sell').css('background', 'linear-gradient(135deg, rgba(255,174,39,1) 0%,rgba(222,73,109,1) 100%')

        }
    }
});
}
$(document).ready(ready);
$(document).on('page:load', ready);
$("#prospects_form").submit(function (e) {
    e.preventDefault();
});

