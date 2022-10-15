function modal(modalButton, closeButton, modalWindow) {

    modalButton.addEventListener('click', function() {
    
        modalWindow.style.display = "block";

        closeButton.addEventListener('click', function() {
            modalWindow.style.display = "none";
        });
    });

}

const modalBtn = document.querySelector('.intro__link');
const closeBtn = document.querySelector('.btn__close');
const modalWindowRev = document.querySelector('.modal');
modal(modalBtn, closeBtn, modalWindowRev);