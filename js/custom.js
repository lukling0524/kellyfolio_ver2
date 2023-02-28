// device sizes
$mq_tablet = 1100;

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




const $html = document.querySelector('html'),
    $wrap = document.querySelector('.wrap'),
    $header = document.querySelector('.header'),
    $logo = document.getElementById('logo'),
    $toggleBox = document.querySelector('.toggle__box');


// window.addEventListener('resize, scroll', function () {
//     $header.style.cssText = `
//         -webkit-backdrop-filter: blur(10px); 
//         backdrop-filter: blur(10px);
//     `;
// 
//     console.log('test')
// });



/*
    TweenMax.to(element, duration, css properties)
    TweenMax.fromTo(element, duration, css properties(from), css properties(to))
*/


// scroll magin 초기 선언
let $controller = new ScrollMagic.Controller();


// 인트로 (SVG drawing + header size 모션)

$tween_logoDraw = new TimelineMax()
    .delay(1)
    .add(TweenMax.to($path_k, 0.65, { strokeDashoffset: 0, ease: 'sine.in' }))
    .add(TweenMax.to($path_elly, 2.2, { strokeDashoffset: 0, ease: 'sine.in' }))
    .add(TweenMax.to($path_eye_l, 0.6, { delay: 0.4, strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }))
    .add(TweenMax.to($path_eye_r, 0.7, { delay: 0.1, strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }), 'queue')
    .add(TweenMax.to('.intro-box', 2, { height: 60, ease: 'power1.in' }), 'queue+=0.5')
    .add(TweenMax.to('#logo', 1.2, { width: 52, height: 'auto', left: window.innerWidth < 500 ? 20 : 40, marginLeft: 26, ease: 'power1.in' }), 'queue+=1.3')
    .add(TweenMax.fromTo('#toggle_btn', 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0 }), 'queue+=2')
    .call(() => {
        $wrap.classList.remove('loading');
        $header.classList.add('end');
    });



// $tween_logoDraw = new TimelineMax()
//     .add(TweenMax.to($path_k, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_elly, { strokeDashoffset: 0, ease: 'sine.in' }))
//     .add(TweenMax.to($path_eye_l, { strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to($path_eye_r, { strokeDashoffset: 0, ease: window.innerWidth < 500 ? 'sine.in' : 'elastic.out(1, 0.3)' }))
//     .add(TweenMax.to('.intro-box', { height: 60, ease: 'power1.in' }))
//     .add(TweenMax.to('#logo', { width: 52, height: 'auto', left: window.innerWidth < 500 ? 20 : 40, marginLeft: 26, ease: 'power1.in' }))
//     .add(TweenMax.fromTo('#toggle_btn', { opacity: 0, x: 100 }, { opacity: 1, x: 0 }))
//     .call(() => {
//         $wrap.classList.remove('loading');
//         $header.classList.add('end');
//     });
// 


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
    $scrollTopPos = [];

let $activeList = document.querySelector('.gnb__list.is-active');

// active-bar 초기설정 
$activeBg.style.width = $activeList.offsetWidth + 'px';
$activeBg.style.left = 0;

// active-bar 위치 
$gnbItem.forEach((item, idx) => {
    $scrollTopPos.push($scrollTarget[idx].offsetTop); // 각 섹션 scrollTop값 배열로 출력

    item.addEventListener('click', function () {
        if (window.innerWidth < $mq_tablet) {
            mobileMenuOpen();

        } else {
            navigation.destroy(true);

            // 클릭한 메뉴로 active-bar 이동
            $leftPos = this.offsetLeft;
            $activeBg.style.width = this.offsetWidth + 'px';
            $activeBg.style.left = $leftPos + 'px';

            this.parentNode.classList.add('is-active');

            $gnbItem.forEach((el) => {
                el.parentNode.classList.toggle('is-active', this === el);
            })
        }

        $menuData = this.getAttribute('data-name');
        $sectionTopPos = document.querySelector(`.section[data-name="${$menuData}"]`).offsetTop;

        // 클릭한 메뉴 섹션으로 스크롤 이동
        window.scroll(top, $sectionTopPos)
    })
});

const $hamburger = document.querySelector('.hamburger');


$hamburger.addEventListener('click', () => mobileMenuOpen());



function mobileMenuOpen() {
    $hamburger.classList.toggle('is-open');
    $header.classList.toggle('menu-open');

    if ($header.classList.contains('menu-open')) {
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }
}



// 스크롤 시 active-bar 이동
window.addEventListener('scroll', () => {
    const $menuList = document.querySelectorAll('.gnb__list');
    let $activeList = document.querySelector('.gnb__list.is-active');

    $menuList.forEach(el => {
        if (el.classList.contains('is-active')) {
            $leftPos = $activeList.offsetLeft;

            $activeBg.style.width = $activeList.offsetWidth + 'px';
            $activeBg.style.left = $leftPos + 'px';
        }
    });
})



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

// 탭키 이동 후 엔터로 테마 변겅
$themelabel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        $html.classList.toggle('light-theme');

        if ($html.classList.contains('light-theme')) {
            $themeCheckBox.checked = false;
        } else {
            $themeCheckBox.checked = true;
        }

        for (let i = 0; i < $themeIcons.length; i++) {
            $themeIcons[i].classList.toggle('on');
        }
    }
});


/*
 * 스크롤 애니메이션
 */


// Navigation slide down
const $tween_gnb = TweenMax.fromTo('.nav', 0.5, { opacity: 0, y: '-100%' }, { opacity: 1, y: '-50%' });

let navigation = new ScrollMagic.Scene({
    triggerElement: '.about__text--box',
    triggerHook: 0.3,
    offset: 150,
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


if (window.innerWidth < $mq_tablet) {
    navigation.destroy(true);
    navigation = null;

    console.log('gnb 고정 삭제')
}

// window.addEventListener('resize', function () {
//     if (window.innerWidth < $mq_tablet) {
//         $header.classList.remove('end')
//     } else {
//         $header.classList.add('end')
//     }
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
    duration: 1000,
    triggerElement: '.howtowork',
    triggerHook: 0,
    offset: -150,
})
    .setPin('.howtowork .section__title')
    .setClassToggle('.section__title', 'is-active')
    .addTo($controller)
// .addIndicators({
//     indent: 50,
//     name: '이렇게 일합니다',
//     colorStart: 'brown',
//     colorEnd: 'brown',
//     colorTrigger: 'brown',
// });

if (window.innerWidth < 500) {
    pinned.destroy(true);
    pinned = null;
}

window.addEventListener('resize', function () {
    if (window.innerWidth < 500) {
        pinned.destroy(true);
        pinned = null;
    }
});



// project 섹션 타이틀 slide up
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


// project 섹션 그리드영역 slide up
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







// 스크롤 시  Navigation text active

const $menuController = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: 0.25 } });

const $home = document.querySelector('.about__text'),
    $homeHeight = $home.offsetHeight;

new ScrollMagic.Scene({
    triggerElement: $home,
    duration: $homeHeight,
})
    .setClassToggle('#home', 'is-active')
    .addTo($menuController)
// .addIndicators({
//     name: '11111 home',
//     colorStart: 'red',
//     colorEnd: 'red',
//     indent: 0
// });


const $howtowork = document.querySelector('.howtowork .section__container'),
    $howtoworkHeight = $howtowork.offsetHeight;

new ScrollMagic.Scene({
    triggerElement: $howtowork,
    duration: $howtoworkHeight
})
    .setClassToggle('#howtowork', 'is-active')
    .addTo($menuController)
// .addIndicators({
//     name: '22222 how to work',
//     colorStart: 'yellow',
//     colorEnd: 'yellow',
//     indent: 100
// });

const $project = document.querySelector('.project .section__container'),
    $projectHeight = $project.offsetHeight;

new ScrollMagic.Scene({
    triggerElement: $project,
    duration: $projectHeight
})
    .setClassToggle('#project', 'is-active')
    .addTo($menuController)
// .addIndicators({
//     name: '33333 project',
//     colorStart: 'purple',
//     colorEnd: 'purple',
//     indent: 200
// });

new ScrollMagic.Scene({
    triggerElement: '.contact'
})
    .on('enter', () => { document.querySelector('#project').classList.remove('is-active') })
    .on('leave', () => { document.querySelector('#project').classList.add('is-active') })
    .setClassToggle('#contact', 'is-active')
    .addTo($menuController)
// .addIndicators({
//     name: '4444 contact',
//     colorStart: 'white',
//     colorEnd: 'white',
//     indent: 300
// });



// contact 이모티콘 move
let $contactWrap = document.querySelector('.contact__wrap'),
    $icons = document.querySelectorAll('.contact__icon'),
    $width = $contactWrap.offsetWidth - $icons[0].offsetWidth,
    $height = $contactWrap.offsetHeight - $icons[0].offsetHeight;

for (let i = 0; i < $icons.length; i++) {
    let x = Math.random() * $width;
    let y = Math.random() * $height;
    let vx = (Math.random() * 2) - (Math.random() * 2);
    let vy = (Math.random() * 2) - (Math.random() * 2);
    let speed = Math.round(Math.random() * 80);

    $icons[i].style.left = `${x}px`;
    $icons[i].style.top = `${y}px`;

    setInterval(() => {
        x += vx;
        y += vy;

        if (x <= 0 || x >= $width) {
            vx = -vx;
        }
        if (y <= 0 || y >= $height) {
            vy = -vy;
        }

        $icons[i].style.left = `${x}px`;
        $icons[i].style.top = `${y}px`;
    }, speed);
}

window.addEventListener('resize', function () {

    $contactWrap = document.querySelector('.contact__wrap');
    $icons = document.querySelectorAll('.contact__icon');

    $width = $contactWrap.offsetWidth - $icons[0].offsetWidth;
    $height = $contactWrap.offsetHeight - $icons[0].offsetHeight;
});




//project toggle
const $projectGrid = document.querySelector('.project__grid'),
    $projectItem = document.querySelectorAll('.project__item'),
    $displayBtn = document.getElementById('btn-display'),
    $screenTxt = $displayBtn.querySelector('.text-hide'),
    $toggleLines = $displayBtn.querySelectorAll('.line');

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

        $screenTxt.textContent = '접기';
        $toggleLines[0].classList.remove('rotate');
        this.classList.add('opened');
    } else {
        for (let i = 0; i < $projectItem.length; i++) {
            if (i >= 6) {
                $projectItem[i].style.display = 'none';
            }
        }
        $screenTxt.textContent = '더보기';
        $toggleLines[0].classList.add('rotate');
        this.classList.remove('opened');

        // 그리드 접었을 때 project 섹샨으로 스크롤 이동
        $projectTopPos = document.querySelector(`.section[data-name="project"]`).offsetTop;
        window.scroll(top, $projectTopPos)
    }
    $projectGrid.classList.toggle('default');
})

$displayBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        if ($projectGrid.classList.contains('default')) {
            for (let i = 0; i < $projectItem.length; i++) {
                $projectItem[i].style.display = 'flex';
            }

            $screenTxt.textContent = '접기';
            $toggleLines[0].classList.remove('rotate');
            this.classList.add('opened');
        } else {
            for (let i = 0; i < $projectItem.length; i++) {
                if (i >= 6) {
                    $projectItem[i].style.display = 'none';
                }
            }
            $screenTxt.textContent = '더보기';
            $toggleLines[0].classList.add('rotate');
            this.classList.remove('opened');

            // 그리드 접었을 때 project 섹샨으로 스크롤 이동
            $projectTopPos = document.querySelector(`.section[data-name="project"]`).offsetTop;
            window.scroll(top, $projectTopPos)
        }
        $projectGrid.classList.toggle('default');
    }
})

