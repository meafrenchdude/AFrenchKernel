let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let overlay = document.querySelector(".page-overlay");

closeBtn.addEventListener("click",() => {
    sidebar.classList.toggle("open");
    menuBtnChange();
})

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuBtnChange();
})

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-left");
    } else {
        closeBtn.classList.replace("bx-menu-left", "bx-menu");
    }
}

menuBtnChange();
const devicesSection = document.querySelector("#devices");
const devicesHint = document.querySelector(".devices-hint");

function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

if (devicesHint) {
  devicesHint.addEventListener('click', (e) => {
    e.preventDefault();
    if (devicesSection) {
      smoothScrollTo(devicesSection);
    }
  });
}

const sidebarDevicesLink = document.querySelector('a[href="#devices"]');
if (sidebarDevicesLink) {
  sidebarDevicesLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (devicesSection) {
      smoothScrollTo(devicesSection);
    }
  });
}

function adjustDevicesOffset() {
  if (!devicesSection) return;

  if (!document.hasFocus()) return;

  devicesSection.style.marginTop = '0';

  const rect = devicesSection.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTopFromDocument = rect.top + scrollTop;

  const offset = window.innerWidth <= 600 ? 100 : 200;
  const desiredFromDocument = window.innerHeight + offset;

  const extra = desiredFromDocument - elementTopFromDocument;

  if (extra > 0) {
    devicesSection.style.marginTop = extra + "px";
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener("load", adjustDevicesOffset);
window.addEventListener("resize", debounce(adjustDevicesOffset, 250));

if (devicesSection && devicesHint && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          devicesHint.classList.add("hidden");
        } else {
          devicesHint.classList.remove("hidden");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(devicesSection);
}

function isSnowSeason(date = new Date()) {
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 11 && day >= 15) {
    return true;
  }

  if (month === 0 && day <= 15) {
    return true;
  }

  return false;
}

function initSnowEffect() {
  if (!isSnowSeason()) {
    return;
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (document.querySelector('.snow-container')) {
    return;
  }

  const snowContainer = document.createElement('div');
  snowContainer.className = 'snow-container';
  snowContainer.style.pointerEvents = 'none';
  document.body.appendChild(snowContainer);

  const isMobile = window.innerWidth <= 600;
  const flakesCount = isMobile ? 40 : 80;

  for (let i = 0; i < flakesCount; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';

    const size = Math.random() * 3 + 2;
    flake.style.width = size + 'px';
    flake.style.height = size + 'px';

    flake.style.left = Math.random() * 100 + '%';
    flake.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);

    const duration = Math.random() * 10 + 10;
    flake.style.animationDuration = duration + 's';

    const delay = Math.random() * -duration;
    flake.style.animationDelay = delay + 's';

    snowContainer.appendChild(flake);
  }
}

window.addEventListener('load', initSnowEffect);