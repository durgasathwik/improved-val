# Valentine's Proposal - Improved Version

## How to use
1. Open `index.html` in your browser to test it.
2. To send it to your girlfriend, you need to host it.

## Customization
- **Change Name**: Open `index.html` and change "Will you be my Valentine?" to "Will you be my Valentine, [Name]?"
- **Change Images**: Open `index.html` (initial image) and `script.js` (success image) and replace the `src` URLs with any GIF you like.

## Deploy to GitHub Pages (one-time setup)

From this folder, after logging in to GitHub:

```bash
# 1. Log in to GitHub (opens browser)
gh auth login

# 2. Create repo, add remote, and push
gh repo create improved-val --public --source=. --remote=origin --push

# 3. Enable GitHub Pages (serve from main branch, root)
gh api repos/$(gh api user -q .login)/improved-val/pages -X PUT -f source[branch]=main -f source[path]=/
```

Your site will be live at: **https://YOUR_USERNAME.github.io/improved-val/**

## Other hosting (free)
- **Netlify/Vercel**: Drag and drop this folder onto their dashboard.
