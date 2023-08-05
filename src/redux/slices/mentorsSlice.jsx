import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import menotrApi from "../../api/mentorApi";

export const getMentors = createAsyncThunk(
    "getMentors",
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
export const searchMentors = createAsyncThunk(
    "searchMentors",
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
export const getOneMentor = createAsyncThunk(
    "getOneMentor",
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
export const createMentor = createAsyncThunk(
    "createMentor",
    async function (record = null, { dispatch, rejectWithValue })
    {
        try {
            const res = await fetch('https://644764a37bb84f5a3e3d9c51.mockapi.io/mentors', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                return 'Вы успешно зарегестрировались'
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const changeMentor = createAsyncThunk(
    "changeMentor",
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
            let newData = {
                name: responseData.name,
                email: responseData.email,
                month: responseData.month,
                course: responseData.course,
                role: responseData.role,
            }
            if (responseData.ava) newData = { ...newData, ava: responseData.ava };
            window.localStorage.setItem('data', JSON.stringify(newData))
            return responseData;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
)
export const deleteMentor = createAsyncThunk(
    'deleteMentor',
    async (mockupId) =>
    {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${mockupId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                const data = await response.json();
                return "Успешно удалено";
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const mentorsSlice = createSlice({
    name: 'mentorsSlice',
    initialState: {
        mentors: [],
        bestMentors: [],
        searchMentors: [],
        infoM: null,
        loading: false,
        error: null,
        success: null,
        delLoading: false,
        delMessage: false,
        delError: null,
    },
    extraReducers: builder =>
    {
        builder.addCase(getMentors.fulfilled, (state, action) =>
        {
            state.bestMentors = action.payload.slice(0, 10)
            state.loading = false;
            state.mentors = action.payload;
        })
        builder.addCase(getMentors.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getMentors.pending, (state, action) =>
        {
            state.loading = true;
        })
        // search
        builder.addCase(searchMentors.fulfilled, (state, action) =>
        {
            state.bestMentors = action.payload.slice(0, 10)
            state.loading = false;
            state.searchMentors = action.payload;
        })
        builder.addCase(searchMentors.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(searchMentors.pending, (state, action) =>
        {
            state.loading = true;
        })
        // getOne
        builder.addCase(getOneMentor.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.infoM = action.payload;
        })
        builder.addCase(getOneMentor.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getOneMentor.pending, (state, action) =>
        {
            state.loading = true;
        })
        // post
        builder.addCase(createMentor.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.success = action.payload;
        })
        builder.addCase(createMentor.rejected, (state, action) =>
        {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createMentor.pending, (state, action) =>
        {
            state.loading = true;
        })
        // change
        builder.addCase(changeMentor.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.infoM = action.payload;
        })
        builder.addCase(changeMentor.rejected, (state, action) =>
        {
            state.loading = false;
            state.error = action.payload;
            alert('Размер картинки слишком большой')
        })
        builder.addCase(changeMentor.pending, (state, action) =>
        {
            state.loading = true;
        })
        // delete
        builder.addCase(deleteMentor.pending, (state, action) =>
        {
            state.delLoading = true;
        })
        builder.addCase(deleteMentor.fulfilled, (state, action) =>
        {
            state.delLoading = false;
            state.delMessage = action.payload
        })
        builder.addCase(deleteMentor.rejected, (state, action) =>
        {
            if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
            else state.delError = action.error
            state.delLoading = false;
        })
    }
})

export default mentorsSlice.reducer