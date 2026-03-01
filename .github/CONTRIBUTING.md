# Contributing to OPTMO

Thank you for your interest in contributing to OPTMO! We welcome contributions of all kinds.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

Found a bug? Please open an issue with:
- Clear title describing the bug
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information

### Suggesting Features

Have an idea? Open an issue with:
- Clear, descriptive title
- Detailed explanation of the feature
- Use cases and benefits
- Examples or mockups (if applicable)

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Make your changes
4. Test locally with `python -m http.server 8000`
5. Commit with clear messages: `git commit -m 'Add: YourFeature'`
6. Push to your fork: `git push origin feature/YourFeature`
7. Open a pull request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots/demos (if UI changes)

## Development Guidelines

### Code Style

- **JavaScript**: Use vanilla JS, no frameworks
- **CSS**: Use CSS custom properties, maintain logical organization
- **HTML**: Use semantic HTML5
- Write clear, descriptive variable names
- Add comments for complex logic

### Performance

- Keep dependencies minimal
- Avoid unnecessary DOM manipulations
- Test on mobile devices
- Maintain fast load times

### Security

- ⚠️ **NEVER commit sensitive data** (passwords, API keys, etc.)
- Always use private-config.js for settings
- Check `.gitignore` before committing
- Review code for potential vulnerabilities

### Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design (mobile, tablet, desktop)
- Verify accessibility features work
- Test on actual devices if possible

## Project Structure

```
.
├── index.html          # Main application
├── donate.html         # Donation page
├── css/styles.css      # All styling
├── js/main.js          # Core functionality
└── js/private-config.example.js  # Settings template
```

## File Size Guidelines

- Keep CSS under 2100 lines
- Keep JavaScript under 600 lines
- Compress images appropriately

## Commit Message Format

```
[Type]: Brief description

Optional detailed explanation

Fixes #issue-number (if applicable)
```

Types: Add, Fix, Change, Remove, Refactor, Docs, Style, Test

## Questions?

Open an issue or discussion for questions. We're here to help!

---

Thank you for contributing to making OPTMO better! 🎉
