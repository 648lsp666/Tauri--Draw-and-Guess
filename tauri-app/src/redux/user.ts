import { createSlice } from '@reduxjs/toolkit';
import {TLUserPreferences} from "tldraw";

// export interface UserWithCursor extends TLUserPreferences {
//     cursor: {
//         x: number;
//         y: number;
//         type: string;
//         rotation: number;
//     };
//     chatMessage: string;
// }

export interface Room {
    id: string;
    users: TLUserPreferences[];
    chatMessages?: string[];
}

export interface UserState {
    user: TLUserPreferences;
    room: Room;
}

const initialState: UserState = {
    user: {
        name: '',
        id: '',
        color: '',
    },
    room: {
        id: '',
        users: [],
        chatMessages: [],
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            Object.assign(state.user, action.payload);
        },
        setRoom(state, action) {
            state.room = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             // 这里可以添加一个匹配器来处理 effects 中的 action
    //         );
    // },
});

export const selectUser = (state: UserState) => state.user.user;

export const selectRoom = (state: UserState) => state.user.room;

export const { setUser, setRoom } = userSlice.actions;

export default userSlice.reducer;