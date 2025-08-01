export interface ResultadoBusca<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}
