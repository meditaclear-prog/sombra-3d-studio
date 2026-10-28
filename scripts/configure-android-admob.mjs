import fs from 'node';
import path from 'node';

const appId = 'ca-app-pub-8969153075102144~4484241653';

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
const stringsPath = 'android/app/src/main/res/values/strings.xml';

if (!fs.existsSync(manifestPath)) {
console.error('ERRO: AndroidManifest.xml não encontrado.');
process.exit(1);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');

if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
const applicationTag = /<application\b[^>]*>/;

if (!applicationTag.test(manifest)) {
console.error('ERRO: tag <application> não encontrada.');
process.exit(1);
}

manifest = manifest.replace(
applicationTag,
'$&\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />'
);

fs.writeFileSync(manifestPath, manifest);
}

fs.mkdirSync(path.dirname(stringsPath), { recursive: true });

let strings = fs.existsSync(stringsPath)
? fs.readFileSync(stringsPath, 'utf8')
: '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n</resources>\n';

if (!strings.includes('name="admob_app_id"')) {
if (!strings.includes('</resources>')) {
console.error('ERRO: fechamento </resources> não encontrado.');
process.exit(1);
}

strings = strings.replace(
'</resources>',
    <string name="admob_app_id">${appId}</string>\n</resources>
);

fs.writeFileSync(stringsPath, strings);
}

console.log('AdMob configurado no projeto Android.');
