// Card switcher js for the pricing page for smaller devices

const pricingCardSwitcher = (function () {
    // cache dom
    const _switchCont = document.getElementById("switch-cont");
    const _switchButtons = _switchCont.getElementsByClassName("switch-button");
    const _pricingCards = document.getElementsByClassName("card");

    // event listeners
    _switchCont.addEventListener("click", function (e) {
        e = e.target;
        if (e.tagName == "BUTTON") {
            switchPricingCard(e);
        }
    });

    // functions
    function switchPricingCard(e) {
        // loops through all buttons and hides / shows appropriate pricing card
        for (const i = 0; i < _switchButtons.length; i++) {
            if (e == _switchButtons[i]) {
                e.classList.add("switch-selected");
                _pricingCards[i].classList.add("pricing-selected");
            } else {
                _switchButtons[i].classList.remove("switch-selected");
                _pricingCards[i].classList.remove("pricing-selected");
            }
        }
    }
})();
