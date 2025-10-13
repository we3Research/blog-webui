import React from "react";
import type {Blog} from "./Blogs";
import {Link } from 'react-router-dom';


const BlogList: React.FC<Blog> = (blog:Blog) => {
    return (
        <div>
            <h2><Link to="/blog" state={{blog}} >{blog.title}  </Link> </h2>
            <p> 作者：{blog.author}    {blog.created_at}</p>
        </div>
    );
};

export default BlogList;