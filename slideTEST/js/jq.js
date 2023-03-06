
$(function () {
    const carouselArea = $('.carousel__wrap'),
        tab = $('.pagiation__item'),
        time = 5000;

    let slide = carouselArea.find('.slide');

    const slideLength = slide.length,
        lastSlideIdx = slideLength - 1,
        showSlide = 3,
        tabInit = 0;

    let left = 100 / showSlide;

    if (showSlide === 1) {
        left = 200;
    }
    /* =================================================================
    initialized
    ================================================================= */

    // UI setting
    carouselArea.css('width', `${(100 * slideLength) / showSlide}%`);

    if (showSlide === 1) {
        carouselArea.css({
            'width': `${(100 * slideLength) / showSlide}%`,
            'left': `${-100}%`
        });
    }

    let clonedSlide = slide.eq(lastSlideIdx).clone();

    slide.eq(lastSlideIdx).remove();
    slide.eq(0).before(clonedSlide);


    tabActive(tabInit); // tab active
    autoCarousel();  // auto rolling
    tab.eq(tabInit).addClass('next');
    slide.eq(0).addClass('is-active');

    /* =================================================================
    auto rolling setting
    ================================================================= */
    function autoCarousel() {
        auto = setInterval(function () {
            slideMove(-left, 600, 0, lastSlideIdx);
            tabActive(); // tab active
            $('.slide__img').css('transition', '');
        }, time);
    }


    /* =================================================================
    rolling stop
    ================================================================= */
    function stopCarousel() {
        clearInterval(auto);
    }


    /* =================================================================
    Play/Stop button control
    ================================================================= */
    $('.btn__play').on('click', function () {
        const stopped = $(this).hasClass('stop');

        stopped ? autoCarousel() : stopCarousel();
        $(this).toggleClass('stop');
    });


    /* =================================================================
    tab menu click
    ================================================================= */
    tab.click(function (e) {
        tab.removeClass('next').add('prev');
        $('.slide__img').css('transition', 'unset');

        const tabDataIdxFrom = $('.pagiation__item.is-active').data('index'),
            tabDataIdxTo = $(this).data('index');

        tab.removeClass('is-active');
        $(this).addClass('is-active');

        let getDirection = (tabDataIdxTo - tabDataIdxFrom); // move to previous slide if the value of getDirection is negative, else move to next slide

        if (getDirection === 0) {
            e.preventDefault();

        } else if (getDirection > 0) { // move to next slide
            $(this).addClass('next');

            if (getDirection > 1) { // multiple move
                stopCarousel();
                multiSlidesMove(-left * (getDirection + 1));
                autoCarousel();

            } else { // next tab click
                stopCarousel();
                slideMove((-left * 2), 0, 0, lastSlideIdx);
                autoCarousel();
            }

        } else if (getDirection < 0) { // move to previous slide
            $(this).addClass('prev');

            if (getDirection < -1) {  // multiple move
                getDirection = getDirection * -1; // change the value of getDirection to positive number

                stopCarousel();
                multiSlidesMove(left * (getDirection + 1));
                autoCarousel();

            } else {
                stopCarousel();
                slideMove(0, 0, lastSlideIdx, 0);
                autoCarousel();
            }
        }

        if ($('.btn__play').hasClass('stop')) {
            stopCarousel();
        }


        /* =================================================================
        slide move (single)
        ================================================================= */
        function multiSlidesMove(movePos) {
            carouselArea.animate({ 'left': movePos + '%' }, 0, 'easeOutCubic', function () {

                if (tab.hasClass('next')) {

                    for (let i = 0; i < getDirection; i++) {
                        let slide = carouselArea.find('.slide');

                        cloneMultiSlides = slide.eq(0).clone();
                        slide.eq(0).remove();
                        slide.eq(lastSlideIdx).after(cloneMultiSlides);
                    }

                } else {

                    for (let i = getDirection; i > 0; i--) {
                        let slide = carouselArea.find('.slide');

                        cloneMultiSlides = slide.eq(lastSlideIdx).clone();
                        slide.eq(lastSlideIdx).remove();
                        slide.eq(0).before(cloneMultiSlides);
                    }
                }

                carouselArea.css('left', 0 + '%');

                if (showSlide === 1) {
                    carouselArea.css('left', -100 + '%');
                }

                let slide = carouselArea.find('.slide');

                slide.removeClass('is-active');
                slide.eq(1).addClass('is-active');
            });
        }
    });


    /* =================================================================
    tab menu active
    ================================================================= */
    function tabActive(idx) {

        let tab = $('.pagiation__item'),
            tabCount = tab.length,
            tabIndex = $('.pagiation__item.is-active').index();

        tabIndex++;

        if (tabIndex > tabCount - 1) tabIndex = 0;

        idx = tabIndex;

        tab.removeClass('is-active');
        tab.eq(idx).addClass('is-active');
    }


    // slide moves (multiple)

    function slideMove(movePos, duration, removeIdx, insertIdx) {
        carouselArea.animate({ 'left': movePos + '%' }, duration, 'easeOutCubic', function () {

            let slide = carouselArea.find('.slide');

            let clonedSlide = slide.eq(removeIdx).clone();
            slide.eq(removeIdx).remove();

            if (tab.hasClass('next')) {
                slide.eq(insertIdx).after(clonedSlide);
            } else {
                slide.eq(insertIdx).before(clonedSlide);
            }

            carouselArea.css('left', 0 + '%');

            if (showSlide === 1) {
                carouselArea.css('left', -100 + '%');
            }

            slide = carouselArea.find('.slide');

            slide.removeClass('is-active');
            slide.eq(1).addClass('is-active');
        });
    }
});


