import { IWorkspace } from 'types/workspace';

const _mockData: IWorkspace[] = [
    {
        id: 11,
        name: 'workflow 1',
        description: 'Test workflow',
        components: [
            {
                config: {
                    name: 'com-1',
                    description: 'This is the first component',
                    type: 'Pass', //, "Pass"(pass data) ,"Task" (Lambda, s3 etc) ,"Parallel" (en paralelo)
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                nextId: 'com-2'
            },
            {
                config: {
                    name: 'com-2',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-1',
                nextId: 'com-3'
            },
            {
                config: {
                    name: 'com-3',
                    description: 'This is the third and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-A',
                    description: 'This is the four and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-B',
                    description: 'This is the four and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-C',
                    description: 'This is the four and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-D',
                    description: 'This is the four and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            }
        ]
    },
    {
        id: 12,
        name: 'workflow 2',
        description: 'Test workflow',
        components: [
            {
                config: {
                    name: 'com-1',
                    description: 'This is the first component',
                    type: 'Pass', //, "Pass"(pass data) ,"Task" (Lambda, s3 etc) ,"Parallel" (en paralelo), "Choice", "State"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                customData: {
                    label: 'Main',
                    postion: { x: 0, y: 0 }
                },
                input: 'ComponentIO',
                nextId: 'com-2'
            },
            {
                config: {
                    name: 'com-2',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                customData: {
                    label: 'Name',
                    postion: { x: 0, y: 0 }
                },
                input: 'ComponentIO',
                prevId: 'com-1',
                nextId: 'com-3'
            },
            {
                config: {
                    name: 'com-2-a',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-b',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-c',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-2-c-1',
                    description: 'This is the second and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2-c'
            },
            {
                config: {
                    name: 'com-3',
                    description: 'This is the third and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-2'
            },
            {
                config: {
                    name: 'com-3-A',
                    description: 'This is the third and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-3'
            },
            {
                config: {
                    name: 'com-3-A-1',
                    description: 'This is the third and last component',
                    type: 'Pass', //, "Task" ,"Parallel"
                    params: [
                        {
                            key: 'value'
                        }
                    ]
                },
                input: 'ComponentIO',
                prevId: 'com-3-A'
            }
        ]
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
