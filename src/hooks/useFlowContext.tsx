import { FlowContext } from 'contexts/FlowContext';
import React from 'react';

const useFlowContext = () => {
    const context = React.useContext(FlowContext);

    if (!context) {
        throw new Error('useCustomFlowContext must be used within a FlowContextProvider');
    }

    return context;
};

export default useFlowContext;
