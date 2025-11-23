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