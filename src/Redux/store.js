import { createStore } from 'redux';
import { root } from './Reducers/root';

export const store = createStore(
    root
);