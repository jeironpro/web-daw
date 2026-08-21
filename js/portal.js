(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = () => motionQuery.matches;

    const nav = document.querySelector('[data-nav]');
    const burger = document.querySelector('[data-burger]');
    const mobileMenu = document.getElementById('menu-mobil');
    const dropdownButtons = [...document.querySelectorAll('[data-dropdown]')];
    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    const counters = [...document.querySelectorAll('[data-count]')];

    const closeAllDropdowns = except => {
        dropdownButtons.forEach(button => {
            if (button !== except) button.setAttribute('aria-expanded', 'false');
        });
        document
            .querySelectorAll('.nav__dropdown.is-open')
            .forEach(menu => menu !== except && menu.classList.remove('is-open'));
    };

    dropdownButtons.forEach(button => {
        const menu = button.nextElementSibling;
        button.addEventListener('click', () => {
            const open = button.getAttribute('aria-expanded') === 'true';
            closeAllDropdowns(open ? null : button);
            button.setAttribute('aria-expanded', String(!open));
            if (menu) menu.classList.toggle('is-open', !open);
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.nav__item--menu')) closeAllDropdowns(null);
    });

    const setMobileMenu = open => {
        if (!burger || !mobileMenu) return;
        burger.setAttribute('aria-expanded', String(open));
        mobileMenu.hidden = !open;
        if (open) closeAllDropdowns(null);
    };

    burger?.addEventListener('click', () => {
        setMobileMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const openButton = dropdownButtons.find(
            button => button.getAttribute('aria-expanded') === 'true'
        );
        if (openButton) {
            closeAllDropdowns(null);
            openButton.focus();
            return;
        }
        if (burger?.getAttribute('aria-expanded') === 'true') {
            setMobileMenu(false);
            burger.focus();
        }
    });

    document.querySelectorAll('.nav__mobile-link, .nav__dropitem').forEach(link => {
        link.addEventListener('click', () => {
            setMobileMenu(false);
            closeAllDropdowns(null);
        });
    });

    let navTicking = false;
    const updateNav = () => {
        nav?.classList.toggle('is-scrolled', window.scrollY > 24);
        navTicking = false;
    };
    updateNav();
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            navTicking = true;
            requestAnimationFrame(updateNav);
        }
    }, { passive: true });

    if ('IntersectionObserver' in window) {
        const groups = new Map();
        revealItems.forEach(item => {
            const parent = item.parentElement;
            const index = groups.get(parent)?.length ?? 0;
            groups.set(parent, [...(groups.get(parent) ?? []), item]);
            item.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
        });
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
        );
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }

    if (parallaxItems.length && !reducedMotion()) {
        let parallaxTicking = false;
        const updateParallax = () => {
            const viewportMiddle = window.innerHeight / 2;
            parallaxItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const offset = rect.top + rect.height / 2 - viewportMiddle;
                item.style.transform = `translate3d(0, ${(-offset * parseFloat(item.dataset.parallax)).toFixed(1)}px, 0)`;
            });
            parallaxTicking = false;
        };
        const requestParallax = () => {
            if (!parallaxTicking) {
                parallaxTicking = true;
                requestAnimationFrame(updateParallax);
            }
        };
        updateParallax();
        window.addEventListener('scroll', requestParallax, { passive: true });
        window.addEventListener('resize', requestParallax, { passive: true });
    }

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        if (!Number.isFinite(target) || reducedMotion()) return;
        const duration = 1200;
        let start = null;
        counter.textContent = '0';
        const tick = now => {
            if (start === null) start = now;
            const progress = Math.min((now - start) / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            counter.textContent = Math.round(eased * target);
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = target;
                counter.animate(
                    [
                        { scale: '1' },
                        { scale: '1.06', offset: 0.6 },
                        { scale: '1' },
                    ],
                    { duration: 320, easing: 'ease-out' }
                );
            }
        };
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                counterObserver.unobserve(entry.target);
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.5 });
        counterObserver.observe(counter);
    });
})();
