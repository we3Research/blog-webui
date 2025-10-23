import {PaginationComponent} from "@/components/Page.tsx";

export const AuthorPage = () => {
    const authorList = ["a", "b", "c"]

    return (<>
        <PaginationComponent dataList={authorList} getData={(s: string) => s}/>
    </>)
}