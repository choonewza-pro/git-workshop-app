// Load the navbar partial into any page with a #site-nav container
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('site-nav');
    if (!container) return;

    fetch('partials/nav.html')
        .then(function (res) {
            if (!res.ok) throw new Error('Failed to load nav');
            return res.text();
        })
        .then(function (html) {
            container.innerHTML = html;
            setActiveNav();
        })
        .catch(function () {
            // Fallback: simple text link if fetch fails
            container.innerHTML = '<nav><div class="container"><a href="/index.html">Home</a></div></nav>';
        });

    function setActiveNav() {
        try {
            var current = location.pathname.split('/').pop();
            if (!current) current = 'index.html';
            var links = container.querySelectorAll('a.nav-link');
            links.forEach(function (a) {
                var href = a.getAttribute('href') || '';
                var linkFile = href.split('/').pop();
                if (linkFile === current) {
                    a.classList.add('active');
                    a.setAttribute('aria-current', 'page');
                } else {
                    a.classList.remove('active');
                    a.removeAttribute('aria-current');
                }
            });
        } catch (e) {
            // ignore
        }
    }
});
