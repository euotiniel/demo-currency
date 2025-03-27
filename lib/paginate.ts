

export const paginate = (data: any[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
}