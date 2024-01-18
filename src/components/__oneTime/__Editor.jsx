import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
import "./__Editor.css";
export default function Editor({ editorValue, handleInputChange }) {
  return (
    <div className="__text_editor overflow-y-scroll">
      <ReactQuill
        modules={modules}
        theme="snow"
        className="block w-full bg-gray-50 hover:bg-gray-100 overflow-y-scroll"
        value={editorValue?.instructions}
        onChange={(e) => handleInputChange("instructions", e)}
        placeholder="Instructions goes here..."
      />
    </div>
  );
}
