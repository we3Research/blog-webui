// import { http } from "@/apis/http";
import type { TBlog } from "@/types/blog";

type Request = {
  id: string;
};

export const getBlogById: (params: Request) => Promise<TBlog> = async ({
  id,
}) => {
  // 实际请求并且包装成前端要的类型
  // const res = await http.get('/blog/getBlogById')

  return {
    cid: id,
    history: [id],
    author: "admin",
    title: "test",
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  };
};
