import { Editor } from "@tinymce/tinymce-react"; // TinyMCE rich text editor
import React from "react";
import { Controller } from "react-hook-form"; // Allows integration of non-native inputs with react-hook-form

// RTE: A reusable Rich Text Editor component
// Props:
// - name: field name for form registration
// - control: control object from react-hook-form
// - label: optional label above the editor
// - defaultValue: default content inside the editor
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {/* Render label if provided */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* Use Controller to connect TinyMCE editor with react-hook-form */}
      <Controller
        name={name || "content"} // Set default name if not provided
        control={control} // Pass the control object from useForm
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="3yvz2yn7odt92iiqqu96e5fqke67m00or4o6qt4pmio1pxex"
            initialValue={defaultValue} // Set the initial content in the editor
            init={{
              initialValue: defaultValue, // Redundant but safe fallback
              height: 500, // Editor height
              menubar: true, // Show the top menu bar

              // Enable useful plugins
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],

              // Editor toolbar configuration
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",

              // Custom styling for content inside editor
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // Handle content change by updating react-hook-form
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
