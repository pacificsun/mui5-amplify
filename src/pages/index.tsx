import { Container } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";

import { Post, ListPostsQuery } from "../API";
import PostPreview from "../components/PostPreview";
export default function Home() {
  const { user } = useUser();
  console.log("USER::", user);
  const [posts, setPosts] = useState<Post[]>([]);
  // Make a request to the graphql API
  useEffect(() => {
    const fetchPostFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Could not get posts");
      }
    };
    fetchPostFromApi();
  }, []);

  console.log("post>", posts);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
}
