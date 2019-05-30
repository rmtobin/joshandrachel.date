function parseHash() {
  const hash = window.location.hash;

  if (hash) {
    const activeName = hash.substring(1);
    const currentlyActive = document.querySelector('.header-nav-list-item.active-page');
    currentlyActive && currentlyActive.classList.remove('active-page');
    
    const activeElement = document.querySelector(`.header-nav-list-item.${activeName}`);
    
    if (activeElement ) {
      activeElement.classList.add('active-page');
      activeElement.querySelector('a').setAttribute('disabled', true);
      document.querySelector(hash).scrollIntoView();
    }
  }
}


window.addEventListener('hashchange', () => {
  parseHash();
  
}, false);

function scrollListener() {
  const currentActive = document.querySelector('.header-nav-list-item.active-page > a');
  let lastHash = currentActive && currentActive.getAttribute('href');

  const navMenu = document.querySelector('.header-nav');
  const navMenuHeight = navMenu.offsetHeight;

  const navLinks = navMenu.querySelectorAll('.header-nav-list-item a');

  const scrollItems = [...navLinks].map(navLink => {
    return navLink.getAttribute('href');
  })

  document.querySelector('main').addEventListener('scroll', (event) => {
    const fromTop = document.querySelector('main').scrollTop;

    const nextScrollHeaderIndex = scrollItems.findIndex(item => {
      const $el = document.querySelector(item);
      const yOffset = $el.getBoundingClientRect()['y'];

      return $el.getBoundingClientRect()['y'] >= 52;
    })

    const currentIndex = nextScrollHeaderIndex > -1 ? nextScrollHeaderIndex - 1 : scrollItems.length - 1;
    const currentHash = scrollItems[currentIndex]

    if (currentHash !== lastHash) {
      lastHash = currentHash

      const currentlyActive = document.querySelector('.header-nav-list-item.active-page');
      currentlyActive && currentlyActive.classList.remove('active-page');
      const activeName = currentHash.substring(1);
      const activeElement = document.querySelector(`.header-nav-list-item.${activeName}`);
      activeElement.classList.add('active-page');
      activeElement.querySelector('a').setAttribute('disabled', true);
      history.pushState(null, null, currentHash)
    }
  })
}


parseHash();
scrollListener();