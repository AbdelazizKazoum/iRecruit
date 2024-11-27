import React from "react";

import { ArabicKeyboard as ArabicKeyboardWC } from "@/components/arabic-keyboard/arabic-keyboard";
import { createComponent } from "@lit/react";

const ArabicKeyboard = createComponent({
  tagName: "arabic-keyboard",
  elementClass: ArabicKeyboardWC,
  react: React,
});

function ArabicField() {
  return (
    <div>
      <ArabicKeyboard></ArabicKeyboard>
    </div>
  );
}

export default ArabicField;
