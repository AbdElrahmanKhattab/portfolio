function initializeAfterScrollToTop() {
  // All your existing code (selections and animations)
  const animationTargets = [
    { container: '.norm1', left: 'animd', right: 'animt' },
    { container: '.norm2', left: 'animd', right: 'animt' },
    { container: '.reverse', left: 'animt', right: 'animd' }
  ];
  
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".btn");
  const navlist = document.querySelector(".responsive-navlist");
  const navlistlink = document.querySelectorAll(".list-none li");
  const frames = document.querySelectorAll(".frame");
  const frameapp = document.querySelector(".app");
  const framestore = document.querySelector(".store");
  const framedesign = document.querySelector(".design");
  const frameclose = document.querySelectorAll(".frameclose");
  const appweb = document.querySelector(".appimg");
  const storeweb = document.querySelector(".storeimg");
  const designweb = document.querySelector(".desigimg");
  const cuberev = document.querySelectorAll(".cuberev");
  const cube = document.querySelectorAll(".cube");
  const skillsection = document.querySelector(".aboutme-header");
  const skill = document.querySelector(".aboutme-skills");
  const aboutme = document.querySelector(".aboutme");
  const perks = document.querySelector(".perks_wrapper");
  const perksitem = document.querySelectorAll(".perks_item");
  const delay = 100;
  const increment = 40;
  const elements = document.querySelectorAll(".char");
  const elementst = document.querySelectorAll(".chara");
  
  let isMouseHover = false;
  let xvalue, yvalue;

  // Setup frame sources but don't load them yet
  const frameSources = {
    app: "https://abdelrahmankhattab.github.io/app/",
    store: "https://abdelrahmankhattab.github.io/store/",
    design: "https://al-horria.com/home"
  };

  // Initialize iframes with empty src attributes
  frames.forEach(frame => {
    const iframe = frame.querySelector('iframe');
    if (iframe) {
      // Store the URL in a data attribute instead of the src
      iframe.setAttribute('data-src', iframe.getAttribute('src'));
      iframe.setAttribute('src', 'about:blank');
    }
  });

  // Generate grid boxes 
const gridWrapper = document.querySelector('.background-grid_box-wrapper');
for(let i = 0; i < 206; i++) {
  const box = document.createElement('div');
  box.className = 'background-grid_box';
  gridWrapper.appendChild(box);
}

  const scrollHandler = function() {
    const scrollPosition = window.scrollY;
    
    // Animation targets handling
    animationTargets.forEach(target => {
      const element = document.querySelector(target.container);
      if (!element) return;
      
      const triggerPosition = element.offsetTop - 800;
      const elementHeight = element.offsetHeight;
      
      if (scrollPosition >= triggerPosition && scrollPosition < triggerPosition + elementHeight) {
        const leftElement = element.querySelector('.leftwork');
        const rightElement = element.querySelector('.rightwork');
        
        if (leftElement) leftElement.classList.add(target.left);
        if (rightElement) rightElement.classList.add(target.right);
      }
    });

    // Nav background handling
    if (scrollPosition >= 165) {
      nav.style.background = "#050a0f";
    } else {
      nav.style.background = "#0a141f";
    }
    
    // About me animations
    if (aboutme) {
      const top = aboutme.offsetTop;
      const height = aboutme.offsetHeight;
      
      if (scrollPosition >= top && scrollPosition < top + height) {
        elementst.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add("animation");
          }, delay + index * increment);
        });
      }
    }
    
    // Perks animations
    if (perksitem) {
      perksitem.forEach(e => {
        const topa = e.offsetTop + 2000;
        const heighta = e.offsetHeight + 100;
        if (scrollPosition >= topa && scrollPosition < topa + heighta) {
          e.classList.add('perks-animation');
        }
      });
    }
  };

  function transform(element) {
    element.style.transform = `translate3d(${xvalue / 330}rem, ${yvalue / 330}rem, 0px) scale3d(1, 1, 1) rotateX(${-yvalue / 18}deg) rotateY(${xvalue / 14}deg) rotateZ(0deg) skew(0deg, 0deg)`;
  }

  function transformrev(element) {
    element.style.transform = `translate3d(${-xvalue / 330}rem, ${-yvalue / 330}rem, 0px) scale3d(1, 1, 1) rotateX(${yvalue / 18}deg) rotateY(${-xvalue / 14}deg) rotateZ(0deg) skew(0deg, 0deg)`;
  }

  // Load iframe content only when needed
  function loadIframe(frame) {
    const iframe = frame.querySelector('iframe');
    if (iframe && iframe.getAttribute('src') === 'about:blank') {
      // Show loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'iframe-loading';
      loadingIndicator.innerHTML = '<div class="push-pop"><div></div><div></div><div></div></div>';
      frame.appendChild(loadingIndicator);

      // Set the actual source
      iframe.onload = function() {
        // Remove loading indicator when iframe is loaded
        if (loadingIndicator.parentNode) {
          loadingIndicator.parentNode.removeChild(loadingIndicator);
        }
      };
      iframe.setAttribute('src', iframe.getAttribute('data-src'));
    }
  }

  window.addEventListener('scroll', scrollHandler, { passive: true });

  menu.addEventListener("click", function() {
    navlist.classList.toggle("listshow");
    menu.classList.toggle("btnactive");
  });

  navlistlink.forEach(element => {
    element.addEventListener("click", function() {
      navlist.classList.remove("listshow");
    });
  });

  // Modified event listeners to load iframes on demand
  appweb.addEventListener('click', function() {
    frameapp.style.display = "block";
    loadIframe(frameapp);
  });

  storeweb.addEventListener('click', function() {
    framestore.style.display = "block";
    loadIframe(framestore);
  });

  designweb.addEventListener('click', function() {
    framedesign.style.display = "block";
    loadIframe(framedesign);
  });

  frameclose.forEach(element => {
    element.addEventListener("click", function() {
      frames.forEach(element => {
        element.style.display = "none";
        // Optionally unload iframes when closed
        // const iframe = element.querySelector('iframe');
        // if (iframe) iframe.setAttribute('src', 'about:blank');
      });
    });
  });

  window.addEventListener("mousemove", e => {
    xvalue = e.clientX - window.innerWidth / 2;
    yvalue = e.clientY - window.innerHeight / 2;
    
    if (cube.length) cube.forEach(transform);
    if (cuberev.length) cuberev.forEach(transformrev);
    
    if (isMouseHover && skill) {
      const yskill = yvalue / 20;
      const xskill = 4 + xvalue / 50;
      skill.style.transform = `translate3d(${-xskill}%, ${-yskill}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
    } else if (!isMouseHover && skill) {
      skill.style.transform = `translate3d(4%, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
    }
  });

  skillsection?.addEventListener("mouseleave", () => { isMouseHover = false; });
  skillsection?.addEventListener("mouseover", () => { isMouseHover = true; });

  document.getElementById("servies")?.addEventListener("mousemove", e => {
    const cards = document.getElementsByClassName("perks_item");
    for (const card of cards) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  });

  document.querySelector(".loadingscrean").style.display = "none";
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("animation");
    }, delay + index * increment);
  });
  
  // Call the scroll handler once to initialize properly
  scrollHandler();
}

// CSS for loading indicator
const style = document.createElement('style');
style.textContent = `
.iframe-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
`;
document.head.appendChild(style);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
  setTimeout(initializeAfterScrollToTop, 500);
});
