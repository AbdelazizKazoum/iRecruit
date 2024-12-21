import React, { useRef, useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import { Input } from "@/components/ui/input";

import "react-simple-keyboard/build/css/index.css";
import { useFormContext } from "react-hook-form";

function ArabicKeyboard({ fieldConfig, field, locale }) {
  console.log("🚀 ~ ArabicKeyboard ~ field:", field);
  const [input, setInput] = useState(field.value ?? "");
  const [layout, setLayout] = useState("default");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Track keyboard visibility
  const keyboard = useRef();
  const inputRef = useRef();
  const keyboardRef = useRef();

  // Hooks
  const { setValue, trigger } = useFormContext();

  // Focus on the input whenever necessary
  useEffect(() => {
    // Click outside to hide keyboard

    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        keyboardRef.current &&
        !keyboardRef.current.contains(event.target)
      ) {
        setIsKeyboardVisible(false); // Hide the keyboard when clicked outside
      }
    };

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arabicLayout = {
    default: [
      "ض ص ث ق ف غ ع ه خ ح ج د {bksp}",
      "ش س ي ب ل ا ت ن م ك ط",
      "ئ ء ؤ ر لا ى ة و ز ظ {enter}",
      "{shift} ذ أ إ آ ء ة {shift}",
      "{space}", // Space button as a separate row
    ],
    shift: [
      "َ ً ُ ٌ ِ ٍ ْ ـ ّ ٠ ١ ٢ ٣ {bksp}",
      "٤ ٥ ٦ ٧ ٨ ٩ : ; , . / ؟",
      "§ ! @ # $ % ^ & * ( ) _ + {enter}",
      "{shift} ~ ` | \\ \" ' {shift}",
      "{space}", // Space button as a separate row
    ],
  };

  const display = {
    "{bksp}": "⌫",
    "{enter}": "⏎",
    "{shift}": "⇧",
    "{space}": "المساحة",
  };

  // English to Arabic Mapping
  const englishToArabicMap = {
    a: "ا",
    b: "ب",
    c: "ت",
    d: "د",
    e: "ع",
    f: "ف",
    g: "غ",
    h: "ه",
    i: "ي",
    j: "ج",
    k: "ك",
    l: "ل",
    m: "م",
    n: "ن",
    o: "و",
    p: "ر",
    q: "ق",
    r: "ر",
    s: "س",
    t: "ت",
    u: "ء",
    v: "ظ",
    w: "و",
    x: "ز",
    y: "ي",
    z: "ذ",
    // Add more mappings as necessary
  };

  const onChange = (input) => {
    setInput(input);
    setValue(fieldConfig.name, input);
    trigger(fieldConfig.name);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
    setValue(fieldConfig.name, input);
    trigger(fieldConfig.name);
  };

  const onKeyDown = (event) => {
    const key = event.key.toLowerCase(); // Get the pressed key
    if (englishToArabicMap[key]) {
      event.preventDefault(); // Prevent default behavior
      const arabicLetter = englishToArabicMap[key];
      const newInput = input + arabicLetter;
      setInput(newInput);
      keyboard.current.setInput(newInput);
      setValue(fieldConfig.name, newInput);
      trigger(fieldConfig.name);
    }
  };

  const handleFocus = () => {
    setIsKeyboardVisible(true); // Show the keyboard when input is focused
  };

  return (
    <div className="App">
      <Input
        dir="rtl"
        name={fieldConfig.name || null}
        ref={inputRef} // Attach the ref to the input
        value={input}
        placeholder={fieldConfig.placeholder && fieldConfig.placeholder[locale]}
        onChange={onChangeInput}
        onKeyDown={onKeyDown} // Attach onKeyDown listener
        onFocus={handleFocus} // Show keyboard when input is focused
      />
      {/* Apply Tailwind's 'hidden' class based on keyboard visibility */}
      <div
        ref={keyboardRef} // The virtual keyboard container
        className={`${isKeyboardVisible ? "" : "hidden"}`} // Toggle visibility using the hidden class
      >
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          layout={arabicLayout}
          display={display}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}

export default ArabicKeyboard;
