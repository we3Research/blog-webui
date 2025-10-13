// src/pages/Home.tsx
import React from 'react';
import {useLocation} from "react-router-dom";
import type {Blog} from "../components/Blogs";
import {BlogContent} from "../components/Blog";

const BlogPage: React.FC = () => {
    const location = useLocation();
    const blog = location.state?.blog as Blog; // 获取传递的结构体
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.author}</p>
            <p>{blog.created_at}</p>
            <BlogContent {...blog}   />
        </div>
    );
};

export default BlogPage;