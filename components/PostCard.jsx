import React from "react";
import styles from "../styles/PostCard.module.scss";

const PostCard = (props) => {
  return (
    <div className={styles.postCard}>
      <h1>{props.post.title}</h1>
    </div>
  );
};

export default PostCard;
