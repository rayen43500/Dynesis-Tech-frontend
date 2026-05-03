# Guide de Test Complet - Dynesis Tech

## 📱 Test Responsive Design

### Mobile Devices (320px - 480px)
**iPhone SE / iPhone 12 mini**
```
- [ ] Hero section: Full-width image, text below
- [ ] Buttons: Touch targets 48px minimum
- [ ] Forms: Single column, full-width inputs
- [ ] Images: Properly scaled, crisp quality
- [ ] Navigation: Mobile menu works smoothly
- [ ] Newsletter: Input stacked, button full-width
```

### Tablet Devices (768px - 1024px)
**iPad / iPad Air**
```
- [ ] Grid layouts: 2 columns for services
- [ ] Hero: Side-by-side with proper spacing
- [ ] Contact form: 2 columns starts here
- [ ] All images: High quality, no stretching
- [ ] Buttons: Hover states work
```

### Desktop (1024px+)
**Desktop / Laptop**
```
- [ ] Hero section: Full 2-column layout
- [ ] Services: 4-column grid perfect alignment
- [ ] All animations: Smooth 60fps
- [ ] Hover effects: Scale, shadows work
- [ ] Images: Ultra-crisp 2560x1440 quality
```

---

## 🧪 Functional Testing

### Homepage Hero Section
```
Tests:
- [ ] Hero background image loads (no flash)
- [ ] Hero image right side displays correctly
- [ ] Text has proper contrast on background
- [ ] "Start Your Project" button is clickable
- [ ] "View Portfolio" button links to /portfolio
- [ ] Stats (50+, 40+, 8+) display properly
- [ ] Animations fade-in on page load
```

### Services Section
```
Tests:
- [ ] 4 service cards display in grid
- [ ] Icons render correctly with colors
- [ ] Hover: Cards scale up smoothly
- [ ] Hover: Background color changes
- [ ] Mobile: Stacks to 2 columns (tablet)
- [ ] Mobile: Single column (mobile)
```

### Newsletter Section
```
Tests:
- [ ] Background image loads with gradient overlay
- [ ] Newsletter form visible
- [ ] Email input placeholder text shows
- [ ] "Subscribe" button responsive
- [ ] Mobile: Full-width input + button
- [ ] Desktop: Inline layout
```

### Contact Page Form
```
Tests:
- [ ] All form fields render
- [ ] Type de demande dropdown works
- [ ] Invoice field shows when applicable
- [ ] Newsletter checkbox functional
- [ ] Client validation works (red borders)
- [ ] Submit button disabled while loading
- [ ] Success message displays after submit
- [ ] Form clears after successful submit
```

---

## 🖼️ Image Quality Testing

### Hero Background (`hero-bg.jpg`)
```
- [ ] Dimensions: 2560x1440px
- [ ] Loads without quality loss
- [ ] Overlay makes text readable
- [ ] Mobile: Properly cropped (no distortion)
```

### Hero Image (`hero-modern.jpg`)
```
- [ ] High quality, crisp edges
- [ ] No pixelation or compression artifacts
- [ ] Colors vibrant (blue/purple)
- [ ] Mobile: Scales proportionally
```

### Newsletter Background (`newsletter-bg.jpg`)
```
- [ ] Gradient overlay readable
- [ ] Form text visible on top
- [ ] Professional appearance
```

---

## ♿ Accessibility Testing

### Keyboard Navigation
```
- [ ] Tab through all form fields
- [ ] Buttons focusable and clickable with Enter
- [ ] Tab order logical (top to bottom)
- [ ] Focus indicators visible (blue outline)
- [ ] Can reach all interactive elements
```

### Screen Reader (NVDA/JAWS)
```
- [ ] Page heading announced
- [ ] Form labels announced
- [ ] Error messages announced
- [ ] Success messages announced
- [ ] Image alt text present
- [ ] Button purposes clear
```

### Color Contrast
```
- [ ] Text on hero background: 7:1+ ratio
- [ ] Form labels: 7:1+ ratio
- [ ] Button text: 7:1+ ratio
- [ ] Link text: 7:1+ ratio
- [ ] Test with: WebAIM Contrast Checker
```

### Motion & Animation
```
- [ ] Animations respect prefers-reduced-motion
- [ ] No autoplaying videos
- [ ] No flashing/seizure triggers
- [ ] Hover animations optional (not required)
```

---

## 🚀 Performance Testing

### Core Web Vitals
```
Tool: PageSpeed Insights
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
```

### Image Optimization
```
- [ ] Images use Next.js Image component
- [ ] Quality: 90 for high-quality appearance
- [ ] Lazy loading enabled for below-fold
- [ ] Priority="true" for above-fold images
- [ ] WebP format used where supported
```

### JavaScript
```
- [ ] No console errors
- [ ] No console warnings
- [ ] Form submissions via API (no page reload)
- [ ] Smooth transitions (60fps)
```

---

## 📝 Form Testing

### Contact Form Validation
```
Test: Submit empty form
- [ ] "Name required" error shows
- [ ] "Email required" error shows
- [ ] "Message required" error shows
- [ ] Form doesn't submit

Test: Invalid email
- [ ] Enter "notanemail"
- [ ] Error: "Invalid email address"
- [ ] Form doesn't submit

Test: Valid data
- [ ] All fields filled
- [ ] Submit button enabled
- [ ] Loading state shows
- [ ] Success message displays
- [ ] MongoDB saves contact
```

### Newsletter Validation
```
Test: Invalid email
- [ ] Enter "invalid"
- [ ] Error message shows
- [ ] Form doesn't submit

Test: Duplicate email
- [ ] Already subscribed email
- [ ] "Already subscribed" message shows

Test: Valid email
- [ ] New email entered
- [ ] Submit works
- [ ] Success message
- [ ] MongoDB saves subscriber
```

---

## 🌐 Cross-Browser Testing

### Chrome/Edge (Latest)
```
- [ ] All features work
- [ ] Animations smooth
- [ ] Forms submit correctly
```

### Firefox (Latest)
```
- [ ] All features work
- [ ] CSS animations smooth
- [ ] Form validation works
```

### Safari (Latest)
```
- [ ] All features work
- [ ] iOS/macOS compatibility
- [ ] Touch interactions smooth
```

### Mobile Browsers
```
iOS Safari:
- [ ] Responsive layout correct
- [ ] Touch interactions work
- [ ] Forms keyboard accessible

Chrome Mobile:
- [ ] All features functional
- [ ] Performance acceptable
```

---

## 📊 Testing Report Template

```markdown
## Test Results - [Date]

### Mobile (iPhone 12)
- Hero: ✅ Pass / ❌ Fail
- Forms: ✅ Pass / ❌ Fail
- Images: ✅ Pass / ❌ Fail
- Performance: ✅ Pass / ❌ Fail

### Tablet (iPad)
- Layout: ✅ Pass / ❌ Fail
- Forms: ✅ Pass / ❌ Fail

### Desktop
- All sections: ✅ Pass / ❌ Fail
- Animations: ✅ Pass / ❌ Fail
- Performance: ✅ Pass / ❌ Fail

### Accessibility
- Keyboard navigation: ✅ Pass / ❌ Fail
- Screen readers: ✅ Pass / ❌ Fail
- Color contrast: ✅ Pass / ❌ Fail

### Issues Found
1. [Description]
   - Severity: High/Medium/Low
   - Solution: [Fix]
```

---

## 🎯 Before Deployment

Final checklist:
- [ ] All tests passed
- [ ] No console errors
- [ ] Performance > 90 Lighthouse
- [ ] MongoDB URI configured
- [ ] Stripe keys configured
- [ ] Forms tested end-to-end
- [ ] Images optimized
- [ ] Accessibility verified
- [ ] Mobile responsive verified
- [ ] Ready for production!
