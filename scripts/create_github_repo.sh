#!/usr/bin/env bash
# Shell helper to create a GitHub repo (requires gh CLI) and push the current folder.
# Usage:
#   chmod +x scripts/create_github_repo.sh
#   ./scripts/create_github_repo.sh repo-name public

NAME=${1:-$(basename "$PWD")}
VISIBILITY=${2:-public}

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not found. Install it from https://cli.github.com/ and run 'gh auth login'"
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git not found. Install git first."
  exit 1
fi

echo "Creating GitHub repo '$NAME' ($VISIBILITY) and pushing current folder..."

if [ ! -d .git ]; then
  git init
  git add --all
  git commit -m "chore: initial commit"
fi

gh repo create "$NAME" --$VISIBILITY --source . --remote origin --push

if [ $? -ne 0 ]; then
  echo "gh repo create failed. See gh output above."
  exit 1
fi

echo "Repository created and pushed. Remote 'origin' set."
