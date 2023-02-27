// ios 대응 vh css 변수 설정
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


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



const $html = document.querySelector('html'),
    $wrap = document.querySelector('.wrap'),
    $header = document.querySelector('.header'),
    $logo = document.getElementById('logo'),
    $toggleBox = document.querySelector('.toggle__box');


// scroll magin 초기 선언
let $controller = new ScrollMagic.Controller({});


/**
* 인트로 (SVG drawing + header size 모션)
*/
// $tween_logoDraw = new TimelineMax()
//     .delay(1)
//     .add(TweenMax.to($path_k, 0.65, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_elly, 2.2, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_eye_l, 0.6, { delay: 0.4, strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to($path_eye_r, 0.7, { delay: 0.1, strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }), 'queue')
//     .add(TweenMax.to('.intro-box', 2, { height: 60, ease: 'power1.in' }), 'queue+=0.5')
//     .add(TweenMax.to('#logo', 1.2, { width: 52, height: 'auto', left: window.innerWidth < 500 ? 20 : 40, marginLeft: 26, ease: 'power1.in' }), 'queue+=1.3')
//     .add(TweenMax.fromTo('#toggle_btn', 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0 }), 'queue+=2')
//     .call(() => {
//         $wrap.classList.remove('loading');
//$header.classList.add('end');
//     });



$tween_logoDraw = new TimelineMax()
    .add(TweenMax.to($path_k, { strokeDashoffset: 0, ease: 'sine.in' }))
    .add(TweenMax.to($path_elly, { strokeDashoffset: 0, ease: 'sine.in' }))
    .add(TweenMax.to($path_eye_l, { strokeDashoffset: 0, ease: 'elastic.out(1, 0.3)' }))
    .add(TweenMax.to($path_eye_r, { strokeDashoffset: 0, ease: 'elastic.out(1, 0.3)' }))
    .add(TweenMax.to('.intro-box', { height: 60, ease: 'power1.in' }))
    .add(TweenMax.to('#logo', { width: 52, height: 'auto', left: 40, marginLeft: 26, ease: 'power1.in' }))
    .add(TweenMax.fromTo('#toggle_btn', { opacity: 0, x: 100 }, { opacity: 1, x: 0 }))
    .call(() => {
        $wrap.classList.remove('loading');
        $header.classList.add('end');
    });



/**
 * 로고 클릭 시 리다이렉트 
 */

$logo.addEventListener('click', function (e) {
    if ($wrap.classList.contains('loading')) {
        e.preventDefault();
    } else {
        window.location.href = 'http://kellyfolio.com/home.html'
    }
});

/**
 *  Navigation hover 
 */
const $gnb = document.querySelector('.gnb'),
    $activeList = document.querySelector('.gnb__list.is-active'),
    $gnbItem = document.querySelectorAll('.gnb__item'),
    $activeBg = document.querySelector('.active-bar');

// active bar 넓이 초기세팅
// $activeBg.style.width = $activeList.offsetWidth + 'px';


$gnbItem.forEach((item) => {

    item.addEventListener('click', function () {

        this.parentNode.classList.add('is-active');

        $gnbItem.forEach((el) => {
            el.parentNode.classList.toggle('is-active', this === el);
        })

        leftPos = this.offsetLeft;

        $activeBg.style.width = this.offsetWidth + 'px';
        $activeBg.style.left = leftPos + 'px';


    })
});





/**
 * 라이트모드-다크모드 테마 토글 버튼
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



// GNB slide down
const $tween_gnb = TweenMax.fromTo('.nav', 0.5, { opacity: 0, y: -50 }, { opacity: 1, y: 0 });

new ScrollMagic.Scene({
    triggerElement: '.howtowork',
    triggerHook: 1,
})
    .setTween($tween_gnb)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: 'gnb',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     colorTrigger: 'yellow',
// });






// About section 아바타 이미지 시퀀스
const $avataImgSqc = new Array();
const $imgTag = document.querySelector('.avata__sequence');

for (let i = 1; i < 48; i++) {
    $avataImgSqc.push(`./images/imagesequence/avata-${i}.png`);
}

const $img = { crntImg: 0 };

let $tween_avata = TweenMax.to($img, 0.5, {
    crntImg: $avataImgSqc.length - 1,
    roundProps: 'crntImg',
    immediateRender: true,
    onUpdate: function () {
        $imgTag.setAttribute('src', $avataImgSqc[$img.crntImg])
    }
});

new ScrollMagic.Scene({
    duration: 3000,
    triggerElement: '.about',
    triggerHook: 0,
    offset: -60,
})
    .setTween($tween_avata)
    .setPin('.about')
    .addTo($controller)
// .addIndicators({
//     name: '이미지시퀀스',
//     colorStart: 'red',
//     colorEnd: 'red',
//     indent: 10
// });





// about 텍스트 slide up
const $tween_about = TweenMax.fromTo('.about__text', 0.5, { opacity: 0, y: 60 }, { opacity: 1, y: 0 });
new ScrollMagic.Scene({
    // duration: '100%',
    triggerElement: '.about__text',
    triggerHook: 0.9,

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


//how to work 타이틀 slide left to right (mobile only)

if (window.innerWidth < 500) {

    const $tween_howtoTitle = TweenMax.fromTo('.howtowork .section__title', 10, { x: -300 }, { x: 0 });

    new ScrollMagic.Scene({
        duration: '50%',
        triggerElement: '.about__text',
        triggerHook: 0,
        offset: '300%'
    })
        .setTween($tween_howtoTitle)
        .addTo($controller)
    // .addIndicators({
    //     indent: 0,
    //     name: '이렇게일합니다',
    //     colorStart: 'red',
    //     colorEnd: 'red',
    //     colorTrigger: 'red',
    // });
}




//how to work 섹션 pinned 모션
let pinned = new ScrollMagic.Scene({
    duration: 900,
    triggerElement: '.howtowork',
    triggerHook: 0,
})
    .setPin('.howtowork .section__title')
    .setClassToggle('.section__title', 'is-active')
    .addTo($controller)
    .addIndicators({
        indent: 50,
        name: '이렇게 일합니다',
        colorStart: 'brown',
        colorEnd: 'brown',
        colorTrigger: 'brown',
    });

if (window.innerWidth < 500) {
    pinned.destroy(true);
    pinned = null;
}


// project 섹션 slide up
$tween_project = new TimelineMax()
    .add(TweenMax.fromTo('.project__wrap .section__title', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }), 'queue')
    .add(TweenMax.fromTo('.project__wrap .btn', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }), 'queue+=0.1');

new ScrollMagic.Scene({
    // duration: '100%',
    triggerElement: '.project',
    triggerHook: 0.6,

})
    .setTween($tween_project)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '프로젝트 타이틀',
//     colorStart: 'red',
//     colorEnd: 'red',
//     colorTrigger: 'red',
// });


// project 섹션 slide up
const $tween_grid = TweenMax.fromTo('.project__grid', 0.7, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });


new ScrollMagic.Scene({
    // duration: '100%',
    triggerElement: '.project__wrap',
    triggerHook: 0.5,
})
    .setTween($tween_grid)
    .addTo($controller)
// .addIndicators({
//     indent: 0,
//     name: '그리드',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     colorTrigger: 'yellow',
// });




// contact 타이틀 opacity
const $tween_contact = TweenMax.fromTo('.contact .section__title', 0.5, { opacity: 0 }, { opacity: 1 });
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
    triggerElement: '.contact .section__title',
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


let box = document.querySelector('.contact__wrap'),
    items = document.querySelectorAll('.contact__icon'),
    width = box.offsetWidth - items[0].offsetWidth,
    height = box.offsetHeight - items[0].offsetHeight;

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

window.addEventListener('resize', function () {


    box = document.querySelector('.contact__wrap');
    items = document.querySelectorAll('.contact__icon');

    width = box.offsetWidth - items[0].offsetWidth;
    height = box.offsetHeight - items[0].offsetHeight;
});




const $projectGrid = document.querySelector('.project__grid'),
    $projectItem = document.querySelectorAll('.project__item'),
    $displayBtn = document.getElementById('btn-display');

for (let i = 0; i < $projectItem.length; i++) {
    if (i >= 6) {
        $projectItem[i].style.display = 'none';
    }
}

$displayBtn.addEventListener('click', function () {


    if ($projectGrid.classList.contains('default')) {
        for (let i = 0; i < $projectItem.length; i++) {
            $projectItem[i].style.display = 'flex';
        }

        this.querySelector('span').textContent = '접기';
    } else {
        for (let i = 0; i < $projectItem.length; i++) {
            if (i >= 6) {
                $projectItem[i].style.display = 'none';
            }
        }
        this.querySelector('span').textContent = '더보기';
    }
    $projectGrid.classList.toggle('default');
})