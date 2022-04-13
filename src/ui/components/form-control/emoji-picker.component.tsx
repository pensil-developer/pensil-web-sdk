import React from "react";
import Picker, { SKIN_TONE_LIGHT } from "emoji-picker-react";

export default function EmojiPicker({
  placeholder = "#",
  hidePlaceholder = false,
  emoji='',
  setEmoji = (_:any) => {},
  visible = false,
  setVisible = (_: any) => {},
}) {
  return (
    <div
      className="EmojiPicker relative"
      onBlur={(_) => {
        // hide on blur
        if (visible) {
            setVisible(false);
        }
      }}>
      {hidePlaceholder ? null : (
        <span
          onClick={(_) => {
            // toggle visibility of picker
            if (!visible) {
              setVisible(true);
            }
          }}
          className="cursor-pointer py-1 px-2 text-center">
          {emoji ? emoji : placeholder}
        </span>
      )}
      <div
        className="picker-container"
        style={{
          position: "absolute",
          zIndex: "100",
          display: visible ? "block" : "none",
        }}>
        <Picker
          onEmojiClick={(_, emojiObject) => {
            setEmoji(emojiObject.emoji);
            setVisible(false);
          }}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_LIGHT}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
      </div>
    </div>
  );
}
