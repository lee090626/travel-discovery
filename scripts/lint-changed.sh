#!/bin/sh
# Lint only files changed from main (committed, uncommitted, or untracked).
# Existing code predates Biome; new or edited files must pass.
files=$( { git diff --name-only --diff-filter=d main; git ls-files --others --exclude-standard; } | sort -u)
[ -z "$files" ] && exit 0
exec npx biome lint --no-errors-on-unmatched --files-ignore-unknown=true $files
