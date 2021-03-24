import React from "react";
import styles from "../styles/PostCard.module.scss";

const PostCard = (props) => {
  return (
    <div className={styles.postCard}>
      <h1>{props.post.title}</h1>
      <p className={styles.excerpt}>{props.post.custom_excerpt}</p>
      <p className={styles.readMore}>read more</p>
    </div>
  );
};

export default PostCard;
