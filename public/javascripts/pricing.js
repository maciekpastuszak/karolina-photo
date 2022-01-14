// Card switcher js for the pricing page for smaller devices

const pricingCardSwitcher = (function () {
    // cache dom
    const _switchCont = document.getElementById("switch-cont");
    const _switchButtons = _switchCont.getElementsByClassName("switch-button");
    const _pricingCards = document.getElementsByClassName("card1");

    const _switchCont2 = document.getElementById("switch-cont2");
    const _switchButtons2 = _switchCont2.getElementsByClassName("switch-button");
    const _pricingCards2 = document.getElementsByClassName("card2");

    // event listeners
    _switchCont.addEventListener("click", function (e) {
        e = e.target;
        if (e.tagName == "BUTTON") {
            switchPricingCard(e);
        }
    });

       // event listeners
       _switchCont2.addEventListener("click", function (e) {
        e = e.target;
        if (e.tagName == "BUTTON") {
            switchWeddingPricingCard(e);
        }
    });

    // functions
    function switchPricingCard(e) {
        // loops through all buttons and hides / shows appropriate pricing card
        for (let i = 0; i < _switchButtons.length; i++) {
            if (e == _switchButtons[i]) {
                e.classList.add("switch-selected");
                _pricingCards[i].classList.add("pricing-selected");
            } else {
                _switchButtons[i].classList.remove("switch-selected");
                _pricingCards[i].classList.remove("pricing-selected");
            }
        }
    }

     // functions
     function switchWeddingPricingCard(e) {
        // loops through all buttons and hides / shows appropriate pricing card
        for (let i = 0; i < _switchButtons2.length; i++) {
            if (e == _switchButtons2[i]) {
                e.classList.add("switch-selected");
                _pricingCards2[i].classList.add("pricing-selected");
            } else {
                _switchButtons2[i].classList.remove("switch-selected");
                _pricingCards2[i].classList.remove("pricing-selected");
            }
        }
    }
})();
