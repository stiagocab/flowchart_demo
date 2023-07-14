import { IWorkspace } from 'types/workspace';

const _mockData: IWorkspace[] = [
    {
        id: 10,
        name: 'Workspace 10',
        description: 'aliqua cupidatat voluptate ipsum tempor',
        components: [
            {
                id: 'A',
                description: 'Component A',
                type: 'Pass',
                inputData: [],
                params: [],
                label: 'Component A'
            },
            {
                id: 'B',
                description: 'Component B',
                type: 'Task',
                inputData: [],
                params: [],
                label: 'Component B',
                prevId: 'A'
            },
            {
                id: 'C',
                description: 'Component C',
                type: 'Parallel',
                inputData: [],
                params: [],
                label: 'Component C',
                prevId: 'A'
            },
            {
                id: 'D',
                description: 'Component D',
                type: 'Choice',
                inputData: [],
                params: [],
                label: 'Component D',
                prevId: 'C'
            },
            {
                id: 'E',
                description: 'Component E',
                type: 'State',
                inputData: [],
                params: [],
                label: 'Component E',
                prevId: 'C'
            },
            {
                id: 'F',
                description: 'Component F',
                type: 'Task',
                inputData: [],
                params: [],
                label: 'Component F',
                prevId: 'B'
            }
        ]
    },
    {
        id: 11,
        name: 'Workspace 11',
        description: 'ea id qui duis reprehenderit',
        components: []
    },
    {
        id: 12,
        name: 'Workspace 12',
        description: 'Lorem dolore dolore tempor ullamco',
        components: []
    },
    {
        id: 13,
        name: 'Workspace 13',
        description: 'adipisicing laborum sint in eiusmod veniam ex adipisicing fugiat sint nostrud duis reprehenderit',
        components: []
    },
    {
        id: 14,
        name: 'Workspace 14',
        description: 'fugiat id ullamco qui nulla reprehenderit culpa mollit',
        components: []
    }
];

export const getMockData = (): Promise<IWorkspace[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData: IWorkspace[] = [..._mockData];
            resolve(mockData);
        }, 500);
    });
};

export const getWorkspace = (workspaceId: number | string): Promise<IWorkspace> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData: IWorkspace | undefined = _mockData.find((item) => item.id === Number(workspaceId));

            resolve(mockData!);
        }, 500);
    });
};

type NodeComponent = {
    id: string;
    description: string;
    type: string; // 'Pass', 'Task', 'Parallel', 'Choise', 'State';
    inputData: { [key: string]: any }[];
    params: { [key: string]: any }[];
    label: string;
    position?: { x: number; y: number };
    nextId?: string;
    prevId?: string;
};

export const nodsGenerator = (max: number = 10): NodeComponent[] => {
    let components: NodeComponent[] = [];
    let i = 0;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    while (i <= max) {
        const id = alphabet[i];
        const prevId = alphabet[i - 1] || null;

        let component: NodeComponent = {
            id,
            description: `Component ${id}`,
            type: 'Pass',
            inputData: [],
            params: [],
            label: `Component ${id}`
        };

        if (prevId) {
            component.prevId = prevId;
        }

        components = [...components, component];
    }

    return [];
};
