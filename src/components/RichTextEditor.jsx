import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles

function RichTextEditor({ value, onChange }) {
  // No need to use useState if you're controlling the value from the parent component

  const handleChange = value => {
    // Here, you call the passed onChange prop, which should be the method defined in the parent component
    onChange(value);
  };

  return (
    <ReactQuill value={value} onChange={handleChange} />
  );
}

export default RichTextEditor;
