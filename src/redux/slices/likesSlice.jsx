import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const changeLike = createAsyncThunk(
    "changeLike",
    async function ({ data, api })
    {
        try {
            const response = await fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
)

const likesSlice = createSlice({
    name: 'likesSlice',
    initialState: {
        likesInfo: null,
        loading: false,
        error: null
    },
    extraReducers: builder =>
    {
        // change
        builder.addCase(changeLike.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.likesInfo = action.payload;
        })
        builder.addCase(changeLike.rejected, (state, action) =>
        {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(changeLike.pending, (state, action) =>
        {
            state.loading = true;
        })
    }
})

export default likesSlice.reducer