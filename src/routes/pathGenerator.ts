const FLOWS_BASE_PATH = '/flows';

export const FLOW_ROUTES = {
    main: `${FLOWS_BASE_PATH}`,
    workspaceCreate: `${FLOWS_BASE_PATH}/workspace/create`,
    workspaceEdit: `${FLOWS_BASE_PATH}/workspace/edit/:workspaceId`
};

export const generateRoute = (route: string, keys: { [key: string]: number | string }): string => {
    let generatedRoute = route;

    for (const key in keys) {
        const value = keys[key];
        generatedRoute = generatedRoute.replace(`:${key}`, String(value));
    }

    return generatedRoute;
};
