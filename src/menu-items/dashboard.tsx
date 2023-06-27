// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { NavItemType } from 'types';
import { FLOW_ROUTES } from 'routes/pathGenerator';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: NavItemType = {
    id: 'flows',
    title: 'Workspaces',
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: FLOW_ROUTES.main,
            title: <FormattedMessage id="default" />,
            type: 'item',
            url: FLOW_ROUTES.main,
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
