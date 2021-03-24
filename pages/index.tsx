import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import PostCard from "../components/PostCard";

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  custom_excerpt: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json());

  const posts = res.posts;

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;
  return (
    <div className={styles.container}>
      <div className={styles.heroBanner}>
        <h1>Welcome to my blog</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At laoreet
          consectetur turpis cursus dictum lectus.
        </p>
      </div>
      <div className={styles.posts}>
        <h2>Latest Posts</h2>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={post.slug}>
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <a>
                    <PostCard post={post} />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
