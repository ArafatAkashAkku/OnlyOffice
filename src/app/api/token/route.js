import jwt from "jsonwebtoken";

export async function GET(req) {
  const JWT_SECRET = "onlyoffice"; // must match Document Server

  const payload = {
    document: {
      fileType: "docx",
      key: "sample-local-2025", // unique per document
      title: "Sample Document.docx",
      url: "http://farid-staging-yluxk8.flywp.xyz/wp-content/uploads/2025/10/sample.docx",
    },
    editorConfig: {
      mode: "edit",
    //   callbackUrl: "http://localhost:8080/dummy-callback",
    },
  };

  // const payload = {
  //   document: {
  //     fileType: "docx",
  //     key: "sample-local-2025", // must be unique per document version
  //     title: "Sample Document.docx",
  //     url: "http://farid-staging-yluxk8.flywp.xyz/wp-content/uploads/2025/10/sample.docx",
  //     permissions: {
  //       edit: true,
  //       download: true,
  //       comment: false,
  //     },
  //   },
  //   editorConfig: {
  //     mode: "edit",
  //     user: {
  //       id: "user-123",
  //       name: "Arafat Akash",
  //     },
  //     lang: "en",
  //     customization: {
  //       forcesave: false,
  //     },
  //   },
  // };
  

  const token = jwt.sign(payload, JWT_SECRET);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
