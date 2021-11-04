(function() {

    let adjustHeight = () => {
        document.body.style.height = window.innerHeight;
    };

    window.addEventListener('resize', adjustHeight);
    window.onload = adjustHeight();

})();