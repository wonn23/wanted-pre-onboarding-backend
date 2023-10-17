import { statusCode } from '../utils/statusCode.js';
import { postService } from './postService.js';
const postController = {
  createPost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const newPost = req.body;

      const createPost = await postService.createPost({
        userId,
        newPost,
      });
      statusCode.setResponseCode201(res);
      res.send(createPost.message);
    } catch (error) {
      next(error);
    }
  },
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await postService.getAllPosts();

      statusCode.setResponseCode200(res);
      res.send(posts.message);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { message, post } = await postService.getPost(postId);

      statusCode.setResponseCode200(res);
      res.send({ message, post });
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.postId;

      const post = await postService.deletePost({ userId, postId });

      statusCode.setResponseCode200(res);
      res.send(post.message);
    } catch (error) {
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.postId;
      const toUpdate = req.body;
      const post = await postService.updatePost({ userId, postId, toUpdate });

      statusCode.setResponseCode200(res);
      res.send(post.message);
    } catch (error) {
      next(error);
    }
  },
};

export { postController };