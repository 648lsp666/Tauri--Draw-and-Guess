import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
    name: string;
    id: string;
    avatar?: string;
    belongTo?: string;
}

export interface UserWithCursor extends User {
    cursor: {
        x: number;
        y: number;
        type: string;
        rotation: number;
        color?: string;
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
        updateRoomUser(state, action: PayloadAction<UserWithCursor>) {
            let flag = 1;
            state.room.users.forEach(user => {
                if (user.id === action.payload.id) {
                    Object.assign(user, action.payload);
                    flag = 0;
                }
            })
            if (flag) {
                state.room.users.push(action.payload);
            }
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             // 这里可以添加一个匹配器来处理 effects 中的 action
    //         );
    // },
});


export const {setUser, setRoom, updateRoomUser} = userSlice.actions;

export default userSlice.reducer;