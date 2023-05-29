// action - state management
import { Edge, Node } from 'reactflow';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// ==============================|| ACCOUNT REDUCER ||============================== //

type customFlowContextProps = {
    nodes: Node[];
    edges: Edge[];
};

const initialState: customFlowContextProps = {
    nodes: [],
    edges: []
    // user: null
};

const customFlowReducer = createSlice({
    name: 'customFlow',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<Node>) {
            state.nodes.push(action.payload);
        },
        removeNode(state, action: PayloadAction<string>) {
            state.nodes = state.nodes.filter((node) => node.id !== action.payload);
        },
        addEdge(state, action: PayloadAction<Edge>) {
            state.edges.push(action.payload);
        },
        removeEdge(state, action: PayloadAction<string>) {
            state.edges = state.edges.filter((edge) => edge.id !== action.payload);
        }
    }
});

export const { addNode, removeNode, addEdge, removeEdge } = customFlowReducer.actions;

export default customFlowReducer.reducer;
