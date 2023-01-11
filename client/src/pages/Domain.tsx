/* eslint-disable */

import styled from "styled-components";
import PostRead from "../components/PostRead";
import axios from "axios";
import { useEffect, useState } from "react";

const FeedContainer = styled.div`
  height: 100%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 65px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  p {
    margin: 20px 70px 20px 70px;
    font-size: 23px;
    font-weight: 600;
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
`;

interface Post {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

const Domain: React.FC = () => {
  return (
    <FeedContainer>
      <p>오늘의 맛 Post</p>
      <PostsContainer></PostsContainer>
    </FeedContainer>
  );
};

export default Domain;
