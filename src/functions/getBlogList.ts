import type {TBlog} from "@/types/blog.ts";
import {type PageReq, type PageRes, StartAndEnd} from "@/types/page.ts";
import {Program, translateAddress} from "@coral-xyz/anchor";
import {PublicKey} from "@solana/web3.js";

import idl from "../idl/blog.json"
import {type Blog} from "@/anchor/blog.ts";

export const getBlogList: (request: PageReq, blogListAddr: string) => Promise<PageRes<TBlog[]>> = async (req, blogListAddr) => {
    const res: PageRes<TBlog[]> = {
        pageNumber:req.pageNumber,
        pageSize:req.pageSize,
        total:0,
    } as PageRes<TBlog[]>;
    // 1. solana 拉取 blogList
    const program = new Program<Blog>(idl);
    const blogAddressList = await program.account.blogList.fetch(translateAddress(blogListAddr))
    if (!blogAddressList.isInitialized) {
        return res;
    }


    const {start, end, nodata} = StartAndEnd(req, blogListAddr.length);
    if (nodata) {
        return res;
    }
    res.total = blogAddressList.list.length;

    const addressList: PublicKey[] = [];
    for (let i = start; i < end; i++) {
        addressList.push(translateAddress(blogAddressList.list[i]))
    }
    const blogMetadataList = await program.account.blogMetadata.fetchMultiple(addressList)
    blogMetadataList.forEach((blogMetadata, index) => {
        res.data.push({
            ...blogMetadata,
            address: addressList[index].toString(),
        } as TBlog)
    })
    return res
};