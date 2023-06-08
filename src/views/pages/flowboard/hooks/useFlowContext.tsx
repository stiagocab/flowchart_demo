import React from 'react';
import { FlowContext } from '../context/FlowContext';

const useFlowContext = () => {
    const context = React.useContext(FlowContext);

    if (!context) {
        throw new Error('useCustomFlowContext must be used within a FlowContextProvider');
    }

    return context;
};

export default useFlowContext;
