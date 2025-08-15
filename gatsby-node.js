// gatsby-node.js
const path = require(`path`);
const chunk = require(`lodash/chunk`);

const RECENT_POSTS_TO_BUILD = 12;
const RECENT_PROJECTS_TO_BUILD = 24;

exports.createPages = async (gatsbyUtilities) => {
  const { reporter } = gatsbyUtilities;
  reporter.info(`createPages: starting…`);
  await createBlog(gatsbyUtilities);
  await createProjects(gatsbyUtilities);
  reporter.info(`createPages: done.`);
};

/* ---------------------------------- BLOG --------------------------------- */

async function createBlog(gatsbyUtilities) {
  const { reporter } = gatsbyUtilities;
  const posts = await getPosts(gatsbyUtilities);
  reporter.info(`Blog: fetched ${posts.length} posts`);
  if (!posts.length) return;

  posts.sort((a, b) => new Date(b.post.date || 0) - new Date(a.post.date || 0));

  const recent = posts.slice(0, RECENT_POSTS_TO_BUILD);
  const older  = posts.slice(RECENT_POSTS_TO_BUILD);

  await Promise.all([
    createIndividualBlogPostPages({ items: recent, gatsbyUtilities, defer: false }),
    createIndividualBlogPostPages({ items: older,  gatsbyUtilities, defer: true  }),
    createBlogPostArchive({ posts, gatsbyUtilities }),
  ]);
}

const createIndividualBlogPostPages = async ({ items, gatsbyUtilities, defer }) =>
  Promise.all(
    items.map(({ previous, post, next }) => {
      const pagePath = post.uri?.endsWith(`/`) ? post.uri : `${post.uri || `/`}/`;
      gatsbyUtilities.reporter.info(`Creating blog page ${pagePath}`);
      return gatsbyUtilities.actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/blog-post.js`),
        defer,
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      });
    })
  );

async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    gatsbyUtilities.reporter.panicOnBuild(
      `Error loading WP reading settings`,
      graphqlResult.errors
    );
    return;
  }

  const postsPerPage =
    graphqlResult?.data?.wp?.readingSettings?.postsPerPage || 10;

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage);
  const totalPages = postsChunkedIntoArchivePages.length;

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1;
      const getPagePath = (page) =>
        page > 0 && page <= totalPages ? `/blog/${page}/` : null;

      const pagePath = getPagePath(pageNumber);
      gatsbyUtilities.reporter.info(`Creating blog archive ${pagePath}`);

      await gatsbyUtilities.actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/blog-post-archive.js`),
        context: {
          offset: index * postsPerPage,
          postsPerPage,
          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      });
    })
  );
}

// NOTE: no GraphQL status filter here; we filter in JS so schema differences don't break builds
async function getPosts({ graphql, reporter }) {
  const res = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { date: DESC }) {
        edges {
          previous { id }
          post: node {
            id
            uri
            date
            status
          }
          next { id }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, res.errors);
    return [];
  }

  const edges = res?.data?.allWpPost?.edges || [];
  const published = edges.filter(e => (e.post?.status || ``).toLowerCase() === `publish`);
  reporter.info(`Loaded ${edges.length} total posts; using ${published.length} with status=publish`);
  return published;
}

/* -------------------------------- PROJECTS -------------------------------- */

async function createProjects(gatsbyUtilities) {
  const { reporter, actions } = gatsbyUtilities;
  const pages = await getProjects(gatsbyUtilities);

  reporter.info(`Projects: fetched ${pages.length} wpProperty nodes`);
  if (!pages.length) return;

  pages.sort((a, b) => new Date(b.page.date || 0) - new Date(a.page.date || 0));

  const recent = pages.slice(0, RECENT_PROJECTS_TO_BUILD);
  const older  = pages.slice(RECENT_PROJECTS_TO_BUILD);

  const createSet = async (items, defer) =>
    Promise.all(
      items.map(({ page }) => {
        const pagePath = `/projects/${page.slug}/`;
        reporter.info(`Creating project page ${pagePath} (defer=${defer})`);
        return actions.createPage({
          path: pagePath,
          component: path.resolve(`./src/templates/project-template.js`),
          defer,
          context: { id: page.id },
        });
      })
    );

  await createSet(recent, false);
  await createSet(older,  true);
}

// NOTE: no GraphQL status filter here; we filter in JS to avoid schema inconsistencies
async function getProjects({ graphql, reporter }) {
  const res = await graphql(/* GraphQL */ `
    query WpProperties {
      allWpProperty(sort: { date: DESC }) {
        edges {
          page: node {
            id
            slug
            date
            status
          }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panicOnBuild(`There was an error loading your projects`, res.errors);
    return [];
  }

  const edges = res?.data?.allWpProperty?.edges || [];
  const published = edges.filter(e => (e.page?.status || ``).toLowerCase() === `publish`);
  reporter.info(`Loaded ${edges.length} total projects; using ${published.length} with status=publish`);
  return published;
}

/* ----------------------------- ISOTOPE WEBPACK ---------------------------- */

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /isotope-layout/, use: loaders.null() },
        ],
      },
    });
  }
};
