# OPTMO - AI-Powered Automation Platform

[![Sponsor](https://img.shields.io/badge/Sponsor-OPTMO-ff69b4?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/fredykraft)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

OPTMO is a responsive, feature-rich single-page website for an AI-powered automation platform. It showcases automation workflows for content creation and event organization with an intuitive UI and interactive features.

## ✨ Features

- **Smart Navigation**: Collapsible sidebar with adjustable width (200-450px) and smooth animations
- **Advanced Search**: Real-time full-page search with highlighting across all content
- **Project Management**: Filterable project cards with category-based organization
- **Membership Plans**: Three-tier pricing (Free, Pro, Enterprise)
- **Cookie Consent**: Privacy-focused consent management with optional analytics
- **Responsive Design**: Mobile-first approach with proper touch interactions
- **Performance**: No build step required, pure vanilla JavaScript (zero dependencies)
- **Accessibility**: Semantic HTML, keyboard navigation, proper ARIA labels

## 🚀 Quick Start

### Prerequisites
- Git (for cloning)
- Python 3.x (for local development server)
- Modern web browser

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/fredykraft/Optmo.git
   cd Optmo
   ```

2. Start a local development server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
.
├── index.html                 # Main single-page application
├── donate.html                # Donation/support page
├── README.md                  # This file
├── LICENSE                    # MIT License
├── .gitignore                 # Git ignore rules
├── css/
│   └── styles.css             # Complete styling (2000+ lines)
├── js/
│   ├── main.js                # Core functionality (580+ lines)
│   ├── private-config.js      # ⚠️ Local configuration (NOT committed)
│   └── private-config.example.js  # Configuration template
└── assets/                    # Images and media
```

## 🔒 Security & Privacy

### No Sensitive Data in Version Control

This project follows security best practices:

- **Private Configuration** (`js/private-config.js`) is **never committed** to GitHub
  - Listed in `.gitignore` for protection
  - Contains only local analytics password
  - Template provided in `private-config.example.js`

- **No hardcoded secrets** in public code
  - API keys, tokens, and passwords are excluded
  - Email addresses on donation page are intentionally public for support

### Setup Private Configuration

1. Copy the example file:
   ```bash
   cp js/private-config.example.js js/private-config.js
   ```

2. Edit `js/private-config.js` and set your own password:
   ```javascript
   window.OPTMO_ANALYTICS_PASSWORD = 'your-secure-password-here';
   ```

3. Never commit this file - it's protected by `.gitignore`

## 🛠 Tech Stack

- **HTML5** - Semantic structure (467 lines)
- **CSS3** - Modern styling with custom properties, Flexbox, Grid (2000+ lines)
- **Vanilla JavaScript** - Zero dependencies, no frameworks (580+ lines)
- **Font Awesome 6.4.0** - Icon library (CDN)

## 📖 Key Interactions

### Navigation
- **Sidebar Toggle**: Open/close main navigation menu
- **Adjustable Sidebar**: Drag the right edge to resize (200-450px)
- **Smooth Scrolling**: Anchor links with header offset compensation
- **Active States**: Navigation highlights current section

### Search
- **Real-time Search**: Type to find content across entire page
- **Smart Highlighting**: Gold highlights with pulse animation
- **Results Panel**: Shows count and affected sections
- **Keyboard Shortcut**: `Cmd+K` / `Ctrl+K` to focus search

### Content
- **Project Filtering**: Filter cards by category (Content, Events, Tools)
- **Cookie Banner**: Privacy-first consent management
- **Analytics Protection**: Optional password-gated analytics tracking

### UX Features
- **Back-to-Top Button**: Appears after scrolling 300px
- **Scroll Progress Bar**: Visual progress indicator at top of page
- **Toast Notifications**: Non-intrusive feedback messages
- **Copy-to-Clipboard**: One-click email copying on donation page

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation, multi-column layouts
- **Tablet**: Optimized spacing, touch-friendly interactions
- **Mobile**: Overlay sidebar, single-column content, tap targets

## 💰 Support OPTMO

If you'd like to support OPTMO development:

- **GitHub Sponsors**: [Sponsor fredykraft](https://github.com/sponsors/fredykraft)
- **PayPal**: saygoodnight88@gmail.com
- **Zelle**: saygoodnight88@gmail.com
- **Direct Support**: Visit [Donation Page](donate.html)

## 📝 License

This project is licensed under the [MIT License](LICENSE) - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Analytics
- Password validation is client-side (for demonstration)
- For production, implement server-side verification
- Analytics hooks are placeholders - integrate with your service

### Cookie Management
- Preferences stored in `localStorage`
- `optmo-analytics-enabled` key for tracking consent
- No third-party trackers by default

### Browser Compatibility
- Modern features: CSS custom properties, Flexbox, Grid
- Supports: Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## 👨‍💻 Author

**fredykraft** - Original creator and maintainer

## 🙏 Acknowledgments

- Font Awesome for icon library
- Community feedback for feature improvements

---

**Last updated**: February 28, 2026  
**Version**: 1.0.0