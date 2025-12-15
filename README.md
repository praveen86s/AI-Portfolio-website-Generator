# 🧠 AI-Generated Portfolio Website

![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=flat&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logo=langchain&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&logo=google&logoColor=white)

A powerful AI tool that transforms your **Resume (PDF/DOCX)** into a fully functional, professional **Portfolio Website** in seconds.

Powered by **Google Gemini** and **LangChain**, this application analyzes your professional profile and autonomously writes the HTML, CSS, and JavaScript code required to build your personal site.

## ✨ Features

-   **📄 Universal Parsing**: Supports both **PDF** and **Word (.docx)** documents.
-   **🧠 Intelligent Analysis**: Uses Google Gemini to extract skills, experience, projects, and design preferences.
-   **🎨 Auto-Coding**: Generates modern, responsive, and semantic code (HTML5, CSS3, JS).
-   **👁️ Live Preview**: Renders the generated website instantly within the app for review.
-   **📦 One-Click Deployment**: Downloads the complete source code as a ZIP file, ready to host.
-   **🛡️ Secure**: API keys are managed securely via environment variables.

## 🛠️ Tech Stack

-   **Frontend**: Streamlit
-   **AI Orchestration**: LangChain
-   **LLM**: Google Gemini 2.5 Flash
-   **Document Processing**: PyPDF2, python-docx
-   **Environment Management**: python-dotenv

## 🚀 Installation & Setup

### Install Dependencies

```bash
pip install -r requirements.txt
```

### How to Run

Execute the following command in your terminal:

```bash
streamlit run app.py
```

### 📝 Usage Guide

1. **Upload**: Drag and drop your resume file into the upload area.
2. **Generate**: Click the "✨ Generate Website" button.
3. **Wait**: The AI will analyze your data and write the code (approx. 10-20 seconds).
4. **Preview**: Switch to the "Live Preview" tab to interact with the site.
5. **Source Code**: Switch to the "Source Code" tab to copy specific snippets.
6. **Download**: Click the "📦 Download Complete Website" button to get the ZIP file.
```
