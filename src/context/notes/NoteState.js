
import { useState } from "react";
import noteContext from "./NoteContext";

export default function NoteState(props) {
    const notesInitial = [
        {
            _id: "62ea3d07dd09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
        {
            _id: "62ea3d07ddfed09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title2",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
        {
            _id: "62ea3d07defed09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title2",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
        {
            _id: "62efea3d07dd09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title2",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
        {
            _id: "62ewdwea3d07dd09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title2",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
        {
            _id: "62eaedea3d07dd09a2a43d784810",
            user: "62ea3c35d100c613a83870c2",
            title: "my title2",
            description: "pg123",
            tag: "pg123",
            date: "2022-08-03T09:16:55.984Z",
            __v: 0,
        },
    ];

    const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{ notes: notes, setNotes: setNotes }}>
            {props.children}
        </noteContext.Provider>
    );
}
