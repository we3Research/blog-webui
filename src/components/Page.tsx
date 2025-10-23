import React, {useState, useEffect, useMemo} from 'react';
import type {TAuthor} from "@/components/Author.tsx";

const ITEMS_PER_PAGE = 10;

type PageReq = {
    getData: (startIndex: number, endIndex: number) => Promise<TAuthor[]>,
    title: string,
    total: number
}

export const PaginationComponent: React.FC<PageReq> = ({total, getData, title}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentItems, setCurrentItems] = useState<TAuthor[]>([]);
    const [data, setData] = useState<TAuthor | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);
    const startIndex = useMemo(() => (currentPage - 1) * ITEMS_PER_PAGE, [currentPage]);
    const endIndex = useMemo(() => startIndex + ITEMS_PER_PAGE, [startIndex]);




    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const items = await getData(startIndex, endIndex);
                setCurrentItems(items);
                setData(items.length > 0 ? items[0] : null);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, getData, startIndex, endIndex]);

    const handleItemClick = (item: TAuthor) => {
        setData(item);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            padding: '20px',
            backgroundColor: '#2C2C2C', // 深色背景
            color: '#E0E0E0',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{display: 'flex', flexGrow: 1, marginBottom: '20px'}}>
                <div style={{flex: 1, padding: '20px', borderRight: '1px solid #444', overflowY: 'auto'}}>
                    <h2 style={{color: '#8400ff', marginBottom: '20px', fontSize: '1.5em'}}>{title}</h2>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {currentItems.map((item, index) => (
                            <li key={index}
                                onClick={() => handleItemClick(item)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    transition: 'background 0.3s, color 0.3s',
                                    background: data === item ? '#8400ff' : 'transparent',
                                    color: data === item ? '#FFFFFF' : '#E0E0E0',
                                    marginBottom: '10px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // 添加阴影效果
                                }}
                            >
                                {item.pseudonym}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{
                    flex: 2,
                    padding: '20px',
                    overflowY: 'auto',
                    backgroundColor: '#2C2C2C', // 背景颜色
                    borderRadius: '8px', // 圆角
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // 阴影效果
                }}>
                    {loading ? (
                        <p style={{fontSize: '1.5em', color: '#8400ff'}}>加载中...</p>
                    ) : (
                        data && (
                            <div style={{color: '#E0E0E0'}}>
                                <h3 style={{color: '#8400ff', marginBottom: '15px'}}>{data.pseudonym}</h3>
                                <div style={{marginBottom: '10px'}}>
                                    <strong>简介:</strong>
                                    <p style={{margin: '5px 0'}}>{data.introduction}</p>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <strong>已发布:</strong>
                                    <p style={{margin: '5px 0'}}>{data.total?.toString()} 篇博客</p>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <strong>地址:</strong>
                                    <p style={{margin: '5px 0'}}>{data.updater}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div style={{marginTop: '20px', textAlign: 'center'}}>
                <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    style={buttonStyle}
                >
                    上一页
                </button>
                <span style={{margin: '0 10px', fontSize: '1.1em', color: '#E0E0E0'}}>
                    第 {currentPage} 页 / 共 {totalPages} 页
                </span>
                <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={buttonStyle}
                >
                    下一页
                </button>
            </div>
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#8400ff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontSize: '1em', // 增加字体大小
};