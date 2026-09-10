# NORMA S.A. — Landing Page

React + Vite + Tailwind CSS, στυλιζαρισμένο σύμφωνα με τα screenshots του
πραγματικού evros-mreja.com: σκούρο navy + teal accent, serif τυπογραφία
(Playfair Display) για τίτλους, καθαρή sans-serif (Inter) για κείμενο.

## Sections

- **Header** — sticky navbar, λογότυπο "N" badge, mobile menu
- **Hero** — full-height, κεντραρισμένο, teal eyebrow + serif heading
- **About** — "Ποιότητα & Αξιοπιστία" με 4 animated stat cards (μετρούν
  από το 0 όταν μπαίνουν στην οθόνη)
- **Products** — σκούρο navy section, grid καρτών προϊόντων
- **Contact** — στοιχεία επικοινωνίας + social icons + Google Maps embed
- **Footer** — minimal, σκούρο navy

## Πώς να το τρέξεις

```bash
npm install
npm run dev
```

Άνοιξε το `http://localhost:5173`.

## Τι πρέπει να αλλάξεις πριν το ανεβάσεις live

- [ ] **Εικόνες**: βάλε πραγματικές φωτογραφίες στο `public/images/`
      (φωτογραφία κτιρίου για το hero background, φωτογραφίες προϊόντων
      στο Products.jsx)
- [ ] **Hero background**: στο `Hero.jsx`, αντικατέστησε το
      `backgroundImage` gradient με `url('/images/hero-bg.jpg')`
- [ ] **Στοιχεία επικοινωνίας**: τηλέφωνο/email/διεύθυνση στο
      `ContactForm.jsx`
- [ ] **Social links**: βάλε τα πραγματικά links στο `ContactForm.jsx`
- [ ] **Χάρτης**: άλλαξε το query στο Google Maps iframe με την
      ακριβή τοποθεσία σου

## Deploy

```bash
npm run build
```

Ανέβασε τον φάκελο `dist/` σε **Vercel**, **Netlify** ή **Railway**.
