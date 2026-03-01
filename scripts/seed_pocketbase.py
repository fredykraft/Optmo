#!/usr/bin/env python3
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE_URL = os.getenv("POCKETBASE_URL", "http://127.0.0.1:8090").rstrip("/")
EMAIL = os.getenv("SEED_EMAIL", "demo@optmo.app")
PASSWORD = os.getenv("SEED_PASSWORD", "Demo12345!")
NAME = os.getenv("SEED_NAME", "Demo User")


def api_request(method, path, payload=None, token=None):
    url = f"{BASE_URL}{path}"
    data = None
    headers = {"Content-Type": "application/json"}

    if token:
        headers["Authorization"] = f"Bearer {token}"

    if payload is not None:
        data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            body = response.read().decode("utf-8")
            if not body:
                return {}
            return json.loads(body)
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8") if error.fp else ""
        details = {}
        if body:
            try:
                details = json.loads(body)
            except json.JSONDecodeError:
                details = {"raw": body}
        raise RuntimeError(f"HTTP {error.code}: {json.dumps(details)}") from error


def ensure_user():
    try:
        api_request(
            "POST",
            "/api/collections/users/records",
            {
                "email": EMAIL,
                "password": PASSWORD,
                "passwordConfirm": PASSWORD,
                "name": NAME,
            },
        )
        print(f"Created demo user: {EMAIL}")
    except RuntimeError as err:
        message = str(err)
        if "validation_not_unique" in message or "already exists" in message:
            print(f"Demo user already exists: {EMAIL}")
        else:
            raise


def auth_user():
    auth = api_request(
        "POST",
        "/api/collections/users/auth-with-password",
        {"identity": EMAIL, "password": PASSWORD},
    )
    token = auth.get("token")
    record = auth.get("record") or {}
    user_id = record.get("id")

    if not token or not user_id:
        raise RuntimeError("Unable to authenticate seeded user.")

    print(f"Authenticated demo user id: {user_id}")
    return token, user_id


def list_records(collection, token, filter_expr=None):
    query = ""
    if filter_expr:
        query = "?" + urllib.parse.urlencode({"filter": filter_expr, "perPage": 200})
    else:
        query = "?" + urllib.parse.urlencode({"perPage": 200})

    result = api_request("GET", f"/api/collections/{collection}/records{query}", token=token)
    return result.get("items", [])


def ensure_profile(token, user_id):
    existing = list_records("user_profiles", token, f'user = "{user_id}"')
    payload = {
        "user": user_id,
        "display_name": NAME,
        "full_name": "Demo Account",
        "company": "OPTMO Labs",
    }

    if existing:
        profile_id = existing[0]["id"]
        api_request("PATCH", f"/api/collections/user_profiles/records/{profile_id}", payload, token=token)
        print("Updated user_profiles record")
    else:
        api_request("POST", "/api/collections/user_profiles/records", payload, token=token)
        print("Created user_profiles record")


def ensure_projects(token, user_id):
    existing = list_records("projects", token, f'user = "{user_id}"')
    if existing:
        print(f"Projects already exist: {len(existing)}")
        return

    seed_projects = [
        {"user": user_id, "name": "Welcome Automation", "category": "onboarding", "description": "Starter workflow for new OPTMO users."},
        {"user": user_id, "name": "Content Pipeline", "category": "content", "description": "Automated content generation and publishing flow."},
    ]

    for project in seed_projects:
        api_request("POST", "/api/collections/projects/records", project, token=token)

    print(f"Created {len(seed_projects)} projects")


def ensure_events(token, user_id):
    existing_seed_events = list_records(
        "user_events",
        token,
        f'user = "{user_id}" && source = "seed"',
    )
    if existing_seed_events:
        print(f"Seed events already exist: {len(existing_seed_events)}")
        return

    seed_events = [
        {"user": user_id, "event_type": "user_signup", "event_data": {"channel": "seed"}, "source": "seed"},
        {"user": user_id, "event_type": "user_login", "event_data": {"session": "seed-init"}, "source": "seed"},
        {"user": user_id, "event_type": "project_created", "event_data": {"project": "Welcome Automation"}, "source": "seed"},
    ]

    for event in seed_events:
        api_request("POST", "/api/collections/user_events/records", event, token=token)

    print(f"Created {len(seed_events)} user events")


def main():
    try:
        health = api_request("GET", "/api/health")
        if health.get("code") != 200:
            raise RuntimeError("PocketBase health check failed")

        ensure_user()
        token, user_id = auth_user()
        ensure_profile(token, user_id)
        ensure_projects(token, user_id)
        ensure_events(token, user_id)

        print("\nSeed complete.")
        print(f"Login with: {EMAIL}")
        print(f"Password: {PASSWORD}")
        return 0
    except Exception as error:
        print(f"Seed failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
