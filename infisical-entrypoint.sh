#!/bin/sh
# Container entrypoint. With the Infisical bootstrap vars set, it logs in as the machine identity (Universal Auth)
# and runs CMD under `infisical run`, which adds the project's secrets to CMD's env; Infisical values win over
# env vars of the same name. Without them it just runs CMD, so docker compose and `docker run -e ...` keep working.
#   INFISICAL_DOMAIN                        instance URL, e.g. https://infisical.example.go.id (the CLI adds /api)
#   INFISICAL_PROJECT_ID                    project ID
#   INFISICAL_ENVIRONMENT                   environment slug, e.g. staging or prod
#   INFISICAL_SECRET_PATH                   optional folder, default /
#   INFISICAL_UNIVERSAL_AUTH_CLIENT_ID      machine identity client ID
#   INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET  machine identity client secret
# All but INFISICAL_ENVIRONMENT and INFISICAL_SECRET_PATH are the CLI's own env var names.
set -eu

fail() {
  echo "infisical-entrypoint: $*" >&2
  exit 1
}

any=
missing=
for name in INFISICAL_DOMAIN INFISICAL_PROJECT_ID INFISICAL_ENVIRONMENT INFISICAL_UNIVERSAL_AUTH_CLIENT_ID INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET; do
  if eval "[ -n \"\${$name:-}\" ]"; then any=1; else missing="$missing $name"; fi
done
[ -n "$any" ] || exec "$@"
[ -z "$missing" ] || fail "missing$missing (set all Infisical bootstrap vars, or none to start without Infisical)"

# The CLI reads the client ID and secret from the env, so they never appear in the process list.
token=$(infisical login --method=universal-auth --silent --plain) ||
  fail "login to $INFISICAL_DOMAIN failed (error above); check the client ID/secret and the identity's Universal Auth settings"
[ -n "$token" ] || fail "login to $INFISICAL_DOMAIN returned no access token"
unset INFISICAL_UNIVERSAL_AUTH_CLIENT_ID INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET
export INFISICAL_TOKEN="$token"

# env -u: CMD gets the secrets, not the token that could fetch them again.
exec infisical run --silent --projectId "$INFISICAL_PROJECT_ID" --env "$INFISICAL_ENVIRONMENT" \
  --path "${INFISICAL_SECRET_PATH:-/}" -- env -u INFISICAL_TOKEN "$@"
