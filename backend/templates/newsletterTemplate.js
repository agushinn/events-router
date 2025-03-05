function buildNewsletterHtml(posts) {
    return `<section>
    ${posts
        .map(
            (post) => `
      <article style="max-width: 40rem; margin: 2rem auto; text-align: center;">
        <div style="background-color: #aeaba726; border-radius: 1rem 1rem 0 0;">
          <div>
            <h2>${post.title}</h2>
            <time>${post.date}</time>
          </div>
        </div>
        <div>
          <a href="${post.id}">Read More!</a>
        </div>
      </article>`
        )
        .join('')}
  </section>`
}

module.exports = { buildNewsletterHtml }
