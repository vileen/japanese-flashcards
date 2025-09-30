# Deployment Guide 📱

This guide covers different ways to deploy your Japanese Flashcards PWA so you can access it on your iPhone.

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Steps:
1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Japanese Flashcards PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/japanese-flashcards.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Wait a few minutes for deployment

3. **Access your app**
   - Your app will be at: `https://YOUR-USERNAME.github.io/japanese-flashcards/`
   - Open this URL on your iPhone in Safari
   - Add to Home Screen!

### Update the manifest:
Before deploying, update the `start_url` in `manifest.json`:
```json
"start_url": "/japanese-flashcards/",
```

---

## Option 2: Netlify (Free, Very Easy)

### Steps:
1. **Sign up at** [netlify.com](https://www.netlify.com)
2. **Drag and drop** your project folder into Netlify
3. **Get your URL** - something like `yourapp.netlify.app`
4. **Open on iPhone** and add to Home Screen

### Continuous Deployment:
- Connect your GitHub repository
- Auto-deploys on every push!

---

## Option 3: Vercel (Free, Fast)

### Steps:
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd /Users/dominiksoczewka/LearningProjects/japanese-flashcards
   vercel
   ```

3. **Follow prompts** and get your URL
4. **Access on iPhone** via the provided URL

---

## Option 4: Local Network Testing

Perfect for testing before deployment:

### Steps:
1. **Find your local IP**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Should show something like: inet 192.168.1.XXX
   ```

2. **Start server**
   ```bash
   python3 -m http.server 8000
   ```

3. **On iPhone** (same WiFi network):
   - Open Safari
   - Go to `http://192.168.1.XXX:8000`
   - Add to Home Screen

**Note**: This only works while your computer is on and server is running.

---

## Option 5: Cloudflare Pages (Free)

### Steps:
1. **Sign up at** [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Connect GitHub** repository
3. **Deploy** - no build command needed (static site)
4. **Get custom domain** (optional)

---

## Installing on iPhone (iOS)

Once deployed to any of the above:

### Installation Steps:
1. **Open in Safari** (must be Safari, not Chrome)
   - Go to your deployment URL
   
2. **Add to Home Screen**
   - Tap Share button (square with arrow ↑)
   - Scroll down, tap "Add to Home Screen"
   - Edit name if desired (e.g., "日本語")
   - Tap "Add"

3. **Launch the app**
   - Find icon on your home screen
   - Tap to launch
   - Works offline after first load!

### iOS PWA Features:
✅ Full-screen app (no browser UI)  
✅ Offline functionality  
✅ Local storage persists  
✅ Fast loading with service worker  
✅ Feels like a native app  

---

## Custom Domain (Optional)

All deployment options above support custom domains:

### Example with GitHub Pages:
1. Buy domain (e.g., `learn-japanese.com`)
2. Add CNAME file to repository root:
   ```
   learn-japanese.com
   ```
3. Configure DNS at your domain registrar:
   - Type: CNAME
   - Name: www (or @)
   - Value: YOUR-USERNAME.github.io
4. Enable in GitHub Pages settings

---

## Testing Checklist

Before sharing with others, test:

- [ ] App loads on iPhone Safari
- [ ] Can add to home screen
- [ ] Launches in standalone mode (no browser UI)
- [ ] Character selection works
- [ ] Both practice modes work
- [ ] Progress saves and persists
- [ ] Works offline (turn off WiFi and test)
- [ ] Icons display correctly
- [ ] Touch interactions feel responsive

---

## Updating Your Deployed App

### For Git-based deployments (GitHub Pages, Netlify, Vercel, Cloudflare):
```bash
# Make your changes, then:
git add .
git commit -m "Update app"
git push
```

Auto-deploys! Users will get updates on next visit.

### Service Worker Updates:
When you update the app:
1. Change version in `sw.js`:
   ```javascript
   const CACHE_NAME = 'japanese-flashcards-v2'; // increment version
   ```
2. Deploy
3. Users will auto-update on next load

---

## Sharing Your App

Once deployed, share with:
- **QR Code**: Use a QR code generator with your URL
- **Direct link**: Share the URL via text/email
- **Social media**: Post the link

**Pro tip**: Create a short link using bit.ly or similar for easier sharing!

---

## Cost Comparison

| Platform | Cost | Ease | Custom Domain | Auto-Deploy |
|----------|------|------|---------------|-------------|
| GitHub Pages | Free | ⭐⭐⭐⭐ | Yes (free) | Yes |
| Netlify | Free | ⭐⭐⭐⭐⭐ | Yes (free) | Yes |
| Vercel | Free | ⭐⭐⭐⭐ | Yes (free) | Yes |
| Cloudflare | Free | ⭐⭐⭐⭐ | Yes (free) | Yes |

All options are completely free for this type of app!

---

## Need Help?

Common issues and solutions:

**App not updating?**
- Hard refresh: Clear Safari cache
- Update service worker version
- Uninstall and reinstall PWA

**Icons not showing on iPhone?**
- Use PNG icons instead of SVG
- Run `generate-icons.html` in browser
- Move downloaded PNGs to `/icons/` folder

**Offline not working?**
- Check service worker is registered (browser console)
- Make sure HTTPS is enabled (required for PWA)
- Local `http://` won't have full PWA features

**Can't add to home screen?**
- Must use Safari on iOS (not Chrome)
- Must be HTTPS or localhost
- Check manifest.json is valid

---

Happy deploying! 🚀🎌
