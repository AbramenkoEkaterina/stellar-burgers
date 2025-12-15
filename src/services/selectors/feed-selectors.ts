import { RootState } from '../store';

export const selectFeed = (state: RootState) => state.feed.feed;
export const selectFeedLoadding = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const getSelectedOrder = (state: RootState) => state.feed.selectedOrder;
