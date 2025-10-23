import {useState} from "react";

export interface TBlog {
    index: number,
    title: string,
    cid: string,
    created_at: string,
    updated_at: string,
    history: string[],
    author: string,
}


export function Blog(blog: TBlog) {
    const [content,setContent] =  useState('');
    setContent('');
    return (
        <>
            <div>{blog.index} {blog.title}</div>
            <div>{blog.author} {blog.created_at} </div>
            <div>{content}</div>
            <div>{blog.cid}</div>
        </>
    )
}


export function AuthorList(blogList: TBlog[]) {
    return (
        <>
            <h1>Blog list</h1>
            {
                blogList.map((blog: TBlog) =>
                    <li>{blog.title}</li>
                )
            }
        </>
    )
}