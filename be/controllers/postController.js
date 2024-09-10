import User from "../models/userModel.js";
import Post from "../models/postModel.js"
import { v2 as cloudinary } from "cloudinary";

//create post
const createPost = async (req, res) => {
    try {

        const { postedBy, text } = req.body;
        let { img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ error: "Posted and text fields are requieded" });

        }

        const user = await User.findById(postedBy);

        if (!user) {

            return res.status(404).json({ error: "User not found" });

        }

        if (user._id.toString() !== req.user._id.toString()) {

            return res.status(401).json({ error: "unauthorized to create post!" });

        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` })
        }

        if (img) {
            const uploadedRespone = await cloudinary.uploader.upload(img);
            img = uploadedRespone.secure_url;

        }

        const newPost = new Post({ postedBy, text, img });

        await newPost.save();
        res.status(200).json({ message: "Post created successfully!", newPost });

    } catch (err) {

        res.status(500).json({ error: err.message });
        console.log(err)
    }
}

//get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }
        res.status(200).json({ post })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}
//delete Post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete post" })
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted successfully!" })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

//like and unlike post
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }
        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            //unlike post 
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked successfully" });
        }
        else {
            //like post 
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post liked successfully!" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}

//reply post

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePicture = req.user.profilePicture;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" })
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const reply = { userId, text, userProfilePicture, username };
        post.replies.push(reply);
        await post.save();

        res.status(200).json({ message: "Reply add successfully", post });




    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}

//get feed post
const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const following = user.followings;

        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

        res.status(200).json({ feedPosts })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts }