var animationSpeed = 300;

function formatPrice(price) {
    return price.toLocaleString("cs-CZ") + " Kč";
}

document.addEventListener("DOMContentLoaded", function () {
    var offerButtons = document.querySelectorAll(".offer-btn");

    offerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var offer = document.getElementById(button.dataset.target);
            var isOpen = offer.classList.toggle("open");

            if (isOpen) {
                button.textContent = "Skrýt nabídku";
            } else {
                button.textContent = "Zobrazit nabídku";
            }
        });
    });

    var form = document.getElementById("contact-form");
    var formMessage = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        formMessage.textContent = "Děkujeme, " + name + "! Ozveme se vám do 24 hodin.";
        form.reset();
    });
});
