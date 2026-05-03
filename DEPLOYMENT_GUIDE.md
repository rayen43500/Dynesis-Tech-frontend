# Guide de Déploiement - Dynesis Tech

## 🚀 Avant le Déploiement

### 1. Configuration Locale

Assurez-vous que votre `.env.local` contient:
```
MONGODB_URI=mongodb+srv://[username]:[password]@cluster.mongodb.net/dynesis_tech
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx (ou sk_live pour production)
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx (ou pk_live pour production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx (ou pk_live pour production)
```

### 2. Test Local

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Test build
pnpm start
```

### 3. Vérifier Que Tout Fonctionne

- [ ] Homepage charge correctement
- [ ] Contact form submits sans erreurs
- [ ] Newsletter form fonctionne
- [ ] Pas d'erreurs console
- [ ] Responsive design sur mobile
- [ ] Images haute qualité s'affichent

---

## 📦 Déploiement sur Vercel

### Étape 1: Connecter le Repo

```bash
# Si vous n'avez pas encore pushé sur GitHub
git add .
git commit -m "Homepage modernisée avec newsletter et contact avancé"
git push origin main
```

### Étape 2: Configuration Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Sélectionnez votre repository GitHub
4. Configure project settings:
   - Framework: Next.js
   - Root directory: ./
   - Build command: `pnpm build`
   - Start command: `pnpm start`

### Étape 3: Variables d'Environnement

Dans Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://[username]:[password]@cluster.mongodb.net/dynesis_tech
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxx
```

**⚠️ IMPORTANT:**
- Use `sk_live` and `pk_live` keys pour production
- Use `sk_test` and `pk_test` pour staging
- Ne jamais committer les vraies clés dans le code

### Étape 4: Deploy

1. Click "Deploy" dans Vercel
2. Attend la compilation (2-3 minutes)
3. Vérifie le build:
   - [ ] Build réussi
   - [ ] No errors in logs
   - [ ] Preview URL fonctionne

---

## ✅ Post-Déploiement Checklist

### 1. Vérifier Production

- [ ] Homepage loads fast
- [ ] Hero images appear correctly
- [ ] Forms submit and save to MongoDB
- [ ] Newsletter signup works
- [ ] All pages accessible
- [ ] Mobile version responsive
- [ ] No console errors

### 2. Test Formulaires

**Contact Form:**
```
Test Data:
Name: Test User
Email: test@example.com
Phone: +33 6 XX XX XX XX
Company: Test Company
Type: Quote
Message: This is a test message
Newsletter: Checked

Expected Result:
- Form submits
- Data saved to MongoDB contacts collection
- Success message shows
- Email subscriber added if opted-in
```

**Newsletter:**
```
Test Data:
Email: newsletter@example.com

Expected Result:
- Form submits
- Subscriber added to newsletter_subscribers
- Success message shows
```

### 3. MongoDB Verification

```javascript
// Dans MongoDB Atlas console
db.contacts.find({})    // Should show test submissions
db.newsletter_subscribers.find({})  // Should show subscribers
```

### 4. Stripe Verification

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Check "Payments" section
3. Verify test transactions appear

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push

Vercel automatically deploys on every push to main:

1. Commit and push code
2. Vercel builds automatically
3. Deploy to Production URL

### Preview URLs

- Main branch → Production
- Pull Requests → Preview URLs for testing

---

## 🛡️ Security Considerations

### Environment Variables
- [ ] All secrets in Vercel, never in code
- [ ] .env.local not committed to git
- [ ] .gitignore includes env files

### Database Security
- [ ] MongoDB IP whitelist configured
- [ ] Strong password for MongoDB user
- [ ] Database user has minimal required permissions
- [ ] SSL/TLS enabled for connection

### Stripe Security
- [ ] Using test keys for development
- [ ] Using live keys only in production
- [ ] Never expose secret keys in frontend code
- [ ] All payments processed server-side

### CORS & API Security
- [ ] API routes only accept POST from same origin
- [ ] Email validation on server-side
- [ ] Rate limiting considered for production
- [ ] Input sanitization implemented

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Go to Vercel Dashboard → Analytics
2. Monitor:
   - Page load times
   - Core Web Vitals
   - Error rates
   - Traffic patterns

### MongoDB Monitoring

1. Go to MongoDB Atlas → Monitoring
2. Check:
   - Query performance
   - Storage usage
   - Connection count
   - Error logs

### Stripe Monitoring

1. Go to Stripe Dashboard → Events
2. Monitor:
   - Failed payments
   - Subscription events
   - API errors

---

## 🔧 Troubleshooting

### Forms Not Submitting

1. Check browser console for errors
2. Verify MongoDB URI in Vercel env vars
3. Check MongoDB connection status
4. Verify Vercel logs for API errors

```bash
# View Vercel logs
vercel logs
```

### Images Not Loading

1. Check image URLs in code
2. Verify images exist in /public/images
3. Check Next.js Image optimization
4. Check browser DevTools network tab

### Stripe Not Working

1. Verify Stripe keys in Vercel
2. Check Stripe API status
3. Verify Stripe keys are for correct environment
4. Check browser console for Stripe errors

---

## 📈 Performance Optimization

### Image Optimization
- All images use Next.js Image component
- Automatic WebP conversion
- Responsive image sizes
- Lazy loading for below-fold

### Code Splitting
- Dynamic imports for heavy components
- Automatic route code splitting
- CSS optimization

### Caching
- Static pages pre-rendered
- Browser cache headers configured
- CDN distribution via Vercel

---

## 🔐 GDPR & Privacy

### Data Handling
- [ ] Privacy policy created
- [ ] Cookie consent implemented (if needed)
- [ ] GDPR compliance verified
- [ ] Data retention policy clear

### Newsletter
- [ ] Double opt-in implemented
- [ ] Unsubscribe mechanism easy
- [ ] Newsletter privacy clear

### Contact Form
- [ ] Data usage disclosed
- [ ] Retention policy stated
- [ ] Unsubscribe option available

---

## 📞 Support & Maintenance

### Regular Checks
- [ ] Check analytics weekly
- [ ] Monitor error logs
- [ ] Test forms monthly
- [ ] Update dependencies quarterly

### Backup Strategy
- [ ] MongoDB automatic backups enabled
- [ ] Code backed up in GitHub
- [ ] Regular exports of subscriber list

### Updates
- Keep Next.js updated
- Update security dependencies
- Monitor Stripe API changes

---

## 🎉 You're Live!

Congratulations! Your Dynesis Tech website is now deployed and live.

**Production URL**: `https://your-domain.com`

For ongoing support and updates, see `IMPROVEMENTS_SUMMARY.md` and `TESTING_GUIDE.md`.
