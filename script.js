$(document).ready(function() {

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = $(".hero-slide");
    var dots = $(".hero-dot");
    if (n > slides.length) {
      slideIndex = 1;
    } else if (n < 1) {
      slideIndex = slides.length;
    } else {
      slideIndex = n;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  $(".hero-dot").click(function() {
    var dotIndex = $(this).index() + 1;
    currentSlide(dotIndex);
  });

  $(".prev").click(function() {
    plusSlides(-1);
  });

  $(".next").click(function() {
    plusSlides(1);
  });

  // Auto slide every 5 seconds
  setInterval(function() {
    plusSlides(1);
  }, 5000);

  // Initialize cart
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add to cart button click event
  $(".add-to-cart-btn").click(function() {
    var id = $(this).attr("id");
    var product = $(this).closest(".product-item");
    var name = product.find("h3").text();
    var size = "N/A";
    var price = parseFloat(product.find("p").text());
    var found = false;
    var count = parseInt($("#cart-count").text());

    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity++;
        found = true;
        break;
      }
    }

    // If item is not already in the cart, add it
    if (!found) {
      cart.push({
        id: id,
        name: name,
        size: size,
        price: price,
        quantity: 1
      });
    }

    // Update cart count in header
    var cartCount = $('#cart-count');
    cartCount.text(cart.length);

    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show success message
    var successMsg = $('<div class="alert alert-success" role="alert">Този продукт беше добавен успешно във вашата количка.</div>');
    $(this).parent().append(successMsg);
    setTimeout(function() {
      successMsg.fadeOut();
    }, 3000);
  });

  // Update cart count in header on page load
  var cartCount = $('#cart-count');
  cartCount.text(cart.length);

});
