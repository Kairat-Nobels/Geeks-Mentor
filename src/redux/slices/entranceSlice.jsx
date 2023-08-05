import { createSlice } from "@reduxjs/toolkit";

const entranceSlice = createSlice({
    name: 'entranceSlice',
    initialState: {
        valid: JSON.parse(localStorage.getItem('autoriz')) || false
    },
    reducers: {
        cameWebsite: (state, action) =>
        {
            state.valid = true;
            let newData = {
                name: action.payload.name,
                email: action.payload.email,
                month: action.payload.month,
                course: action.payload.course,
                role: 'Студент'
            }
            if (action.payload.ava) newData = { ...newData, ava: action.payload.ava }
            if (action.payload.role) newData = { ...newData, role: action.payload.role }
            window.localStorage.setItem('data', JSON.stringify(newData))
            localStorage.setItem('autoriz', 'true')
        },
        outWebsite: (state) =>
        {
            state.valid = false;
            localStorage.removeItem('autoriz');
            localStorage.removeItem('name');
        }
    }
})

export const { cameWebsite, outWebsite } = entranceSlice.actions
export default entranceSlice.reducer