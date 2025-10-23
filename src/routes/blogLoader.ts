import {getBlogContent} from "@/functions/getBlogContent.ts";
import type {LoaderFunctionArgs} from "react-router";

export const blogLoader: (
  // 定义一下路由的参数
  param: LoaderFunctionArgs<{ cid: string }>
) => Promise<string> = async ({ params }) => {
  return await getBlogContent(
      // 断言路由参数是存在的
      // 因为不存在都会走到NotFound了
      params.cid!,
      ""
  );
};

