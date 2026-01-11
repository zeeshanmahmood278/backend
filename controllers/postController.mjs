import path from "path";
import rootDir from "../utils/rootPath.mjs";

/* IMPORT ALL RELATED MODEL */
import POST from "../models/postModel.mjs";
import LIKE from "../models/likeModel.mjs";
import commentModel from "../models/commentModel.mjs";
/* HELPER */
import removeDocumentFile from "../services/removeDocumentFile.mjs";
import { uploadImageToBlob } from "../utils/azureBlob.mjs";

/* SHOW ALL POST */

const getAllActivePost = async (req, res, next) => {
  try {
    const activePost = await POST.find(
      { status: true },
      { title: 1, description: 1, location: 1, images: 1, likes: 1, user: 1, createdAt: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(25)
      .populate({
        path: "comments",
        select: "_id user comment",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .populate("user", "username")
      .lean();

    activePost.forEach((post) => {
      post.likeCount = post.likes?.length || 0;
      delete post.likes;
    });

    if (activePost.length == 0) {
      res.status(200).json({
        message: "No POST AVAILABLE.",
      });
    }
    res.status(200).json(activePost);
  } catch (error) {
    next(error);
  }
};

/* CREATE POST */
const createPost = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    // 2️⃣ Upload images to Azure Blob
    const imageUrls = [];

    for (const file of req.files) {
      const imageUrl = await uploadImageToBlob(file);
      imageUrls.push(imageUrl);
    }

    // 3️⃣ Prepare document data
    const documentData = {
      ...req.body,
      images: imageUrls, // ✅ store URLs instead of filenames
      user: userId,
    };

    // 4️⃣ Save post
    const document = new POST(documentData);
    const { _id } = await document.save();

    res.status(201).json({
      message: "Success! New Post created",
      postId: _id,
      images: imageUrls,
    });
  } catch (error) {
    next(error);
  }
};
/* UPDATE POST */
const updatePost = async (req, res, next) => {
  const id = req?.params?.id;

  const { title, description, location, status, images } = req?.body;

  const updateDocument = await POST.findOneAndUpdate(
    { _id: id },
    { title, description, location, status, images },
    { new: true }
  );
  res.status(200).send();
};

/*DELETE POST */
const deletePost = async (req, res, next) => {
  const id = req?.params?.id;
  const { images } = await POST.findOne({ _id: id }, "images");

  /* REMOVING IMAGES FROM SERVER */
  images.map(async (image) => {
    const imageFile = image;
    const imageFilePath = path.join(rootDir, "uploads", imageFile);

    await removeDocumentFile(imageFilePath);
  });

  const removeDocument = await POST.findOneAndDelete({ _id: id });
  res.status(204).send();
};

/* Toggle Post Status */
const togglePostStatus = async (req, res, next) => {
  const id = req?.params?.id;
  const updateDocument = await POST.findOneAndUpdate(
    { _id: id },
    { status: false }
  );
  res.status(200).send();
};

/* Like Post */
/* Like Post */
const likePost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const unLikePost = await LIKE.findOneAndDelete({
      post: postId,
      user: userId,
    });

    if (!unLikePost) {
      const { _id } = await LIKE.create({ post: postId, user: userId });
      await POST.findByIdAndUpdate(
        postId,
        {
          $push: { likes: _id },
        },
        { new: true }
      );
    } else {
      await POST.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: unLikePost._id },
        },
        { new: true }
      );
    }

    const [totalLikes, userLiked] = await Promise.all([
      LIKE.countDocuments({ post: postId }),
      LIKE.exists({ post: postId, user: userId }),
    ]);

    const prop = {
      totalLikes,
      isUserLikedPost: Boolean(userLiked),
    };

    return res.status(200).json(prop);
  } catch (error) {
    next(error);
  }
};
/* COMMENT POST */
/* COMMENT POST */
const addComment = async (req, res, next) => {
  try {
    const id = req?.params.id;
    const { comment } = req?.body;
    const userId = req.user._id;
    const document = {
      post: id,
      user: userId,
      comment,
    };

    const newComment = await new commentModel(document);
    const { _id } = await newComment.save();

    /* PUSH ID INTO POST */
    await POST.findByIdAndUpdate(
      id,
      {
        $push: { comments: _id },
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: comment,
    });
  } catch (error) {
    next(error);
  }
};
/* DELETE COMMENT */
const deleteComment = async (req, res, next) => {
  /* REMOVE _ID FROM POST TABLE TOO. */
};

const post = {
  createPost,
  updatePost,
  deletePost,
  togglePostStatus,
  likePost,
  addComment,
  deleteComment,
  getAllActivePost,
};
export default post;
