import { getBlogById } from "@/services/getBlogById";
import type { TBlog } from "@/types/blog";
import type { LoaderFunctionArgs } from "react-router";

export const blogLoader: (
  // 定义一下路由的参数
  param: LoaderFunctionArgs<{ id: string }>
) => Promise<TBlog> = async ({ params }) => {
  const blog = await getBlogById({
    // 断言路由参数是存在的
    // 因为不存在都会走到NotFound了
    id: params.id!,
  });
  return blog;
};
