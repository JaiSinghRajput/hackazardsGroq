const config = {
    // The base URL of the API
    appWriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appWriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    groqApiKey: String(process.env.NEXT_PUBLIC_GROQ_API_KEY),
}

export default config