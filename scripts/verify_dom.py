import re

with open('rendered_dom_v4.html', 'rb') as f:
    raw = f.read()

try:
    content = raw.decode('utf-8')
except UnicodeDecodeError:
    content = raw.decode('utf-16')

checks = {
    'Email address (gawadyash32@gmail.com)': 'gawadyash32@gmail.com' in content,
    'Phone number (+91 93222 68479)': '+91 93222 68479' in content,
    'Phone tel link (tel:+919322268479)': 'tel:+919322268479' in content,
    'LinkedIn link': 'https://www.linkedin.com/in/yash-gawad' in content,
    'GitHub link': 'https://github.com/YashGawad' in content,
    'Send Email mailto': 'mailto:gawadyash32@gmail.com?subject=Portfolio%20Enquiry%20-%20Yash%20Gawad' in content,
    'Gmail compose URL': 'https://mail.google.com/mail/?view=cm' in content,
    'Form action (formsubmit.co)': 'https://formsubmit.co/gawadyash32@gmail.com' in content,
    'Form input name="name"': 'name="name"' in content,
    'Form input name="email"': 'name="email"' in content,
    'Form input name="subject"': 'name="subject"' in content,
    'Form textarea name="message"': 'name="message"' in content,
    'Form honeypot name="_honey"': 'name="_honey"' in content,
    'Form template name="_template"': 'name="_template"' in content,
    'Smart Electricals live URL': 'https://smart-electrical-heater.vercel.app/' in content,
    'Food Nutrition live URL': 'https://food-nutrition-estimator-three.vercel.app/' in content,
    'Food Nutrition github URL': 'https://github.com/YashGawad/food-nutrition-estimator' in content,
    'LocalCommerce live URL': 'https://localcommerce-pearl.vercel.app/' in content,
    'LocalCommerce github URL': 'https://github.com/YashGawad/localcommerce' in content,
    'Education: St. John': 'St. John' in content,
    'Education: Pravin Patil': 'Pravin Patil' in content,
    'Certification: Knowledge Gate': 'Knowledge Gate' in content,
    'Certification: KantaScript': 'KantaScript' in content,
    'Certification: IOFT': 'IOFT' in content,
}

print('=== DOM AUDIT RESULTS ===')
all_pass = True
for k, v in checks.items():
    status = 'PASS' if v else 'FAIL'
    if not v:
        all_pass = False
    print(f'{k}: {status}')

print('Overall status:', 'ALL PASS' if all_pass else 'SOME CHECKS FAILED')
