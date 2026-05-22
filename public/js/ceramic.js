/**
 * CERAMIC — JavaScript
 * Full animation suite: scroll reveals, parallax, magnetic buttons,
 * counter animation, 3D tilt, custom cursor, smooth scroll, lightbox,
 * process scroll indicator, page transitions, marquee
 */
(function() {
    'use strict';

    // =====================================================================
    // NAVBAR — scroll effect + mobile menu
    // =====================================================================
    var nav = document.querySelector('.cer-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                nav.classList.add('cer-nav--scrolled');
            } else {
                nav.classList.remove('cer-nav--scrolled');
            }
        }, { passive: true });
    }

    var toggle = document.querySelector('.cer-nav__toggle');
    var navLinks = document.querySelector('.cer-nav__links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                navLinks.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    // =====================================================================
    // SMOOTH SCROLL — for anchor links
    // =====================================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =====================================================================
    // SCROLL PROGRESS BAR
    // =====================================================================
    var progressBar = document.querySelector('.cer-scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    // =====================================================================
    // INTERSECTION OBSERVER — unified reveal system
    // =====================================================================
    var revealSelectors = '.cer-fade-in, .cer-fade-scale, .cer-fade-left, .cer-fade-right, .cer-reveal-image, .cer-text-reveal, .cer-highlight';
    var revealElements = document.querySelectorAll(revealSelectors);

    if (revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    }

    // =====================================================================
    // HERO PARALLAX — subtle bg shift on scroll
    // =====================================================================
    var heroBg = document.querySelector('.cer-hero__bg');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            var scrollY = window.scrollY;
            var heroHeight = heroBg.parentElement.offsetHeight;
            if (scrollY < heroHeight) {
                var offset = scrollY * 0.35;
                heroBg.style.transform = 'translateY(' + offset + 'px) scale(1.05)';
            }
        }, { passive: true });
    }

    // =====================================================================
    // ATMOSPHERIC PARALLAX
    // =====================================================================
    var parallaxBg = document.querySelector('.cer-atmospheric__bg');
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            var section = parallaxBg.parentElement;
            var rect = section.getBoundingClientRect();
            var speed = 0.3;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                var offset = (window.innerHeight - rect.top) * speed;
                parallaxBg.style.transform = 'translateY(' + (-offset * 0.2) + 'px)';
            }
        }, { passive: true });
    }

    // =====================================================================
    // MAGNETIC BUTTONS — follow cursor subtly + radial glow
    // =====================================================================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.cer-btn').forEach(function(btn) {
            // Skip ghost buttons
            if (btn.classList.contains('cer-btn--ghost')) return;

            btn.addEventListener('mousemove', function(e) {
                var rect = btn.getBoundingClientRect();
                var x = ((e.clientX - rect.left) / rect.width) * 100;
                var y = ((e.clientY - rect.top) / rect.height) * 100;
                btn.style.setProperty('--x', x + '%');
                btn.style.setProperty('--y', y + '%');

                // Subtle magnetic pull (2px max)
                var centerX = rect.left + rect.width / 2;
                var centerY = rect.top + rect.height / 2;
                var deltaX = (e.clientX - centerX) * 0.08;
                var deltaY = (e.clientY - centerY) * 0.08;
                btn.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.transform = '';
            });
        });
    }

    // =====================================================================
    // 3D TILT on Product Cards
    // =====================================================================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.cer-card').forEach(function(card) {
            var imageWrap = card.querySelector('.cer-card__image-wrap');
            if (!imageWrap) return;

            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                var rotateX = (0.5 - y) * 6;
                var rotateY = (x - 0.5) * 6;
                imageWrap.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                imageWrap.style.transform = '';
            });
        });
    }

    // =====================================================================
    // CUSTOM CURSOR for Gallery
    // =====================================================================
    var cursor = document.querySelector('.cer-cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        var masonryItems = document.querySelectorAll('.cer-masonry__item');

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }, { passive: true });

        masonryItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                cursor.classList.add('cer-cursor--active');
            });
            item.addEventListener('mouseleave', function() {
                cursor.classList.remove('cer-cursor--active');
            });
        });
    }

    // =====================================================================
    // COUNTER ANIMATION — admin dashboard numbers
    // =====================================================================
    var counters = document.querySelectorAll('.cer-admin-stat__number');
    if (counters.length > 0) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(counter) {
            var value = parseInt(counter.textContent, 10);
            if (!isNaN(value) && value > 0) {
                counter.setAttribute('data-count', value);
                counter.textContent = '0';
                counterObserver.observe(counter);
            }
        });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 1200;
        var start = performance.now();

        function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * ease);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // =====================================================================
    // PROCESS SECTION — horizontal scroll indicator
    // =====================================================================
    var processScroll = document.querySelector('.cer-process');
    var processBar = document.querySelector('.cer-process-progress__bar');
    if (processScroll && processBar) {
        processScroll.addEventListener('scroll', function() {
            var scrollLeft = processScroll.scrollLeft;
            var scrollWidth = processScroll.scrollWidth - processScroll.clientWidth;
            var pct = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
            processBar.style.width = pct + '%';
        }, { passive: true });
    }

    // =====================================================================
    // LIGHTBOX — with keyboard & swipe navigation
    // =====================================================================
    var lightbox = document.getElementById('cer-lightbox');
    if (lightbox) {
        var lightboxImg = lightbox.querySelector('img');
        var closeBtn = lightbox.querySelector('.cer-lightbox__close');
        var galleryImages = [];
        var currentImageIndex = 0;

        document.querySelectorAll('.cer-masonry__item').forEach(function(item, index) {
            var img = item.querySelector('img');
            if (img) {
                galleryImages.push(img.src);
                item.addEventListener('click', function() {
                    currentImageIndex = index;
                    showLightboxImage(currentImageIndex);
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        });

        function showLightboxImage(index) {
            if (galleryImages[index]) {
                lightboxImg.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(function() {
                    lightboxImg.src = galleryImages[index];
                    lightboxImg.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                }, 150);
            }
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        // Arrow buttons
        var prevBtn = lightbox.querySelector('.cer-lightbox__prev');
        var nextBtn = lightbox.querySelector('.cer-lightbox__next');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    showLightboxImage(currentImageIndex);
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImageIndex < galleryImages.length - 1) {
                    currentImageIndex++;
                    showLightboxImage(currentImageIndex);
                }
            });
        }

        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight' && currentImageIndex < galleryImages.length - 1) {
                currentImageIndex++;
                showLightboxImage(currentImageIndex);
            }
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                currentImageIndex--;
                showLightboxImage(currentImageIndex);
            }
        });

        // Swipe support
        var touchStartX = 0;
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentImageIndex < galleryImages.length - 1) {
                    currentImageIndex++;
                    showLightboxImage(currentImageIndex);
                } else if (diff < 0 && currentImageIndex > 0) {
                    currentImageIndex--;
                    showLightboxImage(currentImageIndex);
                }
            }
        }, { passive: true });
    }

    // =====================================================================
    // PRODUCT GALLERY — thumb switching with fade
    // =====================================================================
    var thumbs = document.querySelectorAll('.cer-product__thumb');
    var mainImg = document.querySelector('.cer-product__main-image');
    if (thumbs.length > 0 && mainImg) {
        thumbs.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                mainImg.style.opacity = '0.5';
                var src = thumb.src;
                setTimeout(function() {
                    mainImg.src = src;
                    mainImg.style.opacity = '1';
                }, 150);
                thumbs.forEach(function(t) { t.classList.remove('cer-product__thumb--active'); });
                this.classList.add('cer-product__thumb--active');
            });
        });
    }

    // =====================================================================
    // PAGE TRANSITIONS — smooth fade on internal link clicks
    // =====================================================================
    document.querySelectorAll('a').forEach(function(link) {
        if (!link.href) return;
        if (link.hostname !== window.location.hostname) return;
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href === '') return;
        if (link.getAttribute('target') === '_blank') return;
        if (link.classList.contains('delete')) return;
        if (link.closest('form')) return;
        if (link.getAttribute('onclick')) return;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.25s ease';
            var target = href;
            setTimeout(function() {
                window.location.href = target;
            }, 250);
        });
    });

    // =====================================================================
    // MARQUEE — pause on hover
    // =====================================================================
    var marqueeTrack = document.querySelector('.cer-marquee__track');
    if (marqueeTrack) {
        var marquee = marqueeTrack.parentElement;
        marquee.addEventListener('mouseenter', function() {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', function() {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }

    // =====================================================================
    // FORM SUCCESS — replace flash with animated SVG checkmark
    // =====================================================================
    var flashEl = document.querySelector('.cer-order .cer-flash');
    if (flashEl) {
        var flashText = flashEl.textContent.trim();
        flashEl.outerHTML = '<div class="cer-success-check">' +
            '<svg viewBox="0 0 64 64">' +
            '<circle class="cer-check-circle" cx="32" cy="32" r="28" />' +
            '<polyline class="cer-check-mark" points="20,34 28,42 44,24" />' +
            '</svg>' +
            '<div class="cer-success-check__text">' + flashText + '</div>' +
            '</div>';
    }

    // =====================================================================
    // IMAGE LAZY REVEAL — fade in images as they load
    // =====================================================================
    document.querySelectorAll('.cer-card__image, .cer-masonry__item img').forEach(function(img) {
        if (img.complete) return;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.addEventListener('load', function() {
            img.style.opacity = '1';
        });
    });

    // =====================================================================
    // HAMBURGER ANIMATION — inject dynamic styles
    // =====================================================================
    var style = document.createElement('style');
    style.textContent = [
        '.cer-nav__toggle.active span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }',
        '.cer-nav__toggle.active span:nth-child(2) { opacity: 0; }',
        '.cer-nav__toggle.active span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }',
        '.cer-lightbox img { transition: opacity 0.15s ease, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }',
        '.cer-product__main-image { transition: opacity 0.15s ease; }',
    ].join('\n');
    document.head.appendChild(style);

})();

