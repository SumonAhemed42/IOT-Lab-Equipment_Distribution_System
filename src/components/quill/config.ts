import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';// image-resize-related
import { ImageFormats } from '@xeger/quill-image-formats';// image-resize-related

Quill.register('modules/imageActions', ImageActions);// image-resize-related
Quill.register('modules/imageFormats', ImageFormats);// image-resize-related

export const modules = {
    imageActions: {}, // image-resize-related
    imageFormats: {},// image-resize-related
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        [{ 'align': [] }],// image-resize-related
        ['clean'],// image-resize-related
    ],
};

export const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    'align',// image-resize-related
    "background",
    "code-block",
    "color",
    // "float",
    "font",
    "height",
    "script",
    "size",
    "width"
];