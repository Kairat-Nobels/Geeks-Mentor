import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: {
        result: [],
        search: '',
        courses: ['Android', 'Frontend', 'UX/UI Дизайн', 'Backend', 'IOS', 'Технические Менторы'],
        languages: ['Кыргызский', 'Русский'],
        selected: '',
        langMentor: '',
        loading: false,
        error: null,
    },
    reducers: {
        selectFilter: (state, action) =>
        {
            state.selected = action.payload;
        },
        searchMentor: (state, action) =>
        {
            state.search = action.payload;
        },
        selectLang: (state, action) =>
        {
            state.langMentor = action.payload;
        }
    }
})

export const { selectFilter, searchMentor, selectLang } = filterSlice.actions;
export default filterSlice.reducer