(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const btn = $('menu-btn');
  const menu = $('menu');
  const scrim = $('menu-scrim');
  const label = $('menu-label');
  const miAdmin = $('mi-admin');
  const miHost = $('mi-host');

  // Toggle Drawer
  function setMenuOpen(open) {
    menu.classList.toggle('hidden', !open);
    scrim.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(menu.classList.contains('hidden'));
  });

  scrim.addEventListener('click', () => setMenuOpen(false));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.mi')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      setMenuOpen(false);
      btn.focus();
    }
  });

  // Main Tabs Switching
  const allTabs = document.querySelectorAll('[data-h]');
  const allPanes = document.querySelectorAll('.pane');

  function setTab(name) {
    allTabs.forEach((tab) => {
      const match = tab.getAttribute('data-h') === name;
      tab.setAttribute('aria-selected', match ? 'true' : 'false');
      if (match) {
        tab.classList.add('bg-white', 'text-black', 'font-semibold');
        tab.classList.remove('text-white/70');
        label.textContent = tab.getAttribute('data-label');
      } else {
        tab.classList.remove('bg-white', 'text-black', 'font-semibold');
        tab.classList.add('text-white/70');
      }
    });

    allPanes.forEach((pane) => {
      pane.classList.toggle('hidden', pane.id !== 'p-' + name);
      pane.classList.toggle('block', pane.id === 'p-' + name);
    });
  }

  allTabs.forEach((tab) => {
    tab.addEventListener('click', () => setTab(tab.getAttribute('data-h')));
  });

  // Events Subtabs (Bracket vs Games)
  const bracketTabBtn = $('subtab-bracket');
  const gamesTabBtn = $('subtab-games');
  const bracketPane = $('subpane-bracket');
  const gamesPane = $('subpane-games');

  function setEventSubtab(which) {
    const isBracket = which === 'bracket';
    
    // Toggle Button Styles
    bracketTabBtn.className = isBracket 
      ? 'event-subtab py-2 text-sm font-semibold tracking-wider uppercase rounded-full bg-white text-black transition cursor-pointer'
      : 'event-subtab py-2 text-sm font-semibold tracking-wider uppercase rounded-full text-white/60 hover:text-white transition cursor-pointer';

    gamesTabBtn.className = !isBracket 
      ? 'event-subtab py-2 text-sm font-semibold tracking-wider uppercase rounded-full bg-white text-black transition cursor-pointer'
      : 'event-subtab py-2 text-sm font-semibold tracking-wider uppercase rounded-full text-white/60 hover:text-white transition cursor-pointer';

    // Toggle Panels
    bracketPane.classList.toggle('hidden', !isBracket);
    bracketPane.classList.toggle('block', isBracket);
    gamesPane.classList.toggle('hidden', isBracket);
    gamesPane.classList.toggle('block', !isBracket);
  }

  bracketTabBtn.addEventListener('click', () => setEventSubtab('bracket'));
  gamesTabBtn.addEventListener('click', () => setEventSubtab('games'));

  // Role Visibility Check (Admin = dev, Host = host)
  window.syncRoleVisibility = function (badges) {
    const badgeList = (badges || []).map((b) => b.toLowerCase());
    if (miAdmin) miAdmin.classList.toggle('hidden', !badgeList.includes('dev'));
    if (miHost) miHost.classList.toggle('hidden', !badgeList.includes('host'));
  };

  // Default active tab
  setTab('profile');
})();
