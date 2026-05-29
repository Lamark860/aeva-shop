// Анимации и микро-интеракции для прототипа.
// Все таймминги используют ease-out с длинным затуханием — «инерция глины».

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

// ---------- useScrollFade ----------
// Добавляет элементу .is-visible когда он попадает в viewport.
// CSS подхватывает: opacity 0 → 1, translateY 24px → 0, длительность 900ms.
function useScrollFade(opts = {}) {
  const { threshold = 0.15, once = true, delay = 0 } = opts;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible');
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, delay]);
  return ref;
}

// ---------- useStaggerChildren ----------
// Тот же IntersectionObserver, но добавляет .is-visible детям с шагом задержки.
function useStaggerChildren(step = 80, opts = {}) {
  const { threshold = 0.1, childSelector = ':scope > *' } = opts;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(childSelector);
    children.forEach((c, i) => {
      c.style.transitionDelay = `${i * step}ms`;
      c.classList.add('fx-fade');
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            children.forEach((c) => c.classList.add('is-visible'));
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [step, threshold, childSelector]);
  return ref;
}

// ---------- useMagnetic ----------
// Кнопка/элемент мягко тянется к курсору. Лаг через requestAnimationFrame.
function useMagnetic(strength = 0.25) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      current.x = lerp(current.x, target.x, 0.18);
      current.y = lerp(current.y, target.y, 0.18);
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (Math.abs(current.x - target.x) > 0.05 || Math.abs(current.y - target.y) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

// ---------- useTilt ----------
// 3D-наклон карточки на hover. Очень аккуратный — max 6 градусов.
function useTilt(max = 6) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `perspective(900px) rotateX(${cy}deg) rotateY(${cx}deg)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tx = x * max;
      ty = -y * max;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}

// ---------- useParallax ----------
// Элемент смещается вертикально при скролле — медленнее, чем родитель.
function useParallax(speed = 0.3) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (center - viewportCenter) * speed * -1;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

// ---------- useCountUp ----------
// Счётчик 0 → N когда виден.
function useCountUp(target, duration = 1400) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [ref, val];
}

// ---------- helpers ----------
function FadeIn({ children, as = 'div', delay = 0, ...rest }) {
  const ref = useScrollFade({ delay });
  const Tag = as;
  return (
    <Tag ref={ref} className={'fx-fade ' + (rest.className || '')} {...rest}>
      {children}
    </Tag>
  );
}

function RevealMask({ children, as = 'span', delay = 0, ...rest }) {
  const ref = useScrollFade({ delay });
  const Tag = as;
  return (
    <Tag ref={ref} className={'fx-reveal-mask ' + (rest.className || '')} {...rest}>
      <span className="fx-reveal-inner">{children}</span>
    </Tag>
  );
}

Object.assign(window, {
  EASE,
  EASE_OUT,
  useScrollFade,
  useStaggerChildren,
  useMagnetic,
  useTilt,
  useParallax,
  useCountUp,
  FadeIn,
  RevealMask,
});
