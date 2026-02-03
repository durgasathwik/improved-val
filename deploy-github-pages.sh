#!/usr/bin/env bash
# Deploy improved-val to a new GitHub repo and enable GitHub Pages.
# Run from this directory. Requires: gh auth login (once)

set -e
OWNER=$(gh api user -q .login)
REPO=improved-val

echo "Creating repo $OWNER/$REPO and pushing..."
gh repo create "$REPO" --public --source=. --remote=origin --push

echo "Enabling GitHub Pages (main branch, root)..."
gh api "repos/$OWNER/$REPO/pages" -X PUT -f source[branch]=main -f source[path]=/

echo ""
echo "Done! Your site will be live in 1–2 minutes at:"
echo "  https://$OWNER.github.io/$REPO/"
echo ""
