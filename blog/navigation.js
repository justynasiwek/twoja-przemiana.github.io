(function () {
    if (typeof blogPosts === 'undefined') return;

    const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
        'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
    function publicationDate(post) {
        if (post.isoDate) return post.isoDate;
        const [day, month, year] = post.date.split(' ');
        return `${year}-${String(months.indexOf(month) + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    const archive = typeof blogArchivePosts === 'undefined' ? [] : blogArchivePosts;
    const posts = [...new Map([...blogPosts, ...archive].map(post => [post.slug, post])).values()]
        .sort((a, b) => publicationDate(b).localeCompare(publicationDate(a)));
    const slug = decodeURIComponent(window.location.pathname.split('/').pop()).replace(/\.html$/, '');
    const index = posts.findIndex(post => post.slug === slug);
    if (index < 0) return;

    function updateLink(selector, post) {
        const link = document.querySelector(selector);
        if (!link) return;
        link.hidden = !post;
        if (post) {
            link.href = `${post.slug}.html`;
            link.title = post.title;
            link.setAttribute('aria-label', `${link.textContent.trim()}: ${post.title}`);
        }
    }
    updateLink('[data-blog-prev]', posts[index - 1]);
    updateLink('[data-blog-next]', posts[index + 1]);
})();
