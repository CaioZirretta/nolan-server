import { Room } from "@prisma/client";

export interface BaseCrudRepository<T> {
    list: () => Promise<T[]>;
    searchById: (id: string) => Promise<T>;
    create: (item: any) => Promise<T>;
    update: (item: any) => Promise<T>;
    delete: (id: string) => Promise<T>;
}
