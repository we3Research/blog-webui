// src/pages/Home.tsx
import React from 'react';
import {GetBlogs, type PageReq} from '../components/Blogs';
import BlogList from "../components/BlogList";

const Home: React.FC = () => {
    const blogs = GetBlogs({} as PageReq);
    return (
        <div>
            <h2>博客列表</h2>
            {blogs.data.map((b) => (
                <BlogList {...b} />
            ))}
        </div>
    );
};

export default Home;