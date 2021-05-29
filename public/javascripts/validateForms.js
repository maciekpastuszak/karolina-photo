//JS for the client-side validation of forms

(function () {
    'use strict'
    const forms = document.querySelectorAll('.validated-form')

    // Loop over forms and prevent submission
    
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
