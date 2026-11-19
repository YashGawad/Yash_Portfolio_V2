import subprocess
import os
import time

viewports = [
    (320, 740, "mobile-320"),
    (360, 800, "mobile-360"),
    (390, 844, "mobile-390"),
    (430, 932, "mobile-430"),
    (768, 1024, "tablet-768"),
    (1024, 768, "tablet-landscape-1024"),
    (1440, 900, "desktop-1440"),
]

shots_dir = os.path.abspath("screenshots_v2")
os.makedirs(shots_dir, exist_ok=True)
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
url = "http://localhost:4173/Yash_Portfolio_V2/"

print("Starting responsive viewport test captures...")
results = []
for w, h, name in viewports:
    out_file = os.path.join(shots_dir, f"{name}.png")
    user_dir = f"d:\\Yash_Portfolio_V2\\tmp_edge_v2_{w}_{h}"
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--user-data-dir={user_dir}",
        f"--window-size={w},{h}",
        f"--screenshot={out_file}",
        url
    ]
    try:
        subprocess.run(cmd, capture_output=True, timeout=12)
        exists = os.path.exists(out_file)
        size = os.path.getsize(out_file) if exists else 0
        results.append((name, w, h, exists, size))
        print(f"Captured {name} ({w}x{h}): exists={exists}, size={size} bytes")
    except Exception as e:
        results.append((name, w, h, False, str(e)))
        print(f"Failed {name} ({w}x{h}): {e}")

print("Summary of viewports:")
for r in results:
    print(r)
