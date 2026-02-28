# Alpha Picks - Investment Website Template

A modern, responsive website template inspired by Seeking Alpha's Alpha Picks page. This template features professional investment analysis, market picks, and portfolio tracking capabilities.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Navigation**: Sticky navigation bar with smooth scrolling
- **Featured Analysis**: Highlight important market analysis and insights
- **Alpha Picks Grid**: Display investment picks with filtering by sentiment (Bullish, Bearish, Neutral)
- **Market Analysis**: Key market insights and sector performance updates
- **Portfolio Tracking**: Table with holdings and performance metrics
- **Professional Styling**: Clean, modern design using CSS Grid and Flexbox
- **Interactive Features**: Smooth animations, hover effects, and mobile menu toggle

## Project Structure

```
Company Website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # Interactive functionality
├── assets/                 # Images and media files
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. Clone or download this repository
2. Open the project folder in your preferred code editor
3. No build process or dependencies needed!

### Running Locally

#### Option 1: Simple Browser Open
Simply double-click `index.html` to open it in your default browser.

#### Option 2: Using Python (Recommended)
```bash
# Python 3.x
python -m http.server 8000

# Then visit http://localhost:8000
```

#### Option 3: Using Node.js
```bash
# If you have http-server installed globally
http-server

# Or install it first
npm install -g http-server
http-server
```

## Customization

### Updating Content
Edit `index.html` to:
- Change company name and branding
- Update featured articles
- Add/remove investment picks
- Modify portfolio holdings
- Update footer information

### Styling
The `css/styles.css` file contains all styling. Key sections:
- **Color Variables**: Defined in `:root` for easy customization
- **Responsive Breakpoints**: Tablet (768px) and mobile (480px)
- **Components**: Navbar, hero, picks grid, portfolio table, footer

### Adding Interactivity
The `js/main.js` file includes:
- Mobile menu toggle
- Active nav link highlighting
- Pick filtering (Bullish/Bearish/Neutral)
- Smooth scrolling
- Scroll animations for cards

## Customization Guide

### Color Scheme
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #1e40af;
    --secondary-color: #dc2626;
    --bullish: #10b981;
    --bearish: #ef4444;
    /* ... more colors ... */
}
```

### Font Changes
Modify the `font-family` property in the `body` CSS rule:
```css
body {
    font-family: 'Your Font Here', sans-serif;
}
```

### Logo Text
Update in `index.html`:
```html
<h1 class="logo">Your Company Name</h1>
```

### Featured Image
Replace the placeholder image URL in the featured section:
```html
<img src="your-image-url-here.jpg" alt="Featured Article">
```

## Features Explained

### Pick Cards
Each pick card displays:
- Stock symbol
- Sentiment rating (Bullish/Bearish/Neutral)
- Company name
- Current price
- Price change percentage
- Brief investment thesis
- Analyst name and date

### Filter System
Click the filter buttons to show:
- **All**: Display all picks
- **Bullish**: Positive outlook picks
- **Bearish**: Negative outlook picks
- **Neutral**: Neutral outlook picks

### Responsive Behavior
- Desktop (>768px): Multi-column layouts
- Tablet (768px): Adjusted spacing and columns
- Mobile (<480px): Single column, simplified navigation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

- Optimize images in the assets folder
- Use CSS for animations instead of JavaScript when possible
- Consider lazy-loading images for large portfolios
- Minify CSS and JavaScript for production

## Future Enhancements

- Add backend API integration for real stock data
- Implement user authentication and portfolios
- Add dark mode toggle
- Create admin panel for content management
- Add real-time price updates
- Implement email newsletter signup
- Add social media integration

## License

This template is provided as-is for personal and commercial use.

## Support

For questions or issues, please refer to the documentation in the copilot-instructions.md file or adjust the code as needed for your specific requirements.

## Credits

Inspired by Seeking Alpha's Alpha Picks page design and layout patterns.

---

**Last Updated**: February 28, 2026
