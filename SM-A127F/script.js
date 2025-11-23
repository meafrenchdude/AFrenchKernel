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
const downloadsSection = document.querySelector("#downloads");

function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

const sidebarDownloadsLink = document.querySelector('a[href="#downloads"]');
if (sidebarDownloadsLink) {
  sidebarDownloadsLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (downloadsSection) {
      smoothScrollTo(downloadsSection);
    }
  });
}

const sidebarDevicesLink = document.querySelector('a[href="#devices"]');
if (sidebarDevicesLink) {
  sidebarDevicesLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (downloadsSection) {
      smoothScrollTo(downloadsSection);
    }
  });
}

function adjustDownloadsOffset() {
  if (!downloadsSection) return;

  if (!document.hasFocus()) return;

  downloadsSection.style.marginTop = '0';

  const rect = downloadsSection.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTopFromDocument = rect.top + scrollTop;

  const offset = window.innerWidth <= 600 ? 100 : 200;
  const desiredFromDocument = window.innerHeight + offset;

  const extra = desiredFromDocument - elementTopFromDocument;

  if (extra > 0) {
    downloadsSection.style.marginTop = extra + "px";
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

window.addEventListener("load", adjustDownloadsOffset);
window.addEventListener("resize", debounce(adjustDownloadsOffset, 250));