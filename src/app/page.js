"use client";

import { useState, useEffect } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

export default function HomePage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/api/token")
      .then(res => res.json())
      .then(data => setToken(data.token))
      .catch(err => console.error(err));
  }, []);

  if (!token) return <div>Loading document...</div>;

  return (
    <div style={{ height: "100vh" }}>
      <DocumentEditor
        id="docxEditor"
        // documentServerUrl="http://localhost:8080/"
        documentServerUrl="http://192.168.1.157:8080/"


        config = {{
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
            // callbackUrl: "http://localhost:8080/dummy-callback",
            user: {
              id: "78e1e841",
              name: "Sigmative",
            },
            coEditing: { mode: "strict", change: false },
            customization: {
              layout: "", // options: "ribbon", "compact", "classic", "review"
              chat: false,
              comments: false,
              plugins: false,
              feedback: false,
              help: false,
              autosave: false,
              uiTheme: "theme-light", // theme-dark, theme-system
              features: {
                saveAs: true,
                open: true,
                fileMenu: false,
              },
              zoom: 90,
            },
          },
        }}
        // config={{
        //   document: {
        //     fileType: "docx",
        //     key: "sample-local-2025",
        //     title: "Sample Document.docx",
        //     url: "http://farid-staging-yluxk8.flywp.xyz/wp-content/uploads/2025/10/sample.docx",
        //     token: token,
        //     permissions: {
        //       chat: false,    // disables chat
        //       comment: false, // disables comments
        //       review: false, // disables review
        //       // print: false, // disables print
        //       saveAs: false, // disables saveAs
        //       saveAsTemplate: true, // disables saveAsTemplate
        //     },
        //   },
        //   documentType: "word",
        //   editorConfig: {
        //     mode: "edit",
        //     // callbackUrl: "http://localhost:8080/dummy-callback",
        //     // lang: "bn",
        //     user: {
        //       id: "user-123", // unique user ID
        //       name: "Sigmative",
        //       // avatarUrl: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png" // <-- your custom image
        //     },
        //     customization: {
        //       info: false,          // Disables the info tab specifically
        //       // logo: {
        //       //   image: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png", // small test image
        //       //   url: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       //   visible: true
        //       // },
        //       // loaderLogo: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       mobile: {
        //         forceView: false,
        //         info: true,
        //         standardView: true,
        //       },
        //       uiTheme: "theme-dark",
        //       compactHeader: false,  // keep the normal header layout
        //       plugins: false,        // disables AI, smart plugins, etc.
        //       feedback: false,       // removes feedback button
        //       help: false,           // optional: remove help icon
        //       goback: { show: false }, // optional: hide back button
        //       chat: false,
        //       comments: false,
        //       reviewDisplay: false,
        //       // about: false, // hide "About ONLYOFFICE"
        //       // width: "0%",
        //       region: "bn-BD",
        //       // templates: [
        //       //   {
        //       //     image: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       //     title: "sigmative-logo-final-format-2025.png",
        //       //     url: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       //   },
        //       //   {
        //       //     image: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       //     title: "sigmative-logo-final-format-2025.png",
        //       //     url: "https://sigmative.com/wp-content/uploads/2025/01/sigmative-logo-final-format-2025.png",
        //       //   },
        //       // ],
        //     },
        //   },
        // }}
        events_onDocumentReady={() => console.log("Document ready")}
        onLoadComponentError={(code, desc) => console.error(code, desc)}
      />
    </div>
  );
}
