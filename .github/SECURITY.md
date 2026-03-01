# Security Policy

## Overview

OPTMO is a frontend-only static website with no backend infrastructure. Security focuses on:

1. **Client-side data protection**
2. **No sensitive information in repositories**
3. **Safe configuration management**

## Reporting a Vulnerability

🚨 **DO NOT open a public issue for security vulnerabilities.**

Instead, please email the repository maintainer directly with:
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)

We will:
- Acknowledge receipt within 48 hours
- Work on a fix promptly
- Credit you in the fix (if desired)

## Security Best Practices

### What We Protect

✅ **Never committed to repository:**
- API keys and tokens
- Passwords (stored in `js/private-config.js`)
- Personal credentials
- Database connection strings
- Private configuration

✅ **Always ignored:**
- `.env` and `.env.*` files
- `js/private-config.js`
- `.private/` directory
- SSH keys and certificates

### Configuration Files

- `js/private-config.example.js` → Template (public)
- `js/private-config.js` → Local only (✓ ignored by `.gitignore`)

To setup:
```bash
cp js/private-config.example.js js/private-config.js
# Edit with your local settings
# Git will ignore this file automatically
```

## Known Limitations

### Client-Side Analytics Password

The analytics password in `js/private-config.js`:
- Is loaded into client JavaScript
- Can be viewed in browser developer tools
- Is NOT suitable for production authentication

**Recommendation:** For production systems, move analytics validation to backend/server.

### No Sensitive Data Storage

OPTMO does not:
- Store user credentials
- Handle payment processing
- Manage authentication
- Store personal information

All sensitive operations (payments, auth) link to external services (PayPal, GitHub, Zelle).

## Dependencies

OPTMO uses minimal dependencies:
- **Font Awesome 6.4.0** (CDN) - Icon library only
- No npm packages
- No external JavaScript frameworks
- Pure vanilla JavaScript

### Dependency Security

- Font Awesome is loaded from official CDN
- Supply chain attacks minimized through minimal dependencies
- Regular updates checked manually

## Browser Security

OPTMO relies on:
- Modern browser security features
- CORS for cross-origin requests
- localStorage for local preference storage

### CSP Recommendations (if using HTTPS CDN)

If deploying to GitHub Pages or custom domain with HTTPS:
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; 
  style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; 
  font-src cdnjs.cloudflare.com
```

## Data Privacy

### What We Collect

**On Main Site:**
- No automatic data collection
- Optional cookie consent for analytics
- Analytics only enabled with password

**On Donation Page:**
- Public email address displayed intentionally
- Copy-to-clipboard uses native browser API
- No data transmission beyond user's intention

### localStorage Usage

- `optmo-analytics-enabled` - Analytics consent flag
- `sidebarWidth` - User's sidebar width preference
- Both stored locally only, not synced to servers

## Regular Security Audits

We recommend:
- Reviewing code before deployment
- Checking for hardcoded secrets regularly
- Using `git log` to verify no secrets in history
- Testing in browsers' developer tools

## Compliance

OPTMO aligns with:
- OWASP Top 10 principles
- No GDPR user data collection
- No CCPA obligations (no personal data stored)
- Standard web security practices

## Security Tools

To audit this repository for secrets:

```bash
# Check for common patterns
git log -p | grep -i "password\|secret\|api.key\|token"

# Use dedicated tools
npm install -g git-secrets
git secrets --install
git secrets --scan
```

## Questions?

For security-related questions, contact the maintainer directly rather than opening public issues.

Thank you for helping keep OPTMO secure! 🛡️
