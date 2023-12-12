import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import imageHandler from './ImageHandler';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

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
    },
    imageResize: {
      modules: ['Resize', 'DisplaySize']
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
