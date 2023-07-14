export interface IWorkspace {
    id: number;
    name: string;
    description: string;
    components: {
        config: {
            name: string;
            description: string;
            type: string; // Pass, Task, Parallel, Choise;
            params: { [key: string]: any }[];
        };
        customData?: { label: string; position?: number; [key: string]: any };
        input?: string;
        nextId?: string;
        prevId?: string;
    }[];
}
