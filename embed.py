#!/usr/bin/env python3
"""Re-embed app/ into worker/worker.js (run from repo root)."""
import re, json, base64, pathlib
root=pathlib.Path(__file__).resolve().parent.parent
w=(root/'worker/worker.js').read_text()
def b64(p): return base64.b64encode((root/p).read_bytes()).decode()
w=re.sub(r'const APP_HTML = ".*?";\n',lambda m:'const APP_HTML = '+json.dumps((root/'app/index.html').read_text())+';\n',w,count=1,flags=re.S)
w=re.sub(r'const SW_JS = ".*?";\n',lambda m:'const SW_JS = '+json.dumps((root/'app/sw.js').read_text())+';\n',w,count=1,flags=re.S)
w=re.sub(r'const MANIFEST = ".*?";\n',lambda m:'const MANIFEST = '+json.dumps((root/'app/manifest.webmanifest').read_text())+';\n',w,count=1,flags=re.S)
w=re.sub(r'const ICON_192 = "[^"]*";',lambda m:'const ICON_192 = "'+b64('app/icon-192.png')+'";',w,count=1)
w=re.sub(r'const ICON_512 = "[^"]*";',lambda m:'const ICON_512 = "'+b64('app/icon-512.png')+'";',w,count=1)
w=re.sub(r'const ICON_APPLE = "[^"]*";',lambda m:'const ICON_APPLE = "'+b64('app/apple-touch-icon.png')+'";',w,count=1)
(root/'worker/worker.js').write_text(w)
print('worker/worker.js rebuilt')
