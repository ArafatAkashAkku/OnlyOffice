# ✅ Plugin Setup Complete!

## 📁 Files Created:

### 1. Plugin Files (in `/public/plugins/insertdata/`)
```
public/
  └── plugins/
      └── insertdata/
          ├── config.json          ← Plugin configuration
          ├── index.html           ← Plugin UI (the interface you'll see)
          └── resources/           ← Plugin icons
              ├── icon.svg
              ├── icon.png
              ├── icon@2x.png
              └── ... (all icon sizes)
```

### 2. API Endpoint (in `/src/app/api/userdata/`)
```
src/
  └── app/
      └── api/
          └── userdata/
              └── route.js         ← Returns the data (firstName, lastName, etc.)
```

### 3. Updated Configuration Files
- ✅ `src/app/real/page.js` - Added plugin configuration
- ✅ `src/app/api/real/route.js` - Added plugin to JWT token

---

## 🚀 How to Use It:

### Step 1: Restart Your Dev Server
```bash
# Stop the server (Ctrl+C) and restart:
npm run dev
```

### Step 2: Open the Document Editor
Navigate to: **http://localhost:3000/real** (or http://192.168.1.157:3000/real)

### Step 3: The Plugin Will Auto-Open!
You'll see a panel on the **right side** of the screen with:
- 📋 Insert Data Fields
- First Name: John
- Last Name: Doe
- Email: john.doe@example.com
- Phone: +1 (555) 123-4567
- Company: Acme Corporation
- Position: Software Engineer

### Step 4: Click to Insert
1. **Click anywhere in the document** to place your cursor
2. **Click on any field** in the plugin panel
3. **The value will be inserted** at your cursor position! ✨

---

## 🔧 Customization:

### To Change the Data:
Edit: `/src/app/api/userdata/route.js`

```javascript
const userData = {
  firstName: "Your Name",
  lastName: "Your Last Name",
  customField: "Any value you want",
  // Add as many fields as you need!
};
```

The plugin will **automatically** display ALL fields you add!

---

## 📍 Plugin Location in OnlyOffice Editor:

The plugin will appear in one of these locations:
1. **Auto-opens** on the right side when document loads (current setup)
2. **Plugins menu** - Look for a puzzle piece icon (🧩) in the toolbar
3. **Left sidebar** - May have a "Plugins" tab

---

## 🧪 Test Your API:
Run this command to verify your API is working:
```bash
curl http://localhost:3000/api/userdata
```

Expected response:
```json
{"firstName":"John","lastName":"Doe","email":"john.doe@example.com",...}
```

---

## ❓ Troubleshooting:

### Don't see the plugin panel?
1. **Check browser console** (F12) for errors
2. **Look for the Plugins icon** in the OnlyOffice toolbar
3. **Verify your dev server is running** on port 3000

### Plugin opens but no data?
1. Check browser console for API errors
2. Test the API endpoint: http://localhost:3000/api/userdata
3. Make sure CORS is not blocking the request

### Text not inserting?
1. **Click inside the document first** (you should see a blinking cursor)
2. Make sure the document is in **edit mode**
3. Check console for JavaScript errors

---

## 🎯 What You Can Do Next:

✅ Click on fields to insert them into your document
✅ Modify the API to return data from your database
✅ Add more fields - they'll automatically appear in the plugin!
✅ Customize the plugin UI by editing `public/plugins/insertdata/index.html`
✅ Add multiple users or dynamic data based on authentication

**Everything is ready to go! Just refresh your browser and start clicking!** 🎉

