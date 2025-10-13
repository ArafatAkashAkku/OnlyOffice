"use client";

import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to fix corrupted XML tags in Word documents
  const fixCorruptedTags = (zip) => {
    // const regex = /(<w:t(?:[^>]*)>)([^<>]*)?({[^}]*}?)(<\/w:t>)/g;
    // const fixedRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    
    zip.file(/word\/.*\.xml/).forEach((file) => {
      let text = zip.file(file.name).asText();
      
      // Fix corrupted tags by removing formatting within placeholders
      text = text.replace(
        /<w:t[^>]*>([^<]*)<\/w:t>/g,
        (match, content) => {
          // Keep the match as is, but merge adjacent w:t tags
          return match;
        }
      );
      
      // More aggressive fix: merge all w:t tags that contain parts of {{ or }}
      const lines = text.split(/(<w:t[^>]*>|<\/w:t>)/);
      let buffer = '';
      let insideTag = false;
      let result = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.match(/<w:t[^>]*>/)) {
          insideTag = true;
          buffer += line;
        } else if (line === '</w:t>') {
          insideTag = false;
          buffer += line;
          result += buffer;
          buffer = '';
        } else if (insideTag) {
          buffer += line;
        } else {
          result += line;
        }
      }
      
      // Replace the file content with fixed content
      zip.file(file.name, result);
    });
    
    return zip;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch the template document from API
      const response = await fetch("/api/template");
      
      if (!response.ok) {
        throw new Error("Failed to fetch template");
      }

      const arrayBuffer = await response.arrayBuffer();
      
      // Load the document into PizZip
      let zip = new PizZip(arrayBuffer);
      
      // Fix corrupted XML tags
      zip = fixCorruptedTags(zip);
      
      // Create a docxtemplater instance
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: {
          start: '{{',
          end: '}}'
        }
      });

      // Replace placeholders with actual values
      doc.render({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      // Generate the modified document
      const blob = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Download the document
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.firstName}_${formData.lastName}_document.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      alert("Document downloaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      
      // Check if it's a template tag error
      if (error.name === "TemplateError" || error.message?.includes("tag")) {
        const shouldRedirect = window.confirm(
          "⚠️ Template Error Detected!\n\n" +
          "The template has corrupted placeholder tags. This happens when Word's formatting breaks the {{placeholders}}.\n\n" +
          "Would you like to create a clean template? Click OK to go to the template creator."
        );
        if (shouldRedirect) {
          window.location.href = "/create-template";
        }
      } else {
        alert("Failed to process document. Error: " + (error.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        padding: "40px",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "10px",
          textAlign: "center"
        }}>
          Document Generator
        </h1>
        <p style={{
          color: "#666",
          textAlign: "center",
          marginBottom: "30px"
        }}>
          Fill in your details to generate a personalized document
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.3s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.3s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.3s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            {loading ? "Processing..." : "Generate & Download Document"}
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          padding: "12px",
          background: "#f0f4ff",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#555"
        }}>
          <strong>Note:</strong> Make sure your template contains placeholders like 
          <code style={{ 
            background: "#e0e7ff", 
            padding: "2px 6px", 
            borderRadius: "4px",
            margin: "0 4px"
          }}>
            {"{"}{"{"}{"}"}firstName{"}"}{"}"}{"}"}
          </code>, 
          <code style={{ 
            background: "#e0e7ff", 
            padding: "2px 6px", 
            borderRadius: "4px",
            margin: "0 4px"
          }}>
            {"{"}{"{"}{"}"}lastName{"}"}{"}"}{"}"}
          </code>, and 
          <code style={{ 
            background: "#e0e7ff", 
            padding: "2px 6px", 
            borderRadius: "4px",
            margin: "0 4px"
          }}>
            {"{"}{"{"}{"}"}email{"}"}{"}"}{"}"}
          </code>
        </div>

        <div style={{
          marginTop: "15px",
          padding: "12px",
          background: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#856404",
          textAlign: "center"
        }}>
          <strong>⚠️ Getting template errors?</strong><br />
          <a 
            href="/create-template" 
            style={{ 
              color: "#0066cc", 
              textDecoration: "underline",
              fontWeight: "600"
            }}
          >
            Create a clean template here →
          </a>
        </div>
      </div>
    </div>
  );
}

