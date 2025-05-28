# Digital Humanities Academic Portfolio Website

A responsive portfolio website template designed specifically for digital humanities academics. Features a **wabi-sabi aesthetic** with warm, earthy colors including ivory, rusty red, and terracotta tones that create an organic, imperfect beauty perfect for humanities scholarship.

## Design Philosophy

This portfolio embraces **wabi-sabi** - the Japanese aesthetic philosophy that finds beauty in imperfection and impermanence. The design features:

- **Organic Color Palette**: Warm ivory, rusty red, and terracotta creating a natural, scholarly atmosphere
- **Imperfect Geometry**: Slightly irregular border radii and organic spacing
- **Natural Textures**: Subtle background patterns that evoke handmade paper
- **Gentle Animations**: Soft floating effects that suggest natural movement
- **Humanistic Typography**: Crimson Text serif and Source Sans Pro for warmth and readability

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Wabi-Sabi Aesthetic**: Warm, organic color palette with natural, imperfect design elements
- **Accessibility**: WCAG compliant with keyboard navigation, screen reader support, and focus indicators
- **Modern CSS**: CSS Grid, Flexbox, custom properties (CSS variables), and organic animations
- **Interactive Navigation**: Mobile hamburger menu with smooth, natural transitions
- **Search Functionality**: Built-in search for CV and research pages
- **Print Optimization**: Clean print styles for academic documents
- **Google Fonts Integration**: Beautiful typography with Crimson Text and Source Sans Pro

## Pages Included

1. **Home** (`index.html`) - Landing page with overview and navigation to key sections
2. **About** (`about.html`) - Detailed academic background and research interests
3. **Research** (`research.html`) - Publications, grants, current projects, and work in progress
4. **Teaching** (`teaching.html`) - Course descriptions, teaching philosophy, and student mentoring
5. **Digital Projects** (`digital-projects.html`) - Showcase of digital humanities projects and tools
6. **CV** (`cv.html`) - Comprehensive curriculum vitae with downloadable PDF option

## File Structure

```
portfolio_demo/
├── index.html              # Home page
├── about.html              # About page
├── research.html           # Research page
├── teaching.html           # Teaching page
├── digital-projects.html   # Digital projects page
├── cv.html                 # CV page
├── css/
│   ├── variables.css       # CSS custom properties and design tokens
│   ├── main.css           # Main styles and component definitions
│   └── responsive.css     # Responsive design and media queries
├── js/
│   ├── navigation.js      # Navigation functionality and scroll effects
│   └── main.js            # Additional interactive features
├── License.md             # MIT License
└── README.md              # This file
```

## Color Palette

The wabi-sabi color palette uses warm, earthy tones that evoke natural materials:

- **Primary (Rusty Red)**: `#a0523d` - Deep, warm red like aged terracotta
- **Secondary (Terracotta)**: `#c67c4e` - Warm orange-brown like clay pottery
- **Accent (Warm Sand)**: `#d4a574` - Light brown like sun-warmed sand
- **Background (Ivory)**: `#faf7f0` - Soft, warm white like aged paper
- **Text Primary**: `#3a2f2a` - Dark warm brown for excellent readability
- **Light Terracotta**: `#e6c2a6` - For subtle accents and hover states

## Typography

- **Primary Font**: Crimson Text - A humanistic serif perfect for academic content
- **Secondary Font**: Source Sans Pro - Clean, readable sans-serif for UI elements
- **Weights**: 300 (light), 400 (regular), 600 (semibold)
- **Features**: Improved letter spacing, organic line heights, and subtle text shadows
- **Light Blue**: `#dbeafe` (Very light blue)
- **Pale Blue**: `#f0f9ff` (Pale blue background)
- **Text**: Blue-gray tones for optimal readability

## Customization

### Personal Information
Replace placeholder text throughout the files:
- `[Your Name]` - Your full name
- `[University Name]` - Your institution
- `[Department]` - Your department
- `your.email@university.edu` - Your email address
- Update all biographical and professional information

### Content Areas
Each page is structured with clear content sections that can be easily modified:
- Research projects and publications
- Course descriptions and teaching materials
- Digital project showcases
- Professional experience and awards

### Styling
The modular CSS structure makes customization straightforward:
- Modify `css/variables.css` to change colors, fonts, and spacing
- Update `css/main.css` for component-specific changes
- Adjust `css/responsive.css` for mobile behavior

## Browser Support

- Modern browsers (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- Progressive enhancement ensures basic functionality in older browsers
- CSS Grid and Flexbox provide layout fallbacks

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Focus indicators for interactive elements
- Skip-to-content link
- High contrast support
- Reduced motion support for users with vestibular disorders

## Performance Optimizations

- Minimal external dependencies
- Optimized CSS with efficient selectors
- Lazy loading support for images
- Print-optimized styles
- Efficient JavaScript with intersection observers

## Development

To work with this template:

1. Clone or download the files
2. Open `index.html` in a web browser to preview
3. Use a local development server for the best experience:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```
4. Edit HTML files to add your content
5. Modify CSS variables in `css/variables.css` to match your preferences

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting
- University web servers

No build process or server-side functionality required.

## License

This project is licensed under the MIT License - see the [License.md](License.md) file for details.

## Contributing

This template is designed to be easily customizable for individual use. If you create improvements that would benefit other digital humanities scholars, consider sharing them with the community.

## Academic Context

This template was designed specifically for digital humanities academics and includes:
- Appropriate academic tone and terminology
- Sections relevant to DH scholarship (digital projects, computational methods)
- Examples of interdisciplinary research and collaboration
- Integration of technical skills with humanistic inquiry
- Emphasis on critical engagement with technology

The content examples reflect current trends and concerns in digital humanities scholarship while remaining adaptable to various research areas and career stages.
