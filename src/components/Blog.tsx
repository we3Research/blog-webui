import React from "react";
import {type Blog, GetBlog} from "./Blogs";
//import { marked } from 'marked';

export const BlogContent: React.FC<Blog> =  (blog: Blog) => {
    const content = GetBlog(blog.cid);
    return (
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    );
};

export default BlogContent;