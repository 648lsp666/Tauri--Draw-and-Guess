import { createSlice } from '@reduxjs/toolkit';

export interface User {
    name: string;
    id: string;
    avatar?: string;
}

export interface UserWithCursor extends User {
    cursor: {
        x: number;
        y: number;
        type: string;
        rotation: number;
    };
    chatMessage: string;
}

export interface Room {
    users: UserWithCursor[];
    chatMessages: string[];
    shapes: any[];
}

export interface UserState {
    user: User;
    room: Room;
}

const initialState: UserState = {
    user: {
        name: '',
        id: '',
        avatar: '',
    },
    room: {
        users: [],
        chatMessages: [],
        shapes: [],
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
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

export const { setUser, setRoom } = userSlice.actions;

export default userSlice.reducer;