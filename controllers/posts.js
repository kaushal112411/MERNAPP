import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export  const getPost = async(req,res)=>{
    try {
        const messages = await PostMessage.find()
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export  const CreatePost = async(req,res)=>{
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async(req,res)=>{
  const {id} = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');
  const updatedPost = {_id: id, creator, title, message, tags, selectedFile, };
  await PostMessage.findByIdAndUpdate(id,updatedPost,{new: true});
  console.log(updatePost)
  res.json(updatedPost);
}

export const deletePost = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');
    await PostMessage.findByIdAndRemove(id)
    res.json({message:'post deleted successfully'})
}