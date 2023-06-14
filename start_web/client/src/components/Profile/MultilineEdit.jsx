// reference from https://www.emgoto.com/react-inline-edit/
import { useState, useRef, useEffect } from "react";

/*
 * This function renders a textarea element that allows multiline editing.
 *
 * Parameters:
 *   - placeholder: The placeholder text to display when the textarea is empty
 *   - value: The current text
 *   - index: An optional index in the value array (default: null)
 *   - setValue: A function to update the current text as well as the value of the textarea
 *   - setIsEdit: A function to update editMode
 *   - shouldFocus: A boolean indicating whether the textarea should call focus function (default: false)
 *
 * Return:
 *   - A textarea element with the specified placeholder, value, and event handlers.
 */
const MultilineEdit = ({
  placeholder,
  value,
  index = null,
  setValue,
  shouldFocus = false,
}) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.target.value, index);
    }

    // set corresponding editMode to be false
  };

  const onInput = (target) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px"; // Set the height based on the scroll height
  };

  const textareaRef = useRef();

  useEffect(() => {
    onInput(textareaRef.current);
  }, [onInput, textareaRef]);

  useEffect(() => {
    if (shouldFocus) {
      // focus on textarea and set cursor position to end of text
      textareaRef.current.focus();
      if (editingValue) {
        textareaRef.current.setSelectionRange(
          editingValue.length,
          editingValue.length
        );
      }
    }
  }, []);

  return (
    <textarea
      className="multiline-edit-textarea"
      rows={1}
      aria-label="Field name"
      value={editingValue}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={(event) => onInput(event.target)}
      ref={textareaRef}
    />
  );
};

export default MultilineEdit;
