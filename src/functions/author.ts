import {PublicKey} from "@solana/web3.js";
import {Buffer} from 'buffer';
import {Program, translateAddress} from "@coral-xyz/anchor";
import type {Blog} from "@/anchor/blog.ts";
import idl from "@/idl/blog.json";
import type {TAuthor, TAuthorList} from "@/components/Author.tsx";

window.Buffer = Buffer;

export function numberToBeBytes(uid: number): Uint8Array {
    // 将数字转换为 BigInt
    let bigIntUid = BigInt(uid);

    // 创建一个 8 字节的缓冲区
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // 将 BigInt 转换为字节并存储为大端格式
    for (let i = 0; i < 8; i++) {
        view.setUint8(7 - i, Number(bigIntUid & BigInt(0xff))); // 取出最低的 8 位
        bigIntUid >>= BigInt(8); // 右移 8 位
    }

    return new Uint8Array(buffer);
}

export async function patchGetAuthor(s: number, e: number): Promise<TAuthor[]> {
    // 1. 推测
    const authorList: PublicKey[] = [];
    for (let i = s; i < e; i++) {
        const [publicKey] = PublicKey
            .findProgramAddressSync(
                [Buffer.from("author"), numberToBeBytes(i)],
                translateAddress("AGRJdaV5t2rKK7nTYFQiRztu8tKkKgoXMprTECZrLc7A"));
        authorList.push(publicKey)
    }
    const program = new Program<Blog>(idl);
    const chainRes = await program.account.author.fetchMultiple(authorList);
    const res: TAuthor[] = [];
    chainRes.forEach(
        (item) => {
            if (item) {
                res.push({
                    uid: item.uid,
                    pseudonym: item.pseudonym,
                    introduction: item.introduction,
                    total: item.total,
                    updater: item.updater.toString(),
                });
            }

        }
    )
    return res
}


export async function getAuthorList(): Promise<TAuthorList> {

    const [publicKey] = PublicKey
        .findProgramAddressSync(
            [Buffer.from("author_list")],
            translateAddress("AGRJdaV5t2rKK7nTYFQiRztu8tKkKgoXMprTECZrLc7A"));
    const program = new Program<Blog>(idl);
    const chainRes = await program.account.authorList.fetch(publicKey).catch();




    return {
        total: chainRes.total,
        updater: chainRes.updater.toString(),
    }
}