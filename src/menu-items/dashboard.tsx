// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconArtboard } from '@tabler/icons';
import { NavItemType } from 'types';
import { FLOW_ROUTES } from 'routes/pathGenerator';

// constant
const icons = {
    IconArtboard
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: NavItemType = {
    id: 'flows',
    type: 'group',
    children: [
        {
            id: FLOW_ROUTES.main,
            title: 'Workspaces',
            type: 'item',
            url: FLOW_ROUTES.main,
            icon: icons.IconArtboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
