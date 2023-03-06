
// device sizes
$mq_tablet = 1101;
$mq_tablet_sm = 769;


// 터치 기기 인 경우 html에 'touch-device' 클래스 추가
if ('ontouchstart' in document.documentElement) {
    document.documentElement.className += 'touch-device';
}


// ios 대응 vh css 변수 설정
const $vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${$vh}px`);


// SVG drawing motion path 길이 css 설정
const $path_k = document.querySelector('.logo__k'),
    $path_elly = document.querySelector('.logo__elly'),
    $path_eye_l = document.querySelector('.logo__eye-l'),
    $path_eye_r = document.querySelector('.logo__eye-r'),
    $path_k_leng = Math.ceil($path_k.getTotalLength()),
    $path_elly_leng = Math.ceil($path_elly.getTotalLength()),
    $path_eye_l_leng = Math.ceil($path_eye_l.getTotalLength()),
    $path_eye_r_leng = Math.ceil($path_eye_r.getTotalLength());

$path_k.style.cssText = `
    stroke-dasharray: ${$path_k_leng};
    stroke-dashoffset:${$path_k_leng};
`;

$path_elly.style.cssText = `
    stroke-dasharray: ${$path_elly_leng};
    stroke-dashoffset: ${$path_elly_leng};
`;

$path_eye_l.style.cssText = `
    stroke-dasharray: ${$path_eye_l_leng};
    stroke-dashoffset:${$path_eye_l_leng};
`;

$path_eye_r.style.cssText = `
    stroke-dasharray: ${$path_eye_r_leng};
    stroke-dashoffset: ${$path_eye_r_leng};
`;


//===============================================


const $html = document.querySelector('html'),
    $wrap = document.querySelector('.wrap'),
    $header = document.querySelector('.header'),
    $logo = document.getElementById('logo'),
    $toggleBox = document.querySelector('.toggle__box');



/*
    TweenMax.to(element, duration, css properties)
    TweenMax.fromTo(element, duration, css properties(from), css properties(to))
*/


// scroll magin 초기 선언
let $controller = new ScrollMagic.Controller();


// 인트로 (SVG drawing + header size 모션)

// $tween_logoDraw = new TimelineMax()
//     .delay(1)
//     .add(TweenMax.to($path_k, 0.65, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_elly, 2.2, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_eye_l, 0.6, { delay: 0.4, strokeDashoffset: 0, ease: window.innerWidth < $mq_tablet_sm ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to($path_eye_r, 0.7, { delay: 0.1, strokeDashoffset: 0, ease: window.innerWidth < $mq_tablet_sm ? 'sine.in' : 'elastic.out(1, 0.3)' }), 'queue')
//     .add(TweenMax.to('.intro-box', 2, { height: 60, ease: 'power1.in' }), 'queue+=0.5')
//     .add(TweenMax.to('#logo', 1.2, { width: 52, height: 'auto', left: window.innerWidth < $mq_tablet_sm ? 20 : 40, marginLeft: 26, ease: 'power1.in' }), 'queue+=1.3')
//     .add(TweenMax.fromTo('#toggle_btn', 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0 }), 'queue+=2')
//     .call(() => {
//         $wrap.classList.remove('loading');
//         $header.classList.add('end');
//     });


// 
// $tween_logoDraw = new TimelineMax()
//     .add(TweenMax.to($path_k, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_elly, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_eye_l, { strokeDashoffset: 0, ease: window.innerWidth < $mq_tablet_sm ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to($path_eye_r, { strokeDashoffset: 0, ease: window.innerWidth < $mq_tablet_sm ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to('.intro-box', { height: 60, ease: 'power1.in' }))
//     .add(TweenMax.to('#logo', { width: 52, height: 'auto', left: window.innerWidth < $mq_tablet_sm ? 20 : 40, marginLeft: 26, ease: 'power1.in' }))
//     .add(TweenMax.fromTo('#toggle_btn', { opacity: 0, x: 100 }, { opacity: 1, x: 0 }))
//     .call(() => {
//         $wrap.classList.remove('loading');
//         $header.classList.add('end');
//     });



// 로고 클릭 시 새로고침 
$logo.addEventListener('click', (e) => {
    if ($wrap.classList.contains('loading')) {
        e.preventDefault();
    } else {
        window.location.reload();
    }
});

$logo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if ($wrap.classList.contains('loading')) {
            e.preventDefault();
        } else {
            window.location.reload();
        }
    }
});



/*
    Navigation  
*/
const $gnb = document.querySelector('.gnb'),
    $gnbItem = document.querySelectorAll('.gnb__item'),
    $activeBg = document.querySelector('.active-bar'),
    $scrollTarget = document.querySelectorAll('.section[data-name]'),
    $scrollTopPos = [],
    $hamburger = document.querySelector('.hamburger');

let $activeList = document.querySelector('.gnb__list.is-active');

// active-bar 초기설정 
$activeBg.style.width = $activeList.offsetWidth + 'px';
$activeBg.style.left = 0;
// 
// // active-bar 위치 
// $gnbItem.forEach((item, idx) => {
//     $scrollTopPos.push($scrollTarget[idx].offsetTop); // 각 섹션 scrollTop값 배열로 출력
// 
//     item.addEventListener('click', function () {
//         if (window.innerWidth < $mq_tablet) {
//             mobileMenuOpen();
// 
//         } else {
// 
//             // 클릭한 메뉴로 active-bar 이동
//             $leftPos = this.offsetLeft;
//             $activeBg.style.width = this.offsetWidth + 'px';
//             $activeBg.style.left = $leftPos + 'px';
// 
//             this.parentNode.classList.add('is-active');
// 
//             $gnbItem.forEach((el) => {
//                 el.parentNode.classList.toggle('is-active', this === el);
//             })
//         }
// 
//         $menuData = this.getAttribute('data-name');
//         $sectionTopPos = document.querySelector(`.section[data-name="${$menuData}"]`).offsetTop;
// 
//         // 클릭한 메뉴 섹션으로 스크롤 이동
//         window.scroll(top, $sectionTopPos)
// 
//         // 모바일 메뉴가 열린채로 PC 사이즈로 변경되었을 때 메뉴 클릭시 
//         if ($hamburger.classList.contains('is-open')) {
//             $hamburger.classList.remove('is-open')
//             $header.classList.remove('menu-open');
//             document.querySelector('body').style.overflow = 'auto';
//         }
//     })
// });


// 모바일 메뉴 클릭
$hamburger.addEventListener('click', () => mobileMenuOpen());

function mobileMenuOpen() {
    $hamburger.classList.toggle('is-open');
    $header.classList.toggle('menu-open');
    $header.classList.contains('menu-open') ? bodyOverflow('hidden') : bodyOverflow('auto');
}

function bodyOverflow(overflow) {
    document.querySelector('body').style.overflow = overflow;
}

// 
// // 스크롤 시 active-bar 이동
// window.addEventListener('scroll', () => {
//     const $menuList = document.querySelectorAll('.gnb__list');
//     let $activeList = document.querySelector('.gnb__list.is-active');
// 
//     $menuList.forEach(el => {
//         if (el.classList.contains('is-active')) {
//             $leftPos = $activeList.offsetLeft;
// 
//             $activeBg.style.width = $activeList.offsetWidth + 'px';
//             $activeBg.style.left = $leftPos + 'px';
//         }
//     });
// })
// 

// 라이트모드-다크모드 테마 토글 버튼
const $themeCheckBox = document.querySelector('.toggle__item'),
    $themelabel = document.querySelector('.toggle__btn'),
    $themeIcons = document.querySelectorAll('.toggle__icon .item');

// 클릭시 테마 변경
$themeCheckBox.addEventListener('click', () => {
    $html.classList.toggle('light-theme');

    for (let i = 0; i < $themeIcons.length; i++) {
        $themeIcons[i].classList.toggle('on');
    }
});

// // 탭키 이동 후 엔터로 테마 변겅
// $themelabel.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         $html.classList.toggle('light-theme');
// 
//         if ($html.classList.contains('light-theme')) {
//             $themeCheckBox.checked = false;
//         } else {
//             $themeCheckBox.checked = true;
//         }
// 
//         for (let i = 0; i < $themeIcons.length; i++) {
//             $themeIcons[i].classList.toggle('on');
//         }
//     }
// });

// 
// //project toggle 버튼
// const $projectGrid = document.querySelector('.project__grid'),
//     $projectItem = document.querySelectorAll('.project__item'),
//     $displayBtn = document.getElementById('btn-display'),
//     $screenTxt = $displayBtn.querySelector('.text-hide'),
//     $toggleLines = $displayBtn.querySelectorAll('.line');
// 
// for (let i = 0; i < $projectItem.length; i++) {
//     if (i >= 6) {
//         $projectItem[i].style.display = 'none';
//     }
// }

// $displayBtn.addEventListener('click', function () {
//     if ($projectGrid.classList.contains('default')) {
//         for (let i = 0; i < $projectItem.length; i++) {
//             $projectItem[i].style.display = 'flex';
//         }
// 
//         $screenTxt.textContent = '접기';
//         $toggleLines[0].classList.remove('rotate');
//         this.classList.add('opened');
//     } else {
//         for (let i = 0; i < $projectItem.length; i++) {
//             if (i >= 6) {
//                 $projectItem[i].style.display = 'none';
//             }
//         }
//         $screenTxt.textContent = '더보기';
//         $toggleLines[0].classList.add('rotate');
//         this.classList.remove('opened');
// 
//         // 그리드 접었을 때 project 섹션으로 스크롤 이동
//         $projectTopPos = document.querySelector(`.section[data-name="project"]`).offsetTop;
//         window.scroll(top, $projectTopPos)
//     }
//     $projectGrid.classList.toggle('default');
// })
// 
// $displayBtn.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//         if ($projectGrid.classList.contains('default')) {
//             for (let i = 0; i < $projectItem.length; i++) {
//                 $projectItem[i].style.display = 'flex';
//             }
// 
//             $screenTxt.textContent = '접기';
//             $toggleLines[0].classList.remove('rotate');
//             this.classList.add('opened');
//         } else {
//             for (let i = 0; i < $projectItem.length; i++) {
//                 if (i >= 6) {
//                     $projectItem[i].style.display = 'none';
//                 }
//             }
//             $screenTxt.textContent = '더보기';
//             $toggleLines[0].classList.add('rotate');
//             this.classList.remove('opened');
// 
//             // 그리드 접었을 때 project 섹션으로 스크롤 이동
//             $projectTopPos = document.querySelector(`.section[data-name="project"]`).offsetTop;
//             window.scroll(top, $projectTopPos)
//         }
//         $projectGrid.classList.toggle('default');
//     }
// })





const carousel = document.querySelector('.carousel');
const carouselWrap = document.querySelector('.carousel__wrap');
const time = 5000;

let slide = document.querySelectorAll('.slide');

const slideLength = slide.length;
const lastSlideIdx = slideLength - 1;
const showSlide = 3;

let left = 100 / showSlide;

if (showSlide === 1) {
    left = 200;
}

/* =================================================================
initialized
================================================================= */

// UI setting
carouselWrap.style.width = `${(100 * slideLength) / showSlide}%`;

if (showSlide === 1) {
    carouselWrap.style.cssText = `
        width: ${(100 * slideLength) / showSlide}%;
        left: ${-100}%;
    `;
}

let clonedSlide = slide[lastSlideIdx].cloneNode(true);

slide[lastSlideIdx].remove();
carouselWrap.insertBefore(clonedSlide, slide[0]);
// autoCarousel();
slide[0].classList.add('is-active');



/* =================================================================
auto rolling setting
================================================================= */
function autoCarousel() {
    auto = setInterval(function () {
        carousel.classList.remove('prev');
        slideMove(-left, 0, lastSlideIdx);
        document.querySelectorAll('.slide__img').forEach(function (item) {
            item.style.transition = '';
        });

        console.log('go')
    }, time);
}



/* =================================================================
rolling stop
================================================================= */
function stopCarousel() {
    // clearInterval(auto);
    // console.log('stop')
}



carousel.addEventListener('mouseenter', () => {
    stopCarousel();
    // console.log('enter')
})

carousel.addEventListener('mouseleave', () => {

    if ($modal.classList.contains('is-open')) {
        stopCarousel();
    } else {
        // autoCarousel();
    }

})




const carouselArw = document.querySelectorAll('.carousel__arrow');

carouselArw.forEach((arwBtn) => {
    arwBtn.addEventListener('click', function () {

        slide = document.querySelectorAll('.slide');

        if (this.classList.contains('next')) {
            stopCarousel();

            // slide.forEach((item) => {
            //     item.style.transition = '0s';
            // });


            carousel.classList.remove('prev');

            slideMove(-left, 0, lastSlideIdx);
            // carouselWrap.classList.remove('moving');

            // autoCarousel();


            // console.log('다음')
        } else {
            //뒤록기 구현

            carousel.classList.add('prev');
            stopCarousel();
            slideMove(left, 0, lastSlideIdx);
            carouselWrap.style.transform = `translateX(${width}px)`;
            carousel.style.transform = `translateX(-${width}px)`;
            // autoCarousel();


            // console.log('이전')
        }


    })
})



function slideMove(movePos, removeIdx, insertIdx) {

    let slide = carouselWrap.querySelectorAll('.slide');

    carouselWrap.classList.add('moving');
    width = slide[0].offsetWidth;
    carouselWrap.style.transform = `translateX(-${width}px)`;
    carousel.style.transform = `translateX(${width}px)`;

    setTimeout(() => {
        carouselWrap.classList.remove('moving');
        carouselWrap.style.transform = `translateX(0)`;
        carousel.style.transform = `translateX(0)`;
    }, 700);



    let clonedSlide = slide[removeIdx].cloneNode(true);

    slide[removeIdx].remove();

    // if (carousel.classList.contains('prev')) {
    //     carouselWrap.insertBefore(clonedSlide, slide[insertIdx + 1]);
    // } else {
    //     carouselWrap.insertBefore(clonedSlide, slide[insertIdx]);
    // }
    if (carousel.classList.contains('prev')) {
        carouselWrap.insertBefore(clonedSlide, slide[insertIdx]);
        console.log('이ㅣㅣㅣㅣㅣ전')
    } else {
        carouselWrap.insertBefore(clonedSlide, slide[insertIdx + 1]);
        console.log('다ㅏㅏㅏㅏ음')
    }



    // carouselWrap.style.left = '0%';
    if (showSlide === 1) {
        carouselWrap.style.left = '-100%';
    }

    slide = carouselWrap.querySelectorAll('.slide');

    slide.forEach(function (item) {
        item.classList.remove('is-active');
    });
    slide[1].classList.add('is-active');
}







const $modelOpenBtn = document.querySelectorAll('.slide button'),
    $modal = document.querySelector('.modal'),
    $layer = document.querySelector('.modal__layer'),
    $codeItem = document.querySelectorAll('.modal__item');


$modelOpenBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        getData = this.getAttribute('data-name');

        $modalItem = document.querySelector(`.modal__item[data-name="${getData}"]`);

        $modal.classList.add('is-open');
        $modal.style.display = 'block';
        $modal.focus();
        $modalItem.style.display = 'block';






        // 배경 레이어 클릭해서 모달창 닫기
        $layer.addEventListener('click', () => {
            $modal.classList.remove('is-open');
            $modal.style.display = 'none'
            $modalItem.style.display = 'none'
            autoCarousel();
        })

        // esc키로 모달창 닫기
        $modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                $modal.classList.remove('is-open');
                $modal.style.display = 'none'
                $modalItem.style.display = 'none'

                autoCarousel();
            }
        });

    })
});