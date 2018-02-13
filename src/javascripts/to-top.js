(function() {
    $(document).ready(function() {
        let millis = 900;
        if ($("#to-top")) {
            $('a[href^="#"]').on('click', function(e) {
                let target = $(this.getAttribute('href'));
                if (target.length) {
                    e.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top
                    }, millis);
                }
            });
        } else { 
			return;
		}
	});
})();
