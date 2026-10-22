import glob
import json
import os
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor

HTML_PATTERN = '/Users/jadzzr/Downloads/*leboncoin*.html'
JSON_PATTERN = '/Users/jadzzr/Downloads/*leboncoin*.json'
OUTPUT_JSON = '/Users/jadzzr/Desktop/Chasseur/garage-europneus/src/data/carsStock.json'
CARS_DIR = '/Users/jadzzr/Desktop/Chasseur/garage-europneus/public/cars'

os.makedirs(CARS_DIR, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

all_ads = {}

# 1. Read JSON exports (sort by mtime descending so newest file takes precedence)
json_files = sorted(glob.glob(JSON_PATTERN), key=os.path.getmtime, reverse=True)
for jfile in json_files:
    print(f"-> Lecture JSON : {os.path.basename(jfile)}")
    try:
        with open(jfile, 'r', encoding='utf-8', errors='ignore') as f:
            ads_list = json.load(f)
        if isinstance(ads_list, list):
            for ad in ads_list:
                ad_id = str(ad.get('list_id') or ad.get('url', '').split('/')[-1])
                if ad_id and ad_id not in all_ads:
                    all_ads[ad_id] = ad
    except Exception as e:
        print(f"Erreur lecture {jfile}: {e}")

# 2. Read HTML files
html_files = sorted(glob.glob(HTML_PATTERN), key=os.path.getmtime, reverse=True)
for hfile in html_files:
    try:
        with open(hfile, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception:
        continue

    next_data = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', content)
    if not next_data:
        continue

    try:
        data = json.loads(next_data.group(1))
    except Exception:
        continue

    ads = data.get('props', {}).get('pageProps', {}).get('adsData', {}).get('ads', [])
    for ad in ads:
        ad_id = str(ad.get('list_id') or ad.get('url', '').split('/')[-1])
        # If already present from DOM json, enrich with attributes from html if available
        if ad_id in all_ads:
            if 'attributes' in ad:
                all_ads[ad_id]['attributes'] = ad['attributes']
            if 'body' in ad and not all_ads[ad_id].get('body'):
                all_ads[ad_id]['body'] = ad['body']
        else:
            all_ads[ad_id] = ad

print(f"\n==========================================")
print(f"TOTAL VÉHICULES UNIQUES IDENTIFIÉS : {len(all_ads)}")
print(f"==========================================")

def download_image(item):
    ad_id, first_img = item
    if not first_img:
        return ad_id, None
    dest_file = os.path.join(CARS_DIR, f"car-lbc-{ad_id}.jpg")
    if os.path.exists(dest_file) and os.path.getsize(dest_file) > 1000:
        return ad_id, f"/cars/car-lbc-{ad_id}.jpg"
    try:
        # Strip query parameters for full resolution
        clean_url = first_img.split('?')[0] + "?rule=ad-large"
        req = urllib.request.Request(clean_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            with open(dest_file, 'wb') as img_f:
                img_f.write(resp.read())
        return ad_id, f"/cars/car-lbc-{ad_id}.jpg"
    except Exception:
        try:
            req = urllib.request.Request(first_img, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=12) as resp:
                with open(dest_file, 'wb') as img_f:
                    img_f.write(resp.read())
            return ad_id, f"/cars/car-lbc-{ad_id}.jpg"
        except Exception as e:
            print(f"Erreur photo {ad_id}: {e}")
            return ad_id, first_img

img_tasks = []
for ad_id, ad in all_ads.items():
    imgs = ad.get('images', {}).get('urls_large') or ad.get('images', {}).get('urls', [])
    if not imgs and 'image' in ad and ad['image']:
        imgs = [ad['image']]
    first_img = imgs[0] if imgs else None
    img_tasks.append((ad_id, first_img))

print(f"Téléchargement rapide de {len(img_tasks)} photos d'origine...")
image_results = {}
with ThreadPoolExecutor(max_workers=12) as executor:
    for ad_id, local_path in executor.map(download_image, img_tasks):
        image_results[ad_id] = local_path

print("Téléchargement de toutes les photos terminé avec succès !")

brand_map = {
    'MERCEDES': 'Mercedes-Benz',
    'MERCEDES-BENZ': 'Mercedes-Benz',
    'MITSUBISHI': 'Mitsubishi',
    'NISSAN': 'Nissan',
    'PEUGEOT': 'Peugeot',
    'TOYOTA': 'Toyota',
    'VOLVO': 'Volvo',
    'VOLKSWAGEN': 'Volkswagen',
    'CITROEN': 'Citroën',
    'CITROËN': 'Citroën',
    'AUDI': 'Audi',
    'RENAULT': 'Renault',
    'FIAT': 'Fiat',
    'DACIA': 'Dacia',
    'FORD': 'Ford',
    'BMW': 'BMW',
    'OPEL': 'Opel',
    'SEAT': 'Seat',
    'SKODA': 'Skoda',
    'HYUNDAI': 'Hyundai',
    'KIA': 'Kia',
    'SUZUKI': 'Suzuki',
    'MINI': 'Mini',
    'DS': 'DS',
    'ALFA ROMEO': 'Alfa Romeo',
    'LAND ROVER': 'Land Rover',
    'JEEP': 'Jeep',
    'MAZDA': 'Mazda'
}

cars = []
for i, (ad_id, ad) in enumerate(all_ads.items()):
    attrs = {a.get('key'): a.get('value_label') or a.get('value') for a in ad.get('attributes', [])}
    subject = ad.get('subject', '').strip()
    subj_lower = subject.lower()
    raw = ad.get('raw_text', '')

    # Brand
    brand = attrs.get('brand') or attrs.get('u_car_brand') or ''
    if not brand:
        for k, v in brand_map.items():
            if k in subject.upper():
                brand = v
                break
    if not brand:
        brand = subject.split()[0] if subject else 'Autre'
    brand_upper = brand.upper().strip()
    if brand_upper in brand_map:
        brand = brand_map[brand_upper]
    else:
        brand = brand.capitalize()

    # Category
    v_type = attrs.get('vehicle_type', '')
    url_lower = ad.get('url', '').lower()
    category = 'Berline & Citadine'
    if any(k in subj_lower or k in v_type.lower() for k in ['suv', '4x4', 'crossover', '3008', '2008', '5008', 'c-hr', 'juke', 'outlander', 'captur', 'kadjar', 'duster', 'qashqai', 'tucson', 'sportage', 'tiguan', 't-roc', 'kuga', 'rav4', 'mokka', 'cx-5', 'x3']):
        category = 'SUV & 4x4'
    elif 'utilitaire' in url_lower or 'utilitaires' in raw.lower() or any(k in subj_lower for k in ['partner', 'berlingo', 'kangoo', 'ducato', 'scudo', 'master', 'boxer', 'trafic', 'transit', 'e-nv200', 'fourgon', 'camionnette', 'h.t', 'ht ']):
        category = 'Utilitaire (VU)'

    # Price parsing (clean & robust)
    price = 0
    pm = re.search(r'Prix:\s*([0-9\s\u202f\u00a0]+)\s*€', raw)
    if pm:
        price = int(re.sub(r'[\s\u202f\u00a0]', '', pm.group(1)))
    elif isinstance(ad.get('price'), list) and len(ad['price']) > 0 and ad['price'][0] < 100000:
        price = ad['price'][0]
    else:
        pm2 = re.search(r'([0-9\s\u202f\u00a0]{3,8})\s*€', raw)
        if pm2:
            try:
                candidate = int(re.sub(r'[\s\u202f\u00a0]', '', pm2.group(1)))
                if candidate < 100000:
                    price = candidate
            except:
                pass

    # Year
    regdate = attrs.get('regdate')
    if regdate:
        try:
            year_val = int(regdate)
        except:
            year_val = 2020
    else:
        ym = re.search(r'\b(201\d|202\d)\b', subject)
        year_val = int(ym.group(1)) if ym else 2020

    # Fuel
    fuel = attrs.get('fuel')
    if not fuel:
        if any(k in subj_lower for k in ['hybride', '122h', 'hybrid']):
            fuel = 'Hybride'
        elif any(k in subj_lower for k in ['electrique', 'électrique', 'ami', 'c-zéro', 'e-nv200', '24kwh']):
            fuel = 'Électrique'
        elif any(k in subj_lower for k in ['bluehdi', 'd2', 'di-d', '200 d', 'dci', 'tdi', 'cdti', 'hdi', 'diesel', 'multijet', 'tdci', 'skyactiv-d']):
            fuel = 'Diesel'
        else:
            fuel = 'Essence'

    # Gearbox
    gearbox = attrs.get('gearbox')
    if not gearbox:
        if any(k in subj_lower for k in ['b.a', 'eat8', 'eat6', 's tronic', 'e-cvt', '9g-tronic', 'dsg', 'edc', 'auto', 'bva', 'boîte auto']):
            gearbox = 'Automatique'
        else:
            gearbox = 'Manuelle'

    # Power
    horse_din = attrs.get('horse_power_din', '')
    horse_cv = attrs.get('horsepower', '')
    if horse_din or horse_cv:
        power_str = f"{horse_din} ({horse_cv})".strip()
    else:
        pm = re.search(r'(\d+)\s*(?:ch|cv)', subject, re.I)
        power_str = f"{pm.group(1)} ch" if pm else "Non spécifié"

    # Badges
    badge = 'Garantie 12 Mois - Révisée'
    if fuel == 'Électrique':
        badge = '100% Électrique - Crit\'Air 0'
    elif fuel == 'Hybride':
        badge = 'Hybride - Faible Conso'
    elif gearbox == 'Automatique':
        badge = 'Boîte Automatique'
    elif 'crit\'air 1' in subj_lower or 'crit 1' in subj_lower:
        badge = 'Crit\'Air 1'
    elif category == 'Utilitaire (VU)':
        badge = 'TVA Récupérable / Garanti'

    # Mileage
    km_str = attrs.get('mileage') or 'Kilométrage certifié'

    # Specs
    body = ad.get('body', '') + ' ' + raw
    specs = []
    if 'gps' in body.lower() or 'navigation' in body.lower():
        specs.append('GPS Navigation')
    if 'caméra' in body.lower() or 'camera' in body.lower():
        specs.append('Caméra de recul')
    elif 'radar' in body.lower() or 'stationnement' in body.lower():
        specs.append('Radars stationnement')
    if 'toit' in body.lower() or 'panoramique' in body.lower():
        specs.append('Toit panoramique')
    if 'climatisation' in body.lower() or 'clim' in body.lower():
        specs.append('Climatisation')
    if 'bluetooth' in body.lower() or 'mains libres' in body.lower():
        specs.append('Bluetooth mains-libres')
    if 'régulateur' in body.lower() or 'regulateur' in body.lower():
        specs.append('Régulateur de vitesse')
    if 'jantes' in body.lower() or 'alliage' in body.lower():
        specs.append('Jantes alliage')
    if '7 places' in subj_lower:
        specs.append('7 Vraies Places')
    if not specs:
        specs = ['Révisé & Garanti', 'Contrôle Technique OK', 'Garantie 12 Mois']
    specs = specs[:4]

    desc = f"{subject}. Véhicule sélectionné, révisé dans nos ateliers et sous garantie au Garage Euro Pneus Distribution à Mours-Saint-Eusèbe. Visible sur parc."

    cars.append({
        'id': f"car-lbc-{ad_id}",
        'brand': brand,
        'title': subject,
        'category': category,
        'price': price,
        'year': year_val,
        'km': km_str,
        'fuel': fuel,
        'gearbox': gearbox,
        'power': power_str,
        'badge': badge,
        'promoCarteGrise': True,
        'image': image_results.get(ad_id),
        'url': ad.get('url', f"https://www.leboncoin.fr/ad/voitures/{ad_id}"),
        'specs': specs,
        'desc': desc
    })

existing_stock = []
if os.path.exists(OUTPUT_JSON):
    try:
        with open(OUTPUT_JSON, 'r', encoding='utf-8') as f:
            existing_stock = json.load(f)
    except Exception as e:
        print(f"Erreur lecture existing stock: {e}")
        existing_stock = []

# Merge: parsed cars first (with updated price/info), then keep all previous cars
merged_cars = []
processed_ids = set()

for c in cars:
    merged_cars.append(c)
    processed_ids.add(c['id'])

for ec in existing_stock:
    if ec['id'] not in processed_ids:
        merged_cars.append(ec)
        processed_ids.add(ec['id'])

with open(OUTPUT_JSON, 'w', encoding='utf-8') as out_f:
    json.dump(merged_cars, out_f, ensure_ascii=False, indent=2)

print(f"\n SUCCÈS TOTAL : {len(merged_cars)} VÉHICULES ENREGISTRÉS DANS {OUTPUT_JSON} !")
print(f"({len(cars)} véhicules analysés / mis à jour, {len(merged_cars) - len(cars)} conservés de l'ancien stock)")
