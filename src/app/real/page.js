"use client";

import { useState, useEffect } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

export default function HomePage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/api/real")
      .then(res => res.json())
      .then(data => setToken(data.token))
      .catch(err => console.error(err));
  }, []);

  if (!token) return <div>Loading document...</div>;
  console.log(token);

  return (
    <div style={{ height: "100vh" }}>
      <DocumentEditor
        id="docxEditor"
        documentServerUrl="http://192.168.1.157:8082/"

        config = {{
          token, // added later
          documentType: 'word',
          document: {
            fileType: 'docx',
            key: 'Khirz6zTPdfd7',
            title: 'Untitled Document.docx',
            url: 'http://farid-staging-yluxk8.flywp.xyz/wp-content/uploads/2025/10/sample.docx',
            permissions: {
              edit: true,
              download: false,
              print: true,
              review: false,
              chat: false,
              comment: false,
              protect: false,
            },
            info: {
              folder: "Downloads",
              owner: "John Doe", 
            },
          },
          editorConfig: {
            mode: 'edit',
            // callbackUrl: "http://192.168.1.157:3000/api/save",
            user: {
              id: "78e1e841",
              name: "Sigmative",
            },
            coEditing: { mode: "strict", change: false },
            customization: {
              chat: false,
              comments: false,
              plugins: false,
              feedback: false,
              help: false,
              autosave: false,
              uiTheme: "theme-light",
              features: {
                saveAs: true,
                open: true,
                fileMenu: false,
              },
              zoom: 90,
            },
          },
        }}
        events_onDocumentReady={() => console.log("Document ready")}
        onLoadComponentError={(code, desc) => console.error(code, desc)}
      />
    </div>
  );
}
