// Redux slice
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commentService from '../../services/CommentService';

export const fetchComments =  createAsyncThunk(
    'comments/fetchComments',
    async (id: string) => {
        const comments = await commentService.fetchComments(id);
        
        return comments;
    }
);

export const storeComment = createAsyncThunk(
    'comments/storeComments',
    async (comment: any) => {
        const commentResult = await commentService.store(comment);
        
        return commentResult;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { comments: [], loading: false },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state: any, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(storeComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeComment.fulfilled, (state: any, action: any) => {
                console.log(action)
                state.comments.push(action.payload.message);
                state.loading = false;
            })
            .addCase(storeComment.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default commentsSlice.reducer;