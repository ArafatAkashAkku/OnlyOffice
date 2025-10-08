import jwt from "jsonwebtoken";

export async function GET(req) {
  const JWT_SECRET = 'onlyoffice'; // must match Document Server

  const payload = {
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
  };

  

  const token = jwt.sign(payload, JWT_SECRET);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
