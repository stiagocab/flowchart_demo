const FLOWS_BASE_PATH = '/flows';

export const FLOW_ROUTES = {
    main: `${FLOWS_BASE_PATH}`,
    workspaceCreate: `${FLOWS_BASE_PATH}/workspace/create`,
    workspaceEdit: `${FLOWS_BASE_PATH}/workspace/edit/:workspaceId`
};
