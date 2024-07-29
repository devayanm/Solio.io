export const generateMockPosts = (page, limit) => {
  const posts = [];
  for (let i = 0; i < limit; i++) {
    posts.push({
      id: (page - 1) * limit + i + 1,
      title: `Post Title ${(page - 1) * limit + i + 1}`,
      description: `This is a description for post ${
        (page - 1) * limit + i + 1
      }`,
      imageUrl: "https://via.placeholder.com/500x250",
      timestamp: "Just now",
    });
  }
  return posts;
};
