import Link from "next/link";
const { BLOG_URL, CONTENT_API_KEY } = process.env;
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,created_at`
  ).then((res) => res.json());

  const posts = res.posts;

  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

type Post = {
  title: string;
  html: string;
  slug: string;
};
const Post: React.FC<{ post: Post }> = (props) => {
  console.log(props);
  const { post } = props;
  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading....</h1>;
  }

  function loadComments() {
    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = post.slug;
    };
    const script = document.createElement("script");
    script.src = "https://ghost-blog-axel.disqus.com/embed.js";
    script.setAttribute("data-timestamp", Date.now().toString());

    document.body.appendChild(script);
  }

  return (
    <div>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <h1>My blog post</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      {enableLoadComments && <p onClick={loadComments}>Load comments</p>}

      <div id="disqus_thread"></div>
    </div>
  );
};

export default Post;
