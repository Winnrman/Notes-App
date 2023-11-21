import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import imageHandler from './ImageHandler';

function RichTextEditor({ value, onChange }) {
  const modules = {
    toolbar: {
      container: [
        // Include other toolbar options you want to show
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image'] // This is where you configure your image button
      ],
      handlers: {
        // This will overwrite the default image handler of React Quill
        'image': imageHandler
      }
    }
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      className="bg-slate-100 h-screen"
    />
  );
}

export default RichTextEditor;
