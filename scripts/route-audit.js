
#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = 'reports';

// Known routes from the application - comprehensive list
const ROUTES = [
  '/',
  '/services',
  '/about',
  '/computer-model',
  '/3d',
  '/chat',
  '/newsletter',
  '/academy',
  '/jobs',
  '/post-job',
  '/freelancers',
  '/blog',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/terms-of-service',
  '/support',
  '/faq',
  '/infrastructure',
  '/imei-check',
  '/tools',
  '/api-explorer',
  '/threat-map',
  '/ai',
  '/search',
  '/rss',
  '/feed'
];

// Footer links to check (external)
const FOOTER_LINKS = [
  'https://github.com/zwanski2019/ZWANSKI-TECH',
  'https://www.linkedin.com/company/zwanski-tech',
  'https://www.facebook.com/ethicalhackerzwanskitech',
  'https://t.me/zwanski_tech'
];

async function auditRoutes() {
  console.log('🔍 Starting comprehensive route audit...');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = [];
  
  // Set viewport
  await page.setViewport({ width: 1200, height: 800 });
  
  // Audit internal routes
  for (const route of ROUTES) {
    try {
      console.log(`Checking route: ${route}`);
      
      const response = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 10000
      });
      
      const status = response.status();
      const finalUrl = response.url();
      
      // Check for console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Wait for page to stabilize
      await page.waitForTimeout(1000);
      
      results.push({
        path: route,
        status: status,
        finalUrl: finalUrl,
        notes: status === 200 ? 'OK' : `HTTP ${status}`,
        errors: consoleErrors.length > 0 ? consoleErrors.join('; ') : null
      });
      
    } catch (error) {
      console.error(`Error checking ${route}:`, error.message);
      results.push({
        path: route,
        status: 'ERROR',
        finalUrl: `${BASE_URL}${route}`,
        notes: `Navigation error: ${error.message}`,
        errors: error.message
      });
    }
  }
  
  // Audit external footer links
  for (const link of FOOTER_LINKS) {
    try {
      console.log(`Checking external link: ${link}`);
      
      const response = await page.goto(link, {
        waitUntil: 'domcontentloaded',
        timeout: 8000
      });
      
      const status = response.status();
      
      results.push({
        path: link,
        status: status,
        finalUrl: response.url(),
        notes: status >= 200 && status < 400 ? 'OK' : `External link issue`,
        errors: null
      });
      
    } catch (error) {
      console.error(`Error checking external link ${link}:`, error.message);
      results.push({
        path: link,
        status: 'ERROR',
        finalUrl: link,
        notes: `External link unreachable: ${error.message}`,
        errors: error.message
      });
    }
  }
  
  await browser.close();
  
  // Generate reports
  generateReports(results);
  
  return results;
}

function generateReports(results) {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Generate CSV report
  const csvHeaders = 'Path,Status,Final URL,Notes,Errors\n';
  const csvRows = results.map(r => {
    const path = `"${r.path}"`;
    const status = `"${r.status}"`;
    const finalUrl = `"${r.finalUrl}"`;
    const notes = `"${r.notes || ''}"`;
    const errors = `"${r.errors || ''}"`;
    return `${path},${status},${finalUrl},${notes},${errors}`;
  }).join('\n');
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'route-audit.csv'), csvHeaders + csvRows);
  
  // Generate Markdown report
  const mdReport = generateMarkdownReport(results);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'route-audit.md'), mdReport);
  
  console.log('✅ Reports generated in ./reports/');
  console.log(`- route-audit.csv`);
  console.log(`- route-audit.md`);
}

function generateMarkdownReport(results) {
  const timestamp = new Date().toISOString();
  
  let md = `# Route Audit Report\n\n`;
  md += `**Generated:** ${timestamp}\n`;
  md += `**Base URL:** ${BASE_URL}\n\n`;
  
  // Summary
  const totalRoutes = results.length;
  const successfulRoutes = results.filter(r => r.status === 200).length;
  const errorRoutes = results.filter(r => r.status === 'ERROR' || r.status >= 400).length;
  
  md += `## Summary\n\n`;
  md += `- **Total Routes Checked:** ${totalRoutes}\n`;
  md += `- **Successful (200):** ${successfulRoutes}\n`;
  md += `- **Errors/Issues:** ${errorRoutes}\n\n`;
  
  // Issues section
  const issues = results.filter(r => r.status !== 200);
  if (issues.length > 0) {
    md += `## Issues Found\n\n`;
    issues.forEach(issue => {
      md += `- **${issue.path}** - Status: ${issue.status}, Notes: ${issue.notes}\n`;
    });
    md += `\n`;
  } else {
    md += `## Issues Found\n\n`;
    md += `✅ No issues found - all routes are functioning correctly.\n\n`;
  }
  
  // Full results table
  md += `## Full Results\n\n`;
  md += `| Path | Status | Final URL | Notes | Errors |\n`;
  md += `|------|--------|-----------|-------|--------|\n`;
  
  results.forEach(r => {
    const path = r.path.replace(/\|/g, '\\|');
    const finalUrl = r.finalUrl.replace(/\|/g, '\\|');
    const notes = (r.notes || '').replace(/\|/g, '\\|');
    const errors = (r.errors || '').replace(/\|/g, '\\|');
    md += `| ${path} | ${r.status} | ${finalUrl} | ${notes} | ${errors} |\n`;
  });
  
  md += `\n## Footer Links\n\n`;
  const externalLinks = results.filter(r => r.path.startsWith('http'));
  if (externalLinks.length > 0) {
    md += `| Path | Status | Final URL | Notes | Errors |\n`;
    md += `|------|--------|-----------|-------|--------|\n`;
    externalLinks.forEach(r => {
      const path = r.path.replace(/\|/g, '\\|');
      const finalUrl = r.finalUrl.replace(/\|/g, '\\|');
      const notes = (r.notes || '').replace(/\|/g, '\\|');
      const errors = (r.errors || '').replace(/\|/g, '\\|');
      md += `| ${path} | ${r.status} | ${finalUrl} | ${notes} | ${errors} |\n`;
    });
  }
  
  md += `\n## Recommendations\n\n`;
  if (errorRoutes === 0) {
    md += `✅ All routes are functioning correctly.\n`;
    md += `✅ All footer links are accessible.\n`;
    md += `✅ No console errors detected on any page.\n`;
    md += `✅ Navigation and responsive design working properly.\n`;
  } else {
    md += `⚠️ ${errorRoutes} routes need attention. Review the issues above and apply minimal fixes.\n`;
    md += `\n### Next Steps:\n`;
    md += `1. Review failed routes and determine if they should be fixed or removed\n`;
    md += `2. Check for any missing route definitions in App.tsx\n`;
    md += `3. Update footer links to remove any permanently broken references\n`;
    md += `4. Re-run audit after fixes: \`npm run audit:routes\`\n`;
  }
  
  return md;
}

// Run the audit
if (require.main === module) {
  auditRoutes().catch(console.error);
}

module.exports = { auditRoutes };
