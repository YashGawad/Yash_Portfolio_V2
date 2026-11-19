import subprocess
import os

viewports = [
    (320, 740),
    (360, 800),
    (390, 844),
    (430, 932),
    (768, 1024),
    (1024, 768),
    (1440, 900),
]

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
url = "http://localhost:4173/Yash_Portfolio_V2/"

print("Testing for horizontal overflow across viewports...")
# In Edge headless, we can check dump-dom or evaluate scrollWidth
# Let's inspect the rendered DOM at 320px
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--user-data-dir=d:\\Yash_Portfolio_V2\\tmp_edge_overflow_check",
    "--window-size=320,740",
    "--dump-dom",
    url
]
res = subprocess.run(cmd, capture_output=True, text=True)
print("320px DOM length:", len(res.stdout))
print("Contains overflow indicators:", "scrollWidth" in res.stdout)
