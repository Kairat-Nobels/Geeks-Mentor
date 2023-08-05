import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionApi from "../../api/questionApi";
export const getQuestions = createAsyncThunk(
    "getQuestions",
    async function (api, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch(api);
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)


export const postQuestions = createAsyncThunk(
    "postQuestions",
    async function (record = null, { dispatch, rejectWithValue })
    {
        try {
            const res = await fetch(questionApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                return 'Ваш вопрос отправлен'
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

const questionsSlice = createSlice({
    name: 'questionsSlice',
    initialState: {
        questions: [],
        loading: false,
        error: null,
        success: null
    },
    extraReducers: builder =>
    {
        builder.addCase(getQuestions.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.questions = action.payload;
        })
        builder.addCase(getQuestions.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getQuestions.pending, (state, action) =>
        {
            state.loading = true;
        })
        // post
        builder.addCase(postQuestions.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.error = null;
            state.success = action.payload;
        })
        builder.addCase(postQuestions.rejected, (state, action) =>
        {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(postQuestions.pending, (state, action) =>
        {
            state.loading = true;
        })
    }
})

export default questionsSlice.reducer