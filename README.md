# OnlyOffice Document Editor - React Integration

A complete implementation of OnlyOffice Document Editor integrated with React, featuring JWT-based authentication, real-time document editing, and secure document server communication.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [OnlyOffice Document Server Setup (Docker)](#onlyoffice-document-server-setup-docker)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)

## Overview

This application provides a seamless integration of OnlyOffice Document Server with React, allowing users to view and edit documents (DOCX, XLSX, PPTX) directly in the browser with JWT-based security.

## Features

- **Real-time Document Editing** - Edit DOCX files in the browser
- **JWT Authentication** - Secure token-based authentication
- **Customizable UI** - Configurable editor theme and features
- **Document Permissions** - Granular control over edit, download, print, review, chat, and comments
- **Co-editing Support** - Strict mode collaborative editing
- **Lightweight Integration** - Simple React component integration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

## Installation

### 1. Create a new React project named onlyoffice-react using the Create React App package:

```bash
npx create-react-app onlyoffice-react
```

### 2. Go to the newly created directory:

```bash
cd onlyoffice-react
```

### 3. Install ONLYOFFICE Docs React component from npm:

```bash
npm install @onlyoffice/document-editor-react
```

## OnlyOffice Document Server Setup (Docker)

### Quick Setup with Docker Run

#### Step 1: Pull the OnlyOffice Document Server Image

```bash
docker pull onlyoffice/documentserver:latest
```

#### Step 2: Run OnlyOffice Document Server for Development

**Basic Setup (No JWT):**

```bash
docker run -i -t -d -p 8080:80 \
  -e JWT_ENABLED=false \
  -e JWT_SECRET=your_jwt_secret \
  onlyoffice/documentserver
```

**Production Setup (With JWT Security):**

```bash
docker run -i -t -d -p 8080:80 \
  -e JWT_ENABLED=true \
  -e JWT_SECRET=your_jwt_secret \
  onlyoffice/documentserver
```

#### Step 3: Verify OnlyOffice is Running

Open your browser and navigate to:
```
http://localhost:8080
```

You should see the OnlyOffice welcome page.

## Configuration

### Update Document Server URL

In `src/App.js`, update the code:

```javascript
import { useState, useEffect } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch(`http://example.com/api/token`) // api server
      .then(res => res.json())
      .then(data => setToken(data.token))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <DocumentEditor
      id="docxEditor"
      documentServerUrl="http://documentserver/"
      config={{
        token, // token will be fetched from api server with jwt
        documentType: "word",
        document: {
          fileType: "docx",
          key: "RandomKey",
          title: "Example Document Title.docx",
          url: "https://example.com/url-to-example-document.docx",
        },
        editorConfig: {
          callbackUrl: "https://example.com/url-to-callback.ashx",
        },
      }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
    />
  )
}
```

**Important:** The document URL must be accessible from the OnlyOffice Document Server container.

## 🎮 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Access the Document Editor

Navigate to:
```
http://localhost:3000/
```

## API Documentation

### GET `/api/token`

Generates a JWT token for OnlyOffice Document Server authentication.

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```


### Create a server (Example: Express Server)

Ensure the JWT secret matches in both docker and server api:


```javascript
const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const app = express(); 

app.use(cors()); // allow cors

app.get('/api/token', (req, res) => { 

    const JWT_SECRET = 'your_secret_key'; // must match Document Server

    const payload = {
       document: {
          fileType: "docx",
          key: "RandomKey",
          title: "Example Document Title.docx",
          url: "https://example.com/url-to-example-document.docx",
        },
        editorConfig: {
          callbackUrl: "https://example.com/url-to-callback.ashx",
        },
    }

    const token = jwt.sign(payload, JWT_SECRET);
    res.json({ token });
});

app.listen(5000, () => {
    console.log(`Server is running on port http://localhost:5000`);
});
```

## Component Documentation

### DocumentEditor Component

Located in `src/App.js`

**Props:**
- `id` - Unique identifier for the editor instance
- `documentServerUrl` - URL to your OnlyOffice Document Server
- `config` - Configuration object containing token and document settings
- `events_onDocumentReady` - Callback when document is loaded
- `onLoadComponentError` - Error handler callback

**Configuration Options:**

| Option | Type | Description |
|--------|------|-------------|
| `token` | string | JWT authentication token |
| `documentType` | string | Document type ('word', 'cell', 'slide') |
| `document.fileType` | string | File extension ('docx', 'xlsx', 'pptx') |
| `document.key` | string | Unique document identifier (must change when document changes) |
| `document.url` | string | Public URL to the document |
| `document.title` | string | Display title for the document |
| `document.permissions` | object | Granular permission controls |
| `document.permissions.edit` | boolean | Allow editing the document |
| `document.permissions.download` | boolean | Allow downloading the document |
| `document.permissions.print` | boolean | Allow printing the document |
| `document.permissions.review` | boolean | Allow reviewing/tracking changes |
| `document.permissions.chat` | boolean | Enable chat functionality |
| `document.permissions.comment` | boolean | Allow adding comments |
| `document.permissions.protect` | boolean | Allow protecting document sections |
| `document.info` | object | Additional document metadata |
| `document.info.folder` | string | Folder location of the document |
| `document.info.owner` | string | Document owner name |
| `editorConfig.mode` | string | Editor mode ('edit' or 'view') |
| `editorConfig.callbackUrl` | string | URL for document saving callbacks |
| `editorConfig.user` | object | User information |
| `editorConfig.user.id` | string | Unique user identifier |
| `editorConfig.user.name` | string | User display name |
| `editorConfig.coEditing` | object | Co-editing configuration |
| `editorConfig.coEditing.mode` | string | Co-editing mode ('strict' or 'fast') |
| `editorConfig.coEditing.change` | boolean | Track changes in co-editing |
| `customization.uiTheme` | string | UI theme ('theme-light', 'theme-dark') |
| `customization.chat` | boolean | Enable/disable chat interface |
| `customization.comments` | boolean | Enable/disable comments interface |
| `customization.plugins` | boolean | Enable/disable plugins |
| `customization.feedback` | boolean | Enable/disable feedback option |
| `customization.help` | boolean | Enable/disable help menu |
| `customization.autosave` | boolean | Enable/disable autosave functionality |
| `customization.zoom` | number | Default zoom level (e.g., 90 for 90%) |
| `customization.features` | object | Feature toggles for UI elements |
| `customization.features.saveAs` | boolean | Enable/disable 'Save As' option |
| `customization.features.open` | boolean | Enable/disable 'Open' option |
| `customization.features.fileMenu` | boolean | Enable/disable file menu |

## 🛠️ Troubleshooting

### Common Issues

#### 1. Document Server not accessible

**Error:** "Cannot connect to Document Server"

**Solution:**
- Check if Docker container is running: `docker ps`
- Verify the port mapping: `docker port onlyoffice-document-server`
- Ensure firewall allows port 8080
- Check the `documentServerUrl` in your component

#### 2. JWT Token Validation Failed

**Error:** "Error: JWT token validation failed"

**Solution:**
- Ensure `JWT_SECRET` matches in both API and Docker container
- Verify JWT is enabled in Docker: `-e JWT_ENABLED=true`
- Check that `JWT_SECRET=your_secret_key` is set in Docker environment

#### 3. Document URL not accessible

**Error:** "Error: Document URL is not accessible"

**Solution:**
- Document URL must be publicly accessible
- Use ngrok for local development: `ngrok http 3000`
- Ensure CORS is properly configured on your file server
- Check network connectivity from Docker container to document URL

#### 4. Component not rendering

**Error:** Blank screen or loading infinitely

**Solution:**
- Check browser console for errors
- Verify React version compatibility (19.1.0)
- Ensure token is being fetched successfully
- Check OnlyOffice Document Server logs: `docker logs onlyoffice-document-server`


### Debug Mode

Enable detailed logging:

```javascript
// In src/app/real/page.js
console.log("Token:", token);
console.log("Document Server URL:", documentServerUrl);

// Add error handler
events_onError={(error) => {
  console.error("OnlyOffice Error:", error);
}}
```

### Check Docker Container Health

```bash
# Check container status
docker inspect onlyoffice-document-server

# Check container logs
docker logs -f onlyoffice-document-server

# Execute command inside container
docker exec -it onlyoffice-document-server bash
```

## Additional Resources

- [OnlyOffice API Documentation](https://api.onlyoffice.com/editors/basic)
- [OnlyOffice React Integration](https://www.npmjs.com/package/@onlyoffice/document-editor-react)
- [JWT.io - JWT Debugger](https://jwt.io/)
- [Docker Documentation](https://docs.docker.com/)

## 🔑 Key Points

1. **JWT Secret:** Must match between application and Document Server
2. **Document Key:** Must be unique and change when document content changes
3. **Document URL:** Must be publicly accessible from Document Server container
4. **Network:** Ensure Document Server can reach your application API
5. **CORS:** Configure proper CORS headers if using external document URLs



