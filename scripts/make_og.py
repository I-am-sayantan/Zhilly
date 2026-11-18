# Link-preview image (public/og.jpg, 1200x630) and favicons (src/app/favicon.ico, icon.png, apple-icon.png).
# Same look as the Facebook cover (C:/projects/zhilly/scripts/make_fb_cover.py): cream paper, two tilted
# cottage prints, "Building Zhilly" in ink, a Caveat rust line. Reuses that repo's photo_edit helpers
# (fonts, grade) and reads its _import photos and assets read-only. Run: python scripts/make_og.py
import os, sys
ZHILLY = r'C:/projects/zhilly'
sys.path.insert(0, ZHILLY + '/scripts')
from PIL import Image, ImageDraw, ImageFilter, ImageOps
from photo_edit import CREAM, INK, RUST, P, font, load, grade

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
cv = Image.new('RGB', (W, H), CREAM)

def print_photo(src, box, angle):
    x0, y0, x1, y1 = box
    im = grade(load(src))
    im.thumbnail((x1 - x0 - 20, y1 - y0 - 20), Image.LANCZOS)
    im = ImageOps.expand(im, 10, fill=(251, 248, 239))  # white print border
    rot = im.convert('RGBA').rotate(angle, Image.BICUBIC, expand=True)
    x, y = x0 + (x1 - x0 - rot.width) // 2, y0 + (y1 - y0 - rot.height) // 2
    sh = Image.new('L', cv.size, 0); sh.paste(rot.getchannel('A').point(lambda v: v * 80 // 255), (x, y + 8))
    cv.paste((60, 50, 35), mask=sh.filter(ImageFilter.GaussianBlur(12)))
    cv.paste(rot, (x, y), rot)

print_photo(P + 'IMG_7324.HEIC', (20, 40, 400, 590), 2.5)     # tiny cottage, tall trees
print_photo(P + 'IMG_7310.HEIC', (800, 40, 1180, 590), -2.5)  # first look at the cottage

d = ImageDraw.Draw(cv)
cx, maxw = W // 2, 380
hf, sf = font('Nunito.ttf', 76, 900), font('Caveat.ttf', 46, 700)
for i, line in enumerate(['Building', 'Zhilly']):
    assert d.textlength(line, font=hf) < maxw, line
    d.text((cx, 170 + i * 86), line, font=hf, fill=INK, anchor='ma')
for i, line in enumerate(['a hostel and café', 'in the Kalimpong hills']):
    assert d.textlength(line, font=sf) < maxw, line
    d.text((cx, 370 + i * 50), line, font=sf, fill=RUST, anchor='ma')

og = os.path.join(HERE, 'public', 'og.jpg')
cv.save(og, quality=85, optimize=True, progressive=True)
assert os.path.getsize(og) < 300_000, os.path.getsize(og)

# favicons from the stamp logo, on cream so they read on dark tabs too
logo = Image.open(ZHILLY + '/assets/logo_transparent.png').convert('RGBA')
def on_cream(size, pad):
    bg = Image.new('RGBA', (size, size), CREAM + (255,))
    lg = logo.resize((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    bg.paste(lg, (pad, pad), lg)
    return bg.convert('RGB')
app = os.path.join(HERE, 'src', 'app')
on_cream(512, 16).save(os.path.join(app, 'icon.png'))
on_cream(180, 10).save(os.path.join(app, 'apple-icon.png'))
on_cream(256, 4).convert('RGBA').save(os.path.join(app, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
print(og, os.path.getsize(og))
