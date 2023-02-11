
const $html = document.querySelector('html'),
    $wrap = document.querySelector('.wrap'),
    $scrollTop = document.querySelector('.scroll-top'),
    $logo = document.getElementById('logo'),
    $eye_l = document.querySelector('.logo__eye-l'),
    $eye_r = document.querySelector('.logo__eye-r'),
    $scrollText = document.querySelector('.scroll'),
    $toggleBox = document.querySelector('.toggle__box');



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

    console.log(`리로드`);
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
const $height = 80,
    $introPageDuration = 0.05;


// scroll magin 초기 선언
const controller = new ScrollMagic.Controller({});

// 스크롤 메세지 display
const tween_scrollMSG = TweenMax.to('.scroll', $introPageDuration, { opacity: 0 });

new ScrollMagic.Scene({
    // duration: '20%',
    triggerHook: 0,
    offset: 10,
})
    .setTween(tween_scrollMSG)
    .addTo(controller)
// .addIndicators({
//     indent: 100,
//     name: '스크롤 메세지',
//     colorStart: 'red',
//     colorEnd: 'red',
//     colorTrigger: 'red',
// });




// 로고 포지션 이동
const tween_logo =
    TweenMax.fromTo('#logo', 0.1, {
        left: '50%',
    }, {
        width: 60,
        height: 'auto',
        left: 80,
    });

new ScrollMagic.Scene({
    triggerHook: 0,
    offset: 10,
})
    .setTween(tween_logo)
    .addTo(controller)
// .addIndicators({
//     indent: 0,
//     name: 'LOGO',
//     colorStart: '#ffa500',
//     colorEnd: '#ffa500',
//     colorTrigger: '#ffa500',
// });



// header (블러영역) 높이 변경
const tween_header = TweenMax.fromTo('#header', $introPageDuration, { height: '100vh' }, { height: $height });

new ScrollMagic.Scene({
    triggerHook: 0,
    offset: 10,
})
    .setTween(tween_header)
    .addTo(controller)
// .addIndicators({
//     indent: 100,
//     name: '블러 헤더 영역',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     colorTrigger: 'yellow',
// });



//오브제박스 영역 높이 변경
const tween_objBOX = TweenMax.fromTo('#obj-box', $introPageDuration, { height: '100vh' }, { height: $height });

new ScrollMagic.Scene({
    triggerHook: 0,
    offset: 10,
})
    .setTween(tween_objBOX)
    .addTo(controller);



// 배경 오브젝트 포지션 이동
const tween_obj = TweenMax.to('.top-obj', 3, { y: '-50%' });
new ScrollMagic.Scene({
    duration: '100%',
    triggerHook: 0,
})
    .setTween(tween_obj)
    .addTo(controller)
// .addIndicators({
//     indent: 200,
//     name: '오브제 위치 변경',
//     colorStart: 'pink',
//     colorEnd: 'pink',
//     colorTrigger: 'pink',
// });



// 테마 변경 토글버튼 display
const tween_toggle = TweenMax.fromTo(
    '#toggle_btn', 1, { opacity: 0 }, { opacity: 1 });

new ScrollMagic.Scene({
    duration: 10,
    triggerElement: '.contents',
    triggerHook: 0,
    // offset: 10,
})
    .setTween(tween_toggle)
    .addTo(controller)
// .addIndicators({
//     indent: 0,
//     name: 'toggle display',
//     colorStart: 'green',
//     colorEnd: 'green',
//     colorTrigger: 'green',
// });



// About section 아바타 비디오 scroll 모션
const video = document.querySelector('.avata');

let videoScroll = new ScrollMagic.Scene({
    duration: 4000,
    triggerElement: '.about',
    triggerHook: 0,
    offset: 100,
})
    .setPin('.about')
    .addTo(controller)
// .addIndicators({
//     indent: 50,
//     name: '비디오 비디오',
//     colorStart: 'black',
//     colorEnd: 'black',
//     colorTrigger: 'black',
// });


//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

videoScroll.on('update', e => {
    if (e.scrollPos > e.startPos) {
        scrollpos = e.scrollPos / 1000;

        console.log('active');
    }
});

setInterval(() => {
    delay += (scrollpos - delay) * accelamount;
    video.currentTime = scrollpos;
}, 233.1);





// about 텍스트 slide up
const tween_about = TweenMax.fromTo('.about__text', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
new ScrollMagic.Scene({
    // duration: '100%',
    triggerElement: '.about__text',
    triggerHook: 0.8,

})
    .setTween(tween_about)
    .addTo(controller)
// .addIndicators({
//     indent: 200,
//     name: '자기소개 텍스트',
//     colorStart: 'pink',
//     colorEnd: 'pink',
//     colorTrigger: 'pink',
// });





//how to work 섹션 pinned 모션
new ScrollMagic.Scene({
    duration: 900,
    triggerElement: '.howtowork',
    triggerHook: 0,
})
    .setPin('.howtowork .section-title')
    .setClassToggle('.section-title', 'is-active')
    .addTo(controller)
// .addIndicators({
//     indent: 50,
//     name: '이렇게 일합니다',
//     colorStart: 'red',
//     colorEnd: 'red',
//     colorTrigger: 'red',
// });







// 
// //랜덤아이콘  
// const $iconSection = document.querySelector('.howtowork');
// 
// let $posX = [],
//     $posY = [];
// 
// for (let i = 0; i < 6; i++) {
//     $iconSection.insertAdjacentHTML('afterbegin', `<div class="random-icon text-hide">배경 랜덤 아이콘</div>`);
// 
//     $posX.push(Math.floor(Math.random() * 100));
//     $posY.push(Math.floor(Math.random() * 100));
// }
// 
// 
// const $randomIcon = document.querySelectorAll('.random-icon');
// 
// $randomIcon.forEach((icon, idx) => {
//     icon.style.cssText = `
//         top : ${$posY[idx]}%;
//         left : ${$posX[idx]}%;
//         background-image : url(../images/ico-random_${idx}.svg);
//     `
// 
//     var timeline = new TimelineMax();
// 
//     const tween_icons1 = TweenMax.to('.random-icon:nth-child(odd)', 6, { rotation: 360 });
//     const tween_icons2 = TweenMax.to('.random-icon:nth-child(even)', 6, { rotation: -360 });
// 
//     timeline.add(tween_icons1).add(tween_icons2);
// 
//     new ScrollMagic.Scene({
//         duration: 2000,
//         triggerElement: '.random-icon:nth-child(' + (idx + 1) + ')',
//         triggerHook: 0.5,
//         offset: -100,
//     })
//         .setClassToggle('.random-icon:nth-child(' + (idx + 1) + ')', 'is-active')
//         .setTween(timeline)
//         .addTo(controller)
//         .addIndicators({
//             indent: 100,
//             name: '아이콘 애니',
//             colorStart: 'green',
//             colorEnd: 'green',
//             colorTrigger: 'green',
//         });
// });
// 



// contact 타이틀 opacity
const tween_contact = TweenMax.fromTo('.contact .section-title', 0.5, { opacity: 0 }, { opacity: 1 });
new ScrollMagic.Scene({
    duration: '30%',
    triggerElement: '.contact',
    triggerHook: 0.5,
    offset: -300,

})
    .setTween(tween_contact)
    .addTo(controller)
// .addIndicators({
//     indent: 100,
//     name: '연락처 타이틀',
//     colorStart: 'pink',
//     colorEnd: 'pink',
//     colorTrigger: 'pink',
// });


