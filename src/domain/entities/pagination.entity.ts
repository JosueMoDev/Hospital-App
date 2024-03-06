interface PaginationOptions {
    currentPage: number;
    nextPage: string | null;
    previousPage: string | null;
    pageSize: number;
    total: number;
}
export class PaginationEntity {
    public currentPage!: number;
    public nextPage!: string | null;
    public previousPage!: string | null;
    public pageSize!: number;
    public total!: number;

    constructor(args: PaginationOptions) {
        const { currentPage, nextPage, previousPage, pageSize, total } = args;
        this.currentPage = currentPage ?? 1;
        this.nextPage = nextPage ?? null;
        this.previousPage = previousPage ?? null;
        this.pageSize = pageSize ?? 5;
        this.total = total ?? 0;
    }

    static pagination(object: { [key: string]: any }): PaginationEntity {
        const { currentPage, nextPage, previousPage, pageSize, total } = object;
        const pagination = new PaginationEntity({
            currentPage,
            nextPage,
            previousPage,
            pageSize,
            total,
        });
        return pagination;
    }
}
