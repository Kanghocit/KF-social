import User from "../models/userModel.js";
import Post from "../models/postModel.js"


//create post
const createPost = async (req, res) => {
    try {

        const { postedBy, text, img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ message: "Posted and text fields are requieded" });

        }

        const user = await User.findById(postedBy);

        if (!user) {

            return res.status(404).json({ message: "User not found" });

        }

        if (user._id.toString() !== req.user._id.toString()) {

            return res.status(401).json({ message: "unauthorized to create post!" });

        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ message: `Text must be less than ${maxLength} characters` })
        }

        const newPost = new Post({ postedBy, text, img });

        await newPost.save();
        res.status(200).json({ message: "Post created successfully!", newPost });

    } catch (err) {

        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found!" })
        }
        res.status(200).json({ post })
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
//delete Post
const deletePost = async(req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log(err);
    }
}


export { createPost, getPost, deletePost }