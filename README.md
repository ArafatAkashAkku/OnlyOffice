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
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

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
- **Docker** (for OnlyOffice Document Server)
- **Docker Compose** (optional, for easier Docker management)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nexttest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Verify installed packages

The following packages will be installed:

```json
{
  "@onlyoffice/document-editor-react": "^2.1.1",
  "jsonwebtoken": "^9.0.2",
  "next": "15.5.4",
  "react": "19.1.0",
  "react-dom": "19.1.0"
}
```

## OnlyOffice Document Server Setup (Docker)

### Quick Setup with Docker Run

#### Step 1: Pull the OnlyOffice Document Server Image

```bash
docker pull onlyoffice/documentserver
```

#### Step 2: Run OnlyOffice Document Server

**Basic Setup (No JWT):**

```bash
docker run -i -t -d -p 8082:80 \
  --name onlyoffice-document-server \
  onlyoffice/documentserver
```

**Production Setup (With JWT Security):**

```bash
docker run -i -t -d -p 8082:80 \
  --name onlyoffice-document-server \
  -e JWT_ENABLED=true \
  -e JWT_SECRET=onlyoffice \
  -e JWT_HEADER=Authorization \
  -e JWT_IN_BODY=true \
  onlyoffice/documentserver
```

#### Step 3: Verify OnlyOffice is Running

Open your browser and navigate to:
```
http://localhost:8082/welcome
```

You should see the OnlyOffice welcome page.

### Advanced Docker Setup with Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  onlyoffice-documentserver:
    image: onlyoffice/documentserver:latest
    container_name: onlyoffice-document-server
    ports:
      - "8082:80"
    environment:
      - JWT_ENABLED=true
      - JWT_SECRET=onlyoffice
      - JWT_HEADER=Authorization
      - JWT_IN_BODY=true
    volumes:
      - onlyoffice_data:/var/www/onlyoffice/Data
      - onlyoffice_logs:/var/log/onlyoffice
    restart: unless-stopped

volumes:
  onlyoffice_data:
  onlyoffice_logs:
```

Run with Docker Compose:

```bash
docker-compose up -d
```

### Docker Management Commands

```bash
# Start the container
docker start onlyoffice-document-server

# Stop the container
docker stop onlyoffice-document-server

# View logs
docker logs onlyoffice-document-server

# Restart the container
docker restart onlyoffice-document-server

# Remove the container
docker rm -f onlyoffice-document-server
```

## Configuration

### Update Document Server URL

In `src/app/real/page.js`, update the `documentServerUrl` to match your Docker host:

```javascript
<DocumentEditor
  documentServerUrl="http://localhost:8082/"
  // or your network IP
  // documentServerUrl="http://192.168.1.157:8082/"
  ...
/>
```

### Update JWT Secret

Ensure the JWT secret matches in both files:

**In `src/app/api/real/route.js`:**
```javascript
const JWT_SECRET = 'onlyoffice'; // Must match Document Server
```

**In Docker run command:**
```bash
-e JWT_SECRET=onlyoffice
```

### Configure Document URL

In `src/app/api/real/route.js`, update the document URL:

```javascript
document: {
  url: 'https://your-domain.com/path/to/document.docx',
  // Must be publicly accessible by the Document Server
}
```

**Important:** The document URL must be accessible from the OnlyOffice Document Server container. For local development, use ngrok or a similar service to expose your local files.

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
http://localhost:3000/real
```

## API Documentation

### GET `/api/real`

Generates a JWT token for OnlyOffice Document Server authentication.

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Payload Structure:**

```javascript
{
  document: {
    fileType: 'docx',
    key: 'Khirz6zTPdfd7', // Unique document identifier
    title: 'Untitled Document.docx',
    url: 'https://your-domain.com/document.docx',
    permissions: {
      edit: true,
      download: false,
      print: true,
      review: false,
      chat: false,
      comment: false,
      protect: false
    },
    info: {
      folder: "Downloads",
      owner: "John Doe"
    }
  },
  editorConfig: {
    mode: 'edit', // or 'view'
    user: {
      id: "78e1e841",
      name: "Sigmative"
    },
    coEditing: { 
      mode: "strict", 
      change: false 
    },
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
        fileMenu: false
      },
      zoom: 90
    }
  }
}
```

## Component Documentation

### DocumentEditor Component

Located in `src/app/real/page.js`

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
| `editorConfig.mode` | string | Editor mode ('edit' or 'view') |
| `editorConfig.user` | object | User information |
| `customization.uiTheme` | string | UI theme ('theme-light', 'theme-dark') |

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OnlyOffice Configuration
ONLYOFFICE_SERVER_URL=http://localhost:8082
ONLYOFFICE_JWT_SECRET=onlyoffice

# Application Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Update your code to use environment variables:

```javascript
const JWT_SECRET = process.env.ONLYOFFICE_JWT_SECRET || 'onlyoffice';
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Document Server not accessible

**Error:** "Cannot connect to Document Server"

**Solution:**
- Check if Docker container is running: `docker ps`
- Verify the port mapping: `docker port onlyoffice-document-server`
- Ensure firewall allows port 8082
- Check the `documentServerUrl` in your component

#### 2. JWT Token Validation Failed

**Error:** "Error: JWT token validation failed"

**Solution:**
- Ensure `JWT_SECRET` matches in both API and Docker container
- Verify JWT is enabled in Docker: `-e JWT_ENABLED=true`
- Check that `JWT_IN_BODY=true` is set in Docker environment

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

#### 5. Network Issues with Docker

**Solution:**
```bash
# Use host network mode (Linux only)
docker run -i -t -d --network=host \
  --name onlyoffice-document-server \
  -e JWT_ENABLED=true \
  -e JWT_SECRET=onlyoffice \
  onlyoffice/documentserver
```

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

## License

This project is for demonstration purposes. Please refer to OnlyOffice licensing for commercial use.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Version:** 1.0.0  
**Last Updated:** October 2025  
**Maintained by:** Your Team

