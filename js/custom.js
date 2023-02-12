
const $html = document.querySelector('html'),
    $wrap = document.querySelector('.wrap'),
    $scrollTop = document.querySelector('.scroll-top'),
    $logo = document.getElementById('logo'),
    $eye_l = document.querySelector('.logo__eye-l'),
    $eye_r = document.querySelector('.logo__eye-r'),
    $scrollText = document.querySelector('.scroll'),
    $toggleBox = document.querySelector('.toggle__box');


const vh = window.innerHeight * 0.01;   // [1]
document.documentElement.style.setProperty('--vh', `${vh}px`); // [2]


/**
* 초기화면 로딩시
*/
setTimeout(function () {
    $wrap.classList.remove('loading');
    $scrollText.classList.add('show');
}, 6600)


/**
 * LOGO 눈 path 상하 움직임 animation 
 */
setTimeout(function () {
    $eye_l.classList.add('action');
    $eye_r.classList.add('action');
}, 6000)


/**
 * 로고 클릭 시, 새로고침 시 scrollY = 0
 */
$scrollTop.addEventListener('click', function () {
    window.scroll({ top: 0, behavior: 'smooth' });
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


/**
 * 라이트모드-다크모드 토글 버튼
 */
const $toggleBtn = document.querySelector('.toggle__item'),
    $themeIcons = document.querySelectorAll('.toggle__icon .item');

$toggleBtn.addEventListener('click', function () {
    $html.classList.toggle('light-theme');

    for (let i = 0; i < $themeIcons.length; i++) {
        $themeIcons[i].classList.toggle('on');

    }
})



/**
 * 스크롤 애니메이션
 */

// 변수선언
const $100vh = `calc(var(--vh, 1vh) * 100)`,
    $height = 80,
    $introPageDuration = 1.5,
    $ease = 'ease : Expo.easeOut',
    $introSetting = {
        duration: '20%',
        triggerHook: 0,
        offset: 10,
    };


// scroll magin 초기 선언
const $controller = new ScrollMagic.Controller({});

// 스크롤 메세지 display
const $tween_scrollMSG = TweenMax.to('.scroll', 0.1, { opacity: 0 });

new ScrollMagic.Scene({
    triggerHook: 0,
    offset: 10,
})
    .setTween($tween_scrollMSG)
    .addTo($controller)
// .addIndicators({
//     indent: 500,
//     name: '스크롤 메세지',
//     colorStart: 'red',
//     colorEnd: 'red',
//     colorTrigger: 'red',
// });


// 로고 포지션 이동
const $tween_logo =
    TweenMax.fromTo('#logo', $introPageDuration, {
        left: '50%',
    }, {
        width: 60,
        height: 'auto',
        left: 80,
        $ease,
    });

new ScrollMagic.Scene($introSetting)
    .setTween($tween_logo)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: 'LOGO',
//     colorStart: '#ffa500',
//     colorEnd: '#ffa500',
//     colorTrigger: '#ffa500',
// });


// header (블러영역) 높이 변경
const $tween_header = TweenMax.fromTo('#header', $introPageDuration, { height: $100vh }, { height: $height, $ease });

new ScrollMagic.Scene($introSetting)
    .setTween($tween_header)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '인트로 영역(로고+블러헤더+오브제박스)',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     colorTrigger: 'yellow',
// });


//오브제박스 영역 높이 변경
const $tween_objBOX = TweenMax.fromTo('#obj-box', $introPageDuration, { height: $100vh }, { height: $height, $ease });

new ScrollMagic.Scene($introSetting)
    .setTween($tween_objBOX)
    .addTo($controller);



// 테마 변경 토글버튼 display
const $tween_toggle = TweenMax.fromTo(
    '#toggle_btn', 1, { opacity: 0, x: 200 }, { opacity: 1, x: 0, $ease });

new ScrollMagic.Scene({
    duration: 10,
    triggerElement: '.contents',
    triggerHook: 0,
    // offset: 10,
})
    .setTween($tween_toggle)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '토글버튼',
//     colorStart: 'green',
//     colorEnd: 'green',
//     colorTrigger: 'green',
// });


// About section 아바타 비디오 scroll 모션
const $video = document.querySelector('.avata');

let $videoScroll = new ScrollMagic.Scene({
    duration: 3000,
    triggerElement: '.about',
    triggerHook: 0,
    offset: 100,
})
    .setPin('.about')
    .addTo($controller)
// .addIndicators({
//     indent: 50,
//     name: '비디오 비디오',
//     colorStart: 'black',
//     colorEnd: 'black',
//     colorTrigger: 'black',
// });


//Video Animation
let $accelamount = 0.1;
let $scrollpos = 0;
let $delay = 0;

$videoScroll.on('update', e => {
    if (e.scrollPos > e.startPos) {
        $scrollpos = e.scrollPos / 1000;
    }
});

setInterval(() => {
    $delay += ($scrollpos - $delay) * $accelamount;
    $video.currentTime = $scrollpos;
}, 233.1);


// about 텍스트 slide up
const $tween_about = TweenMax.fromTo('.about__text', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0, $ease });
new ScrollMagic.Scene({
    // duration: '100%',
    triggerElement: '.about__text',
    triggerHook: 0.8,

})
    .setTween($tween_about)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '자기소개 텍스트',
//     colorStart: 'blue',
//     colorEnd: 'blue',
//     colorTrigger: 'blue',
// });


//how to work 섹션 pinned 모션
new ScrollMagic.Scene({
    duration: 900,
    triggerElement: '.howtowork',
    triggerHook: 0,
})
    .setPin('.howtowork .section-title')
    .setClassToggle('.section-title', 'is-active')
    .addTo($controller)
// .addIndicators({
//     indent: 50,
//     name: '이렇게 일합니다',
//     colorStart: 'red',
//     colorEnd: 'red',
//     colorTrigger: 'red',
// });


// contact 타이틀 opacity
const $tween_contact = TweenMax.fromTo('.contact .section-title', 0.5, { opacity: 0 }, { opacity: 1 });
new ScrollMagic.Scene({
    duration: 500,
    triggerElement: '.contact',
    triggerHook: 0.5,
    offset: -300,

})
    .setTween($tween_contact)
    .addTo($controller)
// .addIndicators({
//     indent: 100,
//     name: '연락처 타이틀',
//     colorStart: 'pink',
//     colorEnd: 'pink',
//     colorTrigger: 'pink',
// });


// 이메일 텍스트 slide left
const $tween_email = TweenMax.fromTo('.contact__email', 3, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Elastic.easeOut.config(1, 0.3) });
new ScrollMagic.Scene({
    // duration: 500,
    triggerElement: '.contact .section-title',
    triggerHook: 0.5,
    offset: -50,
})
    .setTween($tween_email)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '이메일 타이틀',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     colorTrigger: 'yellow',
// });


const box = document.querySelector('.contact__wrap');
const items = document.querySelectorAll('.contact__icon');

const width = box.offsetWidth - items[0].offsetWidth;
const height = box.offsetHeight - items[0].offsetHeight;

for (let i = 0; i < items.length; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let vx = (Math.random() * 2) - (Math.random() * 2);
    let vy = (Math.random() * 2) - (Math.random() * 2);
    let speed = Math.round(Math.random() * 80);

    items[i].style.left = `${x}px`;
    items[i].style.top = `${y}px`;

    setInterval(() => {
        x += vx;
        y += vy;

        if (x <= 0 || x >= width) {
            vx = -vx;
        }
        if (y <= 0 || y >= height) {
            vy = -vy;
        }

        items[i].style.left = `${x}px`;
        items[i].style.top = `${y}px`;
    }, speed);
}

window.addEventListener("resize", function () {
    width = box.innerWidth;
    height = box.innerHeight;
});
