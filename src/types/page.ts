export type PageReq = {
    pageNumber: number;
    pageSize: number;
}


export type PageRes<T> = {
    pageNumber: number;
    pageSize: number;
    total: number;
    data: T;
}

export type PageSE = {
    start: number;
    end: number;
    nodata?: boolean;
}


export function StartAndEnd(req: PageReq, total: number): PageSE {
    if (total == 0) {
        return {
            start:0,
            end:0,
            nodata: true,
        }
    }
    let start = (req.pageNumber - 1) * req.pageSize + 1;
    if (start > total) {
        start = 0;
    }
    let end = start + req.pageSize;
    if (end > total) {
        end = total;
    }
    return {
        start,
        end,
    }
}
