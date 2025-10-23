import { useEffect, useState } from 'react';
import { PaginationComponent } from "@/components/Page.tsx";
import {AddAuthor} from "@/components/AddAuthor"; // Assuming it's in the same folder
import { getAuthorList, numberToBeBytes, patchGetAuthor } from "@/functions/author.ts";
import { BN, Program, setProvider, translateAddress } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { SolanaProvider } from "@/components/SolanaProvider.tsx";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import type { Blog } from "@/anchor/blog.ts";
import idl from "@/idl/blog.json";
import { Buffer } from "buffer";
import type {TAuthorList} from "@/components/Author.tsx";


export const Home = () => {
    return (<>
        <SolanaProvider>
            <Home1/>
        </SolanaProvider>
    </>)
};

export const Home1 = () => {
    const { connection } = useConnection();
    setProvider({ connection });
    const wallet = useWallet();
    const [isModalOpen, setModalOpen] = useState(false);
    const [al, setAl] = useState({} as TAuthorList);
    const [loading, setLoading] = useState(true);
    const [notify,setNotify] = useState(false)

    const [authorListPubKey] = PublicKey.findProgramAddressSync(
        [Buffer.from("author_list")],
        translateAddress("AGRJdaV5t2rKK7nTYFQiRztu8tKkKgoXMprTECZrLc7A")
    );
    connection.onAccountChange(authorListPubKey,()=>{
        setNotify(!notify);
    })

    const handleSendTransaction = async (
        name: string,
        description: string) => {
        console.log(name, description);
        if (!wallet.connected) {
            console.error("Wallet not connected!");
            return;
        }

        try {
            console.log("total",al.total.toString());
            const uid = al.total.add(new BN(1));
            console.log("uid", uid.toString())
            const [authorPubKey] = PublicKey.findProgramAddressSync(
                [Buffer.from("author"), numberToBeBytes(uid)],
                translateAddress("AGRJdaV5t2rKK7nTYFQiRztu8tKkKgoXMprTECZrLc7A")
            );

            const signer = translateAddress(wallet.publicKey?.toBase58() as string);
            const program = new Program<Blog>(idl);
            const addAuthor = await program.methods.addAuthor(
                new BN(uid),
                name,
                description,
                signer
            ).accounts({
                author: authorPubKey,
                authorList: authorListPubKey,
                signer: signer,
                system_program: SystemProgram.programId,
            }).transaction();

            wallet.sendTransaction(addAuthor, connection).then((sig) => {
                console.log(sig);

            });
        } catch (error) {
            alert("failed to send transaction: " + error);
            console.error("Transaction failed:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAuthorList();
                setAl(res);
                console.log("successfully fetching data");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [notify]);

    if (loading) {
        return <></>;
    }

    return (
        <>
            <SolanaProvider>
                <button onClick={() => setModalOpen(true)}>添加作家</button>
                <PaginationComponent
                    title={"作家列表"}
                    total={al.total}
                    getData={patchGetAuthor}
                />
                <AddAuthor
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleSendTransaction}
                />
            </SolanaProvider>
        </>
    );
};