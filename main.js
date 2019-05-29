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
    }
  }
}


window.addEventListener('hashchange', function() {
  parseHash();
  
}, false);



parseHash();