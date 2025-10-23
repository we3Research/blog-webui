import {BN} from "@coral-xyz/anchor";

export interface TAuthor {
    uid: number,
    pseudonym: string,
    introduction: string,
    total: number,
    updater: string,
}


export interface TAuthorList {
    total: BN,
    updater: string,
}

export function Author(author: TAuthor) {
    return (
        <>
            <div>{author.pseudonym}</div>
            <div>{author.introduction}</div>
            <div>{author.uid} {author.total} {author.updater}</div>
        </>
    )
}


export function AuthorList(authorList: TAuthor[]) {
    return (
        <>
            <h1>Author list</h1>
            {
                authorList.map((author: TAuthor) =>
                    <li>{author.pseudonym}</li>
                )
            }
        </>
    )
}