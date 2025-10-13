# DeepWork AI Car Ad Studio - Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key

### 3. Configure Environment Variables

Create a file named `.env.local` in the root directory:

```bash
# .env.local
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your real Gemini API key.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 How to Use

1. **Upload Car Image** - Required. Choose any car photo from your device.
2. **Upload Logo** - Optional. Add your business logo to the ad.
3. **Select Scenery** - Choose from 5 professional backgrounds:
   - 🏢 Luxury Showroom
   - 🌅 Sunset Beach
   - ⛰️ Mountain Road
   - 🌃 Urban Skyline
   - 🏜️ Desert Highway
4. **Review Your Selections** - Check the preview box.
5. **Generate** - Click "🚀 Generate AI Car Ad"
6. **Download** - Save your professional car advertisement!

## 📋 Features

- ✅ AI-powered image transformation with Gemini 2.5 Flash Image
- ✅ 16:9 aspect ratio output (1344x768)
- ✅ 5 professional scenery options
- ✅ Before/After comparison view
- ✅ Download generated images
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Real-time preview

## 💰 Pricing

- **Gemini API**: ~$0.04 per image generated
- Free tier available with usage limits

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash Image
- **API**: Next.js API Routes

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 🚨 Troubleshooting

### "API key not configured"
- Make sure you created `.env.local` file
- Verify the API key is correct
- Restart the development server after adding the key

### "Failed to generate image"
- Check your API key is valid
- Ensure you have API quota remaining
- Try with a smaller image file

### Image upload issues
- Maximum recommended file size: 5MB
- Supported formats: JPG, PNG, WebP
- Try compressing large images

## 📖 API Documentation

[Gemini Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)

## 🎯 Next Steps

- [ ] Add user authentication
- [ ] Create personal dashboards
- [ ] Save generation history
- [ ] Multiple image outputs per generation
- [ ] Custom prompt editing
- [ ] Logo overlay positioning

---

**Need help?** Check the [Gemini API documentation](https://ai.google.dev/gemini-api/docs) or open an issue.

