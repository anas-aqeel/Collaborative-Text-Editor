"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "./Avatars";
import { SunIcon } from "../icons/Sun";
import { MoonIcon } from "../icons/Moon";
import { Button } from "../primitives/Button";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState();
  const [provider, setProvider] = useState();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} />;
}



function BlockNote({ doc, provider }) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const editor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo.name,
        color: userInfo.color,
      },
    },
  });

  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Button
          className={styles.button}
          variant="subtle"
          onClick={changeTheme}
          aria-label="Switch Theme"
        >
          {theme === "dark" ? (
            <SunIcon style={{ width: "18px" }} />
          ) : (
            <MoonIcon style={{ width: "18px" }} />
          )}
        </Button>
        <Avatars />
      </div>
      <div className={styles.editorPanel}>
        <BlockNoteView
          editor={editor}
          className={styles.editorContainer}
          theme={theme}
        />
      </div>
    </div>
  );
}