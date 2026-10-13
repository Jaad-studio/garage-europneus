import glob
import json
import os
import re
import urllib.request

HTML_PATTERN = '/Users/jadzzr/Downloads/*leboncoin*.html'
OUTPUT_JSON = '/Users/jadzzr/Desktop/Chasseur/garage-europneus/src/data/carsStock.json'
CARS_DIR = '/Users/jadzzr/Desktop/Chasseur/garage-europneus/public/cars'

os.makedirs(CARS_DIR, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

html_files = sorted(glob.glob(HTML_PATTERN))
print(f"Trouvé {len(html_files)} fichier(s) HTML LeBonCoin.")

all_ads = {}
for hfile in html_files:
    print(f"Lecture de: {os.path.basename(hfile)}")
    try:
        with open(hfile, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Erreur lecture {hfile}: {e}")
        continue

    next_data = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', content)
    if not next_data:
        continue

    try:
        data = json.loads(next_data.group(1))
    except Exception as e:
        print(f"Erreur parsing JSON dans {hfile}: {e}")
        continue

    ads = data.get('props', {}).get('pageProps', {}).get('adsData', {}).get('ads', [])
    for ad in ads:
        ad_id = str(ad.get('list_id') or ad.get('url', '').split('/')[-1])
        if ad_id and ad_id not in all_ads:
            all_ads[ad_id] = ad

print(f"Total annonces uniques trouvées : {len(all_ads)}")

cars = []
for i, (ad_id, ad) in enumerate(all_ads.items()):
    attrs = {a.get('key'): a.get('value_label') or a.get('value') for a in ad.get('attributes', [])}
    subject = ad.get('subject', '').strip()
    
    # Clean brand
    brand = attrs.get('brand') or attrs.get('u_car_brand') or (subject.split()[0] if subject else 'Autre')
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
        'BMW': 'BMW'
    }
    brand_upper = brand.upper()
    if brand_upper in brand_map:
        brand = brand_map[brand_upper]
    elif 'A1 ' in subject or 'A3 ' in subject:
        brand = 'Audi'
    elif 'GOLF' in subject.upper():
        brand = 'Volkswagen'

    v_type = attrs.get('vehicle_type', '')
    url_lower = ad.get('url', '').lower()
    subj_lower = subject.lower()

    category = 'Berline & Citadine'
    if any(k in subj_lower or k in v_type.lower() for k in ['suv', '4x4', 'crossover', '3008', '2008', 'c-hr', 'juke', 'outlander', 'captur', 'kadjar', 'duster']):
        category = 'SUV & 4x4'
    elif 'utilitaire' in url_lower or any(k in subj_lower for k in ['partner', 'berlingo', 'kangoo', 'ducato', 'scudo', 'master', 'boxer', 'trafic', 'transit', 'h.t', 'ht ']):
        category = 'Utilitaire (VU)'

    price = ad.get('price', [0])[0] if isinstance(ad.get('price'), list) else ad.get('price', 0)

    # Download main image
    imgs = ad.get('images', {}).get('urls_large') or ad.get('images', {}).get('urls', [])
    first_img = imgs[0] if imgs else None
    local_img_path = f"/cars/car-lbc-{ad_id}.jpg"
    dest_file = os.path.join(CARS_DIR, f"car-lbc-{ad_id}.jpg")

    if first_img:
        if not os.path.exists(dest_file) or os.path.getsize(dest_file) == 0:
            try:
                req = urllib.request.Request(first_img, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    with open(dest_file, 'wb') as img_f:
                        img_f.write(resp.read())
                print(f"[{i+1}/{len(all_ads)}] Photo téléchargée -> car-lbc-{ad_id}.jpg ({os.path.getsize(dest_file)} o)")
            except Exception as e:
                print(f"Erreur téléchargement photo car-lbc-{ad_id}: {e}")
                local_img_path = first_img
        else:
            # already exists
            pass
    else:
        local_img_path = None

    body = ad.get('body', '')
    specs = []
    if 'GPS' in body or 'navigation' in body.lower():
        specs.append('GPS Navigation')
    if 'caméra de recul' in body.lower() or 'camera de recul' in body.lower():
        specs.append('Caméra de recul')
    elif 'radar' in body.lower() or 'stationnement' in body.lower():
        specs.append('Radars stationnement')
    if 'climatisation' in body.lower() or 'clim' in body.lower():
        specs.append('Climatisation')
    if 'bluetooth' in body.lower() or 'mains libres' in body.lower():
        specs.append('Bluetooth mains-libres')
    if 'régulateur' in body.lower() or 'regulateur' in body.lower():
        specs.append('Régulateur de vitesse')
    if 'jantes' in body.lower() or 'alliage' in body.lower():
        specs.append('Jantes alliage')
    if not specs:
        specs = ['Révisé & Garanti', 'Contrôle Technique OK', 'Garantie 12 Mois']
    specs = specs[:4]

    gearbox = attrs.get('gearbox') or ('Automatique' if 'b.a' in subj_lower or 'eat8' in subj_lower or 's tronic' in subj_lower or 'e-cvt' in subj_lower or '9g-tronic' in subj_lower else 'Manuelle')
    fuel = attrs.get('fuel') or ('Diesel' if 'bluehdi' in subj_lower or 'd2' in subj_lower or 'di-d' in subj_lower or '200 d' in subj_lower else 'Essence')

    badge = 'Garantie 12 Mois - Révisée'
    if gearbox == 'Automatique':
        badge = 'Boîte Automatique'
    elif 'Crit\'air : 1' in body or 'crit\'air 1' in subj_lower or 'crit 1' in subj_lower:
        badge = 'Crit\'Air 1'
    elif category == 'Utilitaire (VU)':
        badge = 'TVA Récupérable'

    horse_din = attrs.get('horse_power_din', '')
    horse_cv = attrs.get('horsepower', '')
    power_str = f"{horse_din} ({horse_cv})".strip() if (horse_din or horse_cv) else "Non spécifié"

    regdate = attrs.get('regdate')
    try:
        year_val = int(regdate) if regdate else 2020
    except:
        year_val = 2020

    desc = f"{subject}. Véhicule sélectionné, révisé dans nos ateliers et sous garantie au Garage Euro Pneus Distribution à Mours-Saint-Eusèbe. Visible sur parc."

    cars.append({
        'id': f"car-lbc-{ad_id}",
        'brand': brand,
        'title': subject,
        'category': category,
        'price': price,
        'year': year_val,
        'km': attrs.get('mileage') or 'Kilométrage certifié',
        'fuel': fuel,
        'gearbox': gearbox,
        'power': power_str,
        'badge': badge,
        'promoCarteGrise': True,
        'image': local_img_path,
        'url': ad.get('url', 'https://www.leboncoin.fr/boutique/17552/garage_euro_pneus_distribution.htm'),
        'specs': specs,
        'desc': desc
    })

with open(OUTPUT_JSON, 'w', encoding='utf-8') as out_f:
    json.dump(cars, out_f, ensure_ascii=False, indent=2)

print(f"\n Succès : {len(cars)} véhicules enregistrés dans {OUTPUT_JSON}")
