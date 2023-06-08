import MainCard from 'ui-component/cards/MainCard';
import BoardComponent from './boardcomponent';

import NodeSettings from './NodesSettings';
import { Box } from '@mui/system';

export default function FlowchartPage() {
    return (
        <MainCard title="Flow chart">
            {/* <BoardComponent /> */}
            <Box sx={{ position: 'relative', width: 1, height: 600 }}>
                <BoardComponent />

                <NodeSettings />
            </Box>
        </MainCard>
    );
}
