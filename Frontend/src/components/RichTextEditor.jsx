import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";
// import "../components/editor.css";

const theme = {
    // You can customize the theme classes here
};

function onChange(editorState) {
    editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
        console.log(root, selection);
    });
}

const editorConfig = {
    namespace: "MyEditor",
    theme,
    onError(error) {
        throw error;
    },
    nodes: [],
};

const RichTextEditor = ({ input, setInput }) => {

    const handleChange = (content) => {
        setInput({ ...input, description: content })
    }

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<div className="editor-placeholder">Enter some text...</div>}
                    ErrorBoundary={({ children }) => children}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={onChange} />
            </div>
        </LexicalComposer>
    );
}

export default RichTextEditor