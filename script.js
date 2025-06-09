document.addEventListener('DOMContentLoaded', () => {
  
  const navLinks = document.querySelectorAll('header nav .nav-link');
  const dashboardLinks = document.querySelectorAll('.dashboard-menu .dashboard-card');

  
  const sectionIds = [
    ...Array.from(navLinks).map(link => link.getAttribute('href')).filter(href => href.startsWith('#')),
    ...Array.from(dashboardLinks).map(link => link.getAttribute('href')).filter(href => href.startsWith('#'))
  ];

  
  const uniqueSections = [...new Set(sectionIds)].map(id => id.substring(1));

  
  const sections = {};
  uniqueSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sections[id] = el;
  });


  const getCurrentSectionId = () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
  
    const offsetBuffer = 100;
    let currentId = uniqueSections[0];
    for (const id of uniqueSections) {
      const section = sections[id];
      if (section && section.offsetTop - offsetBuffer <= scrollPosition) {
        currentId = id;
      }
    }
    return currentId;
  };


  const clearActiveLinks = () => {
    navLinks.forEach(link => link.classList.remove('active'));
    dashboardLinks.forEach(link => link.classList.remove('active'));
  };

 
  const setActiveLink = (id) => {
    clearActiveLinks();
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
    dashboardLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  
  const onScroll = () => {
    const currentSection = getCurrentSectionId();
    setActiveLink(currentSection);
  };

  onScroll();
  window.addEventListener('scroll', onScroll);

 
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
});
