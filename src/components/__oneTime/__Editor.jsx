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
import "./Editor.css";
export default function Editor({ inputValue, handleInputChange }) {
  return (
    <div className="__text_editor">
      <ReactQuill
        modules={modules}
        theme="snow"
        className="block lg:w-9/12 w-full bg-gray-400"
        value={inputValue?.instructions}
        onChange={(e) => handleInputChange("instructions", e)}
        placeholder="Instructions goes here..."
      />
    </div>
  );
}
