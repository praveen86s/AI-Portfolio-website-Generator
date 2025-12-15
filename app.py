import streamlit as st
import os
import zipfile
import io
import re
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from docx import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

# ==========================================
# 1. CONFIG & STYLING
# ==========================================
load_dotenv()

# Check for API Key
api_key = os.getenv("gemini")
if not api_key:
    st.error("❌ API Key missing! Please add 'gemini=YOUR_KEY' to your .env file.")
    st.stop()

os.environ["GOOGLE_API_KEY"] = api_key

st.set_page_config(
    page_title="AI Portfolio Website Generator",
    page_icon="🎨",
    layout="wide"
)

# Custom CSS for better UI
st.markdown("""
<style>
    .main-header {
        text-align: center;
        background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
        padding: 20px;
        border-radius: 10px;
        color: white;
        margin-bottom: 20px;
    }
    .main-header h1 {
        color: white;
        margin: 0;
    }
    .stButton>button {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        height: 50px;
        font-size: 18px;
    }
    .success-box {
        padding: 15px;
        background-color: #d4edda;
        color: #155724;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>
""", unsafe_allow_html=True)

# ==========================================
# 2. HELPER FUNCTIONS
# ==========================================

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    doc = Document(file)
    return "\n".join([para.text for para in doc.paragraphs])

def clean_code_snippet(raw_text, tag):
    """Robustly extracts code between custom tags using Regex"""
    pattern = f"--{tag}--\n(.*?)\n--{tag}--"
    match = re.search(pattern, raw_text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

# ==========================================
# 3. LLM LOGIC
# ==========================================

def generate_website_content(resume_text):
    """Two-step chain: Analyze Resume -> Write Code"""
    
    # Initialize LLM
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)

    # --- Step 1: Structure the Data ---
    prompt_analysis = f"""
    You are an expert Resume Analyst. 
    Extract the following details from the resume text below to build a portfolio website context:
    - Full Name & Title
    - Professional Summary
    - Key Skills (Technical & Soft)
    - Work Experience (Role, Company, Highlights)
    - Projects (Name, Tech Stack, Description)
    - Education
    - Contact Info
    - Suggest a UI Design Theme (e.g., "Minimalist Dark Mode", "Clean Corporate Blue")

    Resume Text:
    {resume_text}
    """
    
    with st.spinner("🤖 AI is analyzing your resume..."):
        analysis_response = llm.invoke(prompt_analysis)
        analysis_text = analysis_response.content

    # --- Step 2: Write the Code ---
    system_prompt_code = """
    You are a Senior Frontend Developer. 
    Create a modern, responsive single-page portfolio website based on the analysis provided.
    
    **Technical Requirements:**
    1. HTML5 (Semantic), CSS3 (Modern Flexbox/Grid), Vanilla JS.
    2. Use FontAwesome via CDN for icons.
    3. Ensure the design is mobile-responsive.
    4. Make it look professional and polished.
    
    **Output Format:**
    You must output the code strictly in these blocks:
    
    --html--
    <!DOCTYPE html>
    <html lang="en">
    ... code ...
    </html>
    --html--

    --css--
    ... code ...
    --css--

    --js--
    ... code ...
    --js--
    """
    
    with st.spinner("🎨 AI is creating code for your website..."):
        code_response = llm.invoke([
            SystemMessage(content=system_prompt_code),
            HumanMessage(content=f"Build the website based on this analysis:\n{analysis_text}")
        ])
    
    raw_content = code_response.content
    
    # Extract using Regex
    html = clean_code_snippet(raw_content, "html")
    css = clean_code_snippet(raw_content, "css")
    js = clean_code_snippet(raw_content, "js")
    
    return html, css, js

# ==========================================
# 4. MAIN UI
# ==========================================

# Header
st.markdown('<div class="main-header"><h1>🧠 AI Portfolio Architect</h1><p>From Resume to Website in seconds</p></div>', unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/2083/2083256.png", width=100)
    st.header("Instructions")
    st.write("1. Upload your Resume (PDF/DOCX)")
    st.write("2. Click 'Generate Website'")
    st.write("3. Preview & Download")
    st.markdown("---")
    st.caption("Powered by Google Gemini & LangChain")

# Main Input
col1, col2 = st.columns([1, 2])

with col1:
    st.subheader("📂 Upload File")
    uploaded_file = st.file_uploader("Upload Resume", type=["pdf", "docx"])

# Session State to hold data
if "generated" not in st.session_state:
    st.session_state.generated = False
    st.session_state.html_code = ""
    st.session_state.css_code = ""
    st.session_state.js_code = ""

# Logic
if uploaded_file:
    # Read file immediately
    if uploaded_file.type == "application/pdf":
        resume_text = extract_text_from_pdf(uploaded_file)
    else:
        resume_text = extract_text_from_docx(uploaded_file)
    
    with col1:
        st.success(f"✅ Loaded: {uploaded_file.name}")
        if st.button("✨ Generate Website"):
            try:
                html_c, css_c, js_c = generate_website_content(resume_text)
                
                # Check if generation worked
                if not html_c:
                    st.error("AI Generation failed to produce valid HTML code. Please try again.")
                else:
                    st.session_state.html_code = html_c
                    st.session_state.css_code = css_c
                    st.session_state.js_code = js_c
                    st.session_state.generated = True
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

# Display Results (Right Column)
with col2:
    if st.session_state.generated:
        st.subheader("🖥️ Result")
        
        # Tabs for View Options
        tab1, tab2, tab3 = st.tabs(["🌐 Live Preview", "📝 Source Code", "📥 Download"])
        
        with tab1:
            # Combine for preview
            full_html = f"""
            <style>{st.session_state.css_code}</style>
            {st.session_state.html_code}
            <script>{st.session_state.js_code}</script>
            """
            st.components.v1.html(full_html, height=600, scrolling=True)
        
        with tab2:
            st.code(st.session_state.html_code, language="html")
            st.code(st.session_state.css_code, language="css")
            st.code(st.session_state.js_code, language="javascript")
            
        with tab3:
            st.success("Your website is ready!")
            
            # Create ZIP in memory
            zip_buffer = io.BytesIO()
            with zipfile.ZipFile(zip_buffer, "w") as zf:
                # Add link tags for the downloaded version
                final_html = st.session_state.html_code
                if "</head>" in final_html:
                    final_html = final_html.replace("</head>", '<link rel="stylesheet" href="style.css"></head>')
                if "</body>" in final_html:
                    final_html = final_html.replace("</body>", '<script src="script.js"></script></body>')
                
                zf.writestr("index.html", final_html)
                zf.writestr("style.css", st.session_state.css_code)
                zf.writestr("script.js", st.session_state.js_code)
            
            st.download_button(
                label="📦 Download Complete Website (.zip)",
                data=zip_buffer.getvalue(),
                file_name="my_portfolio.zip",
                mime="application/zip",
                key="download-btn"
            )
    else:
        if uploaded_file:
            st.info("👈 Click 'Generate Website' to start the magic.")
        else:
            st.info("👈 Please upload a resume to begin.")