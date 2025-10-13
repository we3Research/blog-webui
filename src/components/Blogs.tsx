export interface Blog {
    cid: string,
    history: string[],
    author: string,
    title: string,
    created_at: string,
    updated_at: string,
}

export interface PageReq {
    start: number;
    end: number;
}

export interface PageRes {
    start: number;
    end: number;
    total: number;
    data: Blog[];
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GetBlogs(_req: PageReq): PageRes {
    // todo 跟钱包交互并从区块链获取
    return {
        start: 0,
        end: 10,
        total: 3,
        data: [
            {cid: '', title: 'test blog 1', created_at: '2021-07-01T00:00:00.000Z', author: 'hugo'},
            {cid: '', title: 'test blog 2', created_at: '2021-07-01T00:00:00.000Z', author: 'hugo'},
            {cid: '', title: 'test blog 3', created_at: '2021-07-01T00:00:00.000Z', author: 'hugo'},
        ]
    } as PageRes
}

export function GetBlog(_cid: string): string {
    // todo 使用ipfs网关拉取文件
    return "this is a mock content"
}


export default GetBlogs;
