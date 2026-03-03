document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE NAVBAR TOGGLE (Pure JS, no Bootstrap Collapse dependency) =====
  const navToggler = document.querySelector('.navbar-toggler');
  const navMenu = document.getElementById('navbarNav');

  if (navToggler && navMenu) {
    // Handle toggler button click
    navToggler.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('nav-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when any nav-link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggler.contains(e.target)) {
        closeMenu();
      }
    });

    function openMenu() {
      navMenu.classList.add('nav-open');
      navToggler.setAttribute('aria-expanded', 'true');
      navToggler.innerHTML = '<span style="font-size:1.5rem; line-height:1; color:#0f172a;">&times;</span>';
    }

    function closeMenu() {
      navMenu.classList.remove('nav-open');
      navToggler.setAttribute('aria-expanded', 'false');
      navToggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
    }
  }

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        navbar.style.backgroundColor = 'rgba(255,255,255,1)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
      }
    });
  }

  // ===== FAB Back to Top =====
  const fabTop = document.getElementById('fabTop');
  if (fabTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        fabTop.classList.add('show');
      } else {
        fabTop.classList.remove('show');
      }
    });
    fabTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Auto-generate Table of Contents (for blog pages) =====
  const tocContainer = document.getElementById('tocContainer');
  const tocList = document.getElementById('tocList');
  const tocTitle = document.getElementById('tocTitle');
  const articleContent = document.querySelector('.blog-content-body');

  if (tocContainer && articleContent && tocList) {
    const headings = articleContent.querySelectorAll('h2, h3');

    if (headings.length > 0) {
      tocList.classList.add('show'); // default open

      headings.forEach(function (heading, index) {
        if (!heading.id) heading.id = 'heading-' + index;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;

        if (heading.tagName.toLowerCase() === 'h3') {
          li.classList.add('toc-h3');
        }

        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = document.getElementById(heading.id);
          if (target) {
            var pos = target.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: pos, behavior: 'smooth' });
          }
        });

        li.appendChild(a);
        tocList.appendChild(li);
      });

      if (tocTitle) {
        tocTitle.addEventListener('click', function () {
          tocList.classList.toggle('show');
          var isOpen = tocList.classList.contains('show');
          tocTitle.innerHTML = 'Daftar Isi <i class="bi ' + (isOpen ? 'bi-chevron-up' : 'bi-chevron-down') + ' ms-2 fs-5"></i>';
        });
      }
    } else {
      tocContainer.style.display = 'none';
    }
  }

});
