#!/bin/sh
# Writes /env.js and /robots.txt from the container env, so one image serves every environment.
# The nginx image runs it from /docker-entrypoint.d/ before nginx starts; nginx.conf serves both files from $OUT
# (under /tmp, the one path nginx-unprivileged already needs writable).
set -eu

OUT=/tmp/runtime-env

fail() {
  echo "runtime-env: $*" >&2
  exit 1
}

# An http(s) URL made only of URL characters: no quotes, spaces or newlines can reach env.js.
check_url() {
  case "$2" in
    http://?* | https://?*) ;;
    *) fail "$1 must be an http(s) URL" ;;
  esac
  case "$2" in
    *[![:alnum:].:/_~%?#@=+,\;\&-]*) fail "$1 contains characters that are not allowed in a URL" ;;
  esac
}

json_string() {
  printf '"%s"' "$(printf '%s' "$1" | sed 's/[\\"]/\\&/g')"
}

[ -n "${VITE_API_BASE_URL:-}" ] || fail "VITE_API_BASE_URL is required, e.g. https://api.example.go.id/api/v1"
check_url VITE_API_BASE_URL "$VITE_API_BASE_URL"
json="\"VITE_API_BASE_URL\":$(json_string "$VITE_API_BASE_URL")"

if [ -n "${VITE_SITE_URL:-}" ]; then
  check_url VITE_SITE_URL "$VITE_SITE_URL"
  json="$json,\"VITE_SITE_URL\":$(json_string "$VITE_SITE_URL")"
fi

mkdir -p "$OUT"
printf 'window.__ENV__ = {%s};\n' "$json" > "$OUT/env.js"
# Same content as the build-time robots.txt in vite.config.js.
printf 'User-agent: *\nAllow: /\nSitemap: %s/public/sitemap.xml\n' "$(printf '%s' "$VITE_API_BASE_URL" | sed 's:/*$::')" > "$OUT/robots.txt"
echo "runtime-env: wrote $OUT/env.js and $OUT/robots.txt"
