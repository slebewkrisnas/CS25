import base64
import os

img_path = 'logo_jasaku_extracted.png'
if os.path.exists(img_path):
    with open(img_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    data_uri = f"data:image/png;base64,{encoded}"
    with open('scripts/logo_base64.txt', 'w', encoding='utf-8') as out:
        out.write(data_uri)
    print(f"SUCCESS: Generated Base64 data URI of length {len(data_uri)}")
else:
    print(f"ERROR: {img_path} not found")
