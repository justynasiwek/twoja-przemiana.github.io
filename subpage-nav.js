(function () {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarWrap = document.getElementById('navbar-wrap');
    const navbarSpacer = document.getElementById('navbar-spacer');

    if (!menuBtn || !mobileMenu || !navbarWrap || !navbarSpacer) return;

    let expandedNavbarHeight = navbarWrap.offsetHeight;

    function positionMobileMenu() {
        mobileMenu.style.top = navbarWrap.offsetHeight + 'px';
    }

    function setMobileMenu(open) {
        menuBtn.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
        mobileMenu.classList.toggle('open', open);
        mobileMenu.setAttribute('aria-hidden', String(!open));
        mobileMenu.style.display = open ? '' : 'none';
        if (open) positionMobileMenu();
    }

    function setNavbarSpacer() {
        if (!navbarWrap.classList.contains('scrolled')) {
            expandedNavbarHeight = navbarWrap.offsetHeight;
        }
        navbarSpacer.style.height = expandedNavbarHeight + 'px';
    }

    menuBtn.addEventListener('click', function () {
        setMobileMenu(!mobileMenu.classList.contains('open'));
    });

    document.querySelectorAll('.nav-link-mobile').forEach(function (link) {
        link.addEventListener('click', function () {
            setMobileMenu(false);
        });
    });

    window.addEventListener('scroll', function () {
        navbarWrap.classList.toggle('scrolled', window.scrollY > 40);
        requestAnimationFrame(positionMobileMenu);
    }, { passive: true });

    window.addEventListener('resize', function () {
        setNavbarSpacer();
        positionMobileMenu();
        if (window.innerWidth >= 1200) setMobileMenu(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
            setMobileMenu(false);
            menuBtn.focus();
        }
    });

    document.addEventListener('click', function (event) {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)) {
            setMobileMenu(false);
        }
    });

    if ('ResizeObserver' in window) {
        new ResizeObserver(positionMobileMenu).observe(navbarWrap);
    }

    setNavbarSpacer();
    positionMobileMenu();
})();
