import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const agentOptions = {
  rejectUnauthorized: false,
  minVersion: 'TLSv1',
  ciphers: 'ALL'
};

const httpsAgent = new https.Agent(agentOptions);

const bannerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const dignitaries = [
  'sri_pulok_roy.jpg',
  'sri_abhay_das.jpg',
  'shri_manas_kumar_mandal_sdo_uluberia.jpg',
  'siddhartha_das.jpg',
  'barun_kumar_samui.jpg',
  'dr_akram_hossain.jpg',
  'chandi_charan_dhar.jpg',
  'ashis_das.jpg',
  'swapan_kumar_kanrar.jpg',
  'uttam_bhattacharya.jpg',
  'sk_sohrab_ali.jpg',
  'sri_debasis_ghosh.jpg',
  'sri_sukumar_samanta.jpg',
  'sri_deb_kumar_manna.jpg'
];

async function download(url, destPath) {
  return new Promise((resolve) => {
    const isHttps = url.startsWith('https:');
    const client = isHttps ? https : http;
    const req = client.get(url, isHttps ? { agent: httpsAgent } : {}, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: status ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${destPath}`);
        resolve(true);
      });
    });
    req.on('error', (err) => {
      console.log(`Error ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('Downloading banners...');
  for (const id of bannerIds) {
    const urlHttps = `https://www.ulbil.org/images/Banner/${id}.jpg`;
    const urlHttp = `http://www.ulbil.org/images/Banner/${id}.jpg`;
    const dest = path.join('public', 'images', 'Banner', `${id}.jpg`);
    let ok = await download(urlHttps, dest);
    if (!ok) {
      await download(urlHttp, dest);
    }
  }

  console.log('Downloading dignitary photos...');
  for (const name of dignitaries) {
    const urlHttps = `https://www.ulbil.org/files/contents/${name}`;
    const urlHttp = `http://www.ulbil.org/files/contents/${name}`;
    const dest = path.join('public', 'files', 'contents', name);
    let ok = await download(urlHttps, dest);
    if (!ok) {
      await download(urlHttp, dest);
    }
  }
}

main();
