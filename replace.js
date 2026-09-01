const fs = require('fs');

const files = [
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\components\\layout\\Navbar.tsx',
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\components\\layout\\Footer.tsx',
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\components\\home\\NoticeTicker.tsx',
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\components\\home\\HeritageCarousel.tsx',
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\components\\home\\JubileeCelebrationBanner.tsx',
  'c:\\Users\\arkad\\OneDrive\\Documents\\Codes\\ulbil\\src\\app\\page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/#6B2D3E/ig, '#D95D24');
  content = content.replace(/#4E1F2D/ig, '#A94314');
  content = content.replace(/#F6EEF0/ig, '#FEF0EA');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
