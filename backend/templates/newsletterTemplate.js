function buildNewsletterHtml(posts) {
    return `<section>
    ${posts
        .map(
            (post) => `
      <article style="max-width: 40rem; margin: 2rem auto; text-align: center;">
        <div style="background-color: #aeaba726; border-radius: 1rem 1rem 0 0;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; border-radius: 1rem 1rem 0 0;">
          <div>
            <h2 style="color: #575757; margin-bottom: 0.5rem;" >${post.title}</h2>
            <time style="color: #575757; margin-bottom: 0.5rem; font-size: 1rem;" >${post.date}</time>
          </div>
        </div>
        <div style="background-color: #f4f4f4; border-radius: 0 0 1rem 1rem; ">
          <a href="http://localhost:5173/events/${post._id}" style="color: #333; text-decoration: none; display: inline-block; width: 100%; height: 100%; border-radius: 0 0 1rem 1rem; padding: 1rem 0; cursor: pointer; background: #646464;
    font-size: 1.2rem;
    color: white;">
            Read More
          </a>
        </div>
      </article>`
        )
        .join('')}
  </section>`
}

module.exports = { buildNewsletterHtml }
