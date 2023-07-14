export interface IWorkspace {
    id: number;
    name: string;
    description: string;
    components: {
        id: string;
        description: string;
        type: string; // 'Pass', 'Task', 'Parallel', 'Choise', 'State';
        inputData: { [key: string]: any }[];
        params: { [key: string]: any }[];
        label: string;
        position?: { x: number; y: number };
        nextId?: string;
        prevId?: string;
    }[];
}
