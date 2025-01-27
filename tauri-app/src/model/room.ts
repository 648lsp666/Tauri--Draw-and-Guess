import {TLUserPreferences} from "tldraw";

export interface Room {
    id: string;
    members: TLUserPreferences[];
}