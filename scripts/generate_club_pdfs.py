from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
LOGO_PATH = ROOT / "Logo_Ved.jpg"

PAGE_W = 1240
PAGE_H = 1754
MARGIN = 88

BLUE = "#0d2f66"
CYAN = "#1ec8ff"
RED = "#d7263d"
GOLD = "#f2b705"
TEXT = "#0f172a"
MUTED = "#475569"
LIGHT = "#f7fbff"


def font(path, size, index=0):
    return ImageFont.truetype(str(path), size=size, index=index)


ARIAL = Path(r"C:\Windows\Fonts\arial.ttf")
ARIAL_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")
NIRMALA = Path(r"C:\Windows\Fonts\Nirmala.ttc")

FONT_REG = lambda s: font(ARIAL, s)
FONT_BOLD = lambda s: font(ARIAL_BOLD, s)
FONT_HI = lambda s: font(NIRMALA, s, index=0)


def wrap_text(draw, text, use_font, max_width):
    words = text.split()
    if not words:
        return [""]
    lines = []
    current = words[0]
    for word in words[1:]:
        trial = f"{current} {word}"
        if draw.textlength(trial, font=use_font) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def wrap_paragraph(draw, text, use_font, max_width):
    output = []
    for para in text.split("\n"):
        if not para.strip():
            output.append("")
            continue
        output.extend(wrap_text(draw, para.strip(), use_font, max_width))
    return output


def draw_multiline(draw, x, y, text, use_font, fill, max_width, line_gap=10):
    lines = wrap_paragraph(draw, text, use_font, max_width)
    bbox = draw.textbbox((0, 0), "Ay", font=use_font)
    line_h = bbox[3] - bbox[1]
    for line in lines:
        draw.text((x, y), line, font=use_font, fill=fill)
        y += line_h + line_gap
    return y


def draw_bullets(draw, x, y, items, use_font, fill, max_width, bullet_fill=CYAN, line_gap=9):
    bbox = draw.textbbox((0, 0), "Ay", font=use_font)
    line_h = bbox[3] - bbox[1]
    bullet_x = x
    text_x = x + 28
    for item in items:
        wrapped = wrap_text(draw, item, use_font, max_width - 28)
        draw.ellipse((bullet_x, y + 10, bullet_x + 10, y + 20), fill=bullet_fill)
        for i, line in enumerate(wrapped):
            draw.text((text_x, y), line, font=use_font, fill=fill)
            y += line_h + line_gap
        y += 8
    return y


def load_logo(size=160):
    logo = Image.open(LOGO_PATH).convert("RGB")
    logo = ImageOps.fit(logo, (size, size), method=Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(logo, (0, 0), mask)
    return out


LOGO = load_logo(150)


def base_page(page_no, total_pages, subtitle):
    page = Image.new("RGB", (PAGE_W, PAGE_H), LIGHT)
    draw = ImageDraw.Draw(page)

    draw.rounded_rectangle((40, 34, PAGE_W - 40, PAGE_H - 34), radius=42, outline="#d7e8f6", width=4)
    draw.rectangle((40, 34, PAGE_W - 40, 210), fill=BLUE)
    draw.ellipse((PAGE_W - 270, -45, PAGE_W + 70, 295), fill="#124389")
    draw.ellipse((PAGE_W - 140, 80, PAGE_W + 120, 340), fill="#0d244d")
    page.paste(LOGO, (70, 48), LOGO)

    draw.text((245, 64), "VEDANT CRICKET CLUB", font=FONT_BOLD(48), fill="white")
    draw.text((245, 124), subtitle, font=FONT_REG(24), fill="#c8edff")

    footer = f"Vedant Cricket Club  |  Page {page_no} of {total_pages}"
    draw.text((MARGIN, PAGE_H - 78), footer, font=FONT_REG(22), fill=MUTED)
    draw.text((PAGE_W - 470, PAGE_H - 78), "Nizamudinpura, Bhiti-Mau  |  9455051375", font=FONT_REG(22), fill=MUTED)
    return page, draw


def section_title(draw, y, title, accent=CYAN):
    draw.rounded_rectangle((MARGIN, y, MARGIN + 240, y + 8), radius=4, fill=accent)
    draw.text((MARGIN, y + 24), title, font=FONT_BOLD(34), fill=BLUE)
    return y + 86


def save_pdf(images, output_path):
    rgb_pages = [img.convert("RGB") for img in images]
    rgb_pages[0].save(output_path, save_all=True, append_images=rgb_pages[1:], resolution=150.0)


def academy_pages():
    pages = []
    total = 10

    # 1 Cover
    page, draw = base_page(1, total, "Academy Brochure 2026")
    draw.rectangle((60, 248, PAGE_W - 60, PAGE_H - 132), fill="#eef8ff")
    draw.rounded_rectangle((90, 280, PAGE_W - 90, PAGE_H - 164), radius=44, fill="white", outline="#dbeafe", width=3)
    draw.text((MARGIN, 350), "ACADEMY BROCHURE", font=FONT_BOLD(68), fill=BLUE)
    draw.text((MARGIN, 450), "Professional cricket coaching, athlete development, and", font=FONT_REG(34), fill=TEXT)
    draw.text((MARGIN, 500), "tournament-ready training under an energetic club environment.", font=FONT_REG(34), fill=TEXT)
    y = 620
    y = draw_bullets(draw, MARGIN, y, [
        "Coaching support inspired by former state-level cricket experience",
        "Personal training, group training, fitness, video analysis, and match awareness",
        "Pathway for district, state, national, and higher-level exposure"
    ], FONT_REG(28), TEXT, PAGE_W - (2 * MARGIN) - 40, bullet_fill=RED, line_gap=12)
    draw.rounded_rectangle((MARGIN, y + 30, PAGE_W - MARGIN, y + 240), radius=28, fill=BLUE)
    draw.text((MARGIN + 40, y + 70), "Venue: Nizamudinpura, Bhiti-Mau", font=FONT_BOLD(34), fill="white")
    draw.text((MARGIN + 40, y + 128), "Admission Helpline: 9455051375 / 9453300575", font=FONT_REG(28), fill="#d8f4ff")
    draw.text((MARGIN + 40, y + 176), "Email: vedantcricketckubmau@gmail.com", font=FONT_REG(28), fill="#d8f4ff")
    pages.append(page)

    # 2 About
    page, draw = base_page(2, total, "Club Identity and Academy Vision")
    y = section_title(draw, 270, "Who We Are")
    y = draw_multiline(draw, MARGIN, y, (
        "Vedant Cricket Club is built to encourage talent through disciplined cricket education, "
        "structured practice, and a competitive atmosphere that helps young players grow with confidence."
    ), FONT_REG(28), TEXT, PAGE_W - 2 * MARGIN, 12)
    y += 24
    y = section_title(draw, y, "Our Mission", accent=GOLD)
    y = draw_bullets(draw, MARGIN, y, [
        "Build strong cricket basics with modern technique and match understanding.",
        "Develop discipline, fitness, confidence, and game awareness in every trainee.",
        "Prepare players for competitive opportunities from local leagues to advanced selections.",
        "Create a positive academy culture focused on growth, respect, and effort."
    ], FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, bullet_fill=GOLD, line_gap=10)
    y += 16
    draw.rounded_rectangle((MARGIN, y, PAGE_W - MARGIN, y + 280), radius=30, fill="#e8f5ff")
    draw.text((MARGIN + 32, y + 30), "Brand Promise", font=FONT_BOLD(30), fill=BLUE)
    draw.text((MARGIN + 32, y + 86), "Believes in Encouraging the Talent", font=FONT_BOLD(36), fill=RED)
    draw.text((MARGIN + 32, y + 148), "Every session is designed to combine skill training with athlete discipline and tournament energy.", font=FONT_REG(27), fill=TEXT)
    pages.append(page)

    # 3 Programs
    page, draw = base_page(3, total, "Programs and Training Streams")
    y = section_title(draw, 270, "Programs Available")
    columns = [
        ("Cricket Foundation", [
            "Batting stance, grip, and footwork",
            "Bowling basics and action correction",
            "Fielding drills and catching routines",
            "Game rules and match awareness"
        ]),
        ("Performance Cricket", [
            "Net sessions with scenario practice",
            "Advanced batting against pace and spin",
            "Bowling plans, yorkers, and variations",
            "Pressure handling and match simulation"
        ]),
        ("Fitness and Athlete Prep", [
            "Warm-up and mobility routines",
            "Agility, speed, and reaction training",
            "Strength endurance for cricket movement",
            "Recovery and injury-prevention habits"
        ]),
    ]
    card_w = (PAGE_W - 2 * MARGIN - 36) // 2
    positions = [(MARGIN, y), (MARGIN + card_w + 36, y), (MARGIN, y + 420)]
    heights = [350, 350, 350]
    for (title, items), (x, top), h in zip(columns, positions, heights):
        draw.rounded_rectangle((x, top, x + card_w, top + h), radius=28, fill="white", outline="#dbeafe", width=3)
        draw.text((x + 24, top + 24), title, font=FONT_BOLD(30), fill=BLUE)
        draw_bullets(draw, x + 24, top + 86, items, FONT_REG(24), TEXT, card_w - 48, bullet_fill=CYAN, line_gap=8)
    draw.rounded_rectangle((MARGIN + card_w + 36, y + 420, MARGIN + 2 * card_w + 36, y + 770), radius=28, fill="#0f3d77")
    draw.text((MARGIN + card_w + 60, y + 450), "Suitable For", font=FONT_BOLD(30), fill="white")
    draw_bullets(draw, MARGIN + card_w + 60, y + 515, [
        "Beginners seeking structured coaching",
        "Competitive school and club cricketers",
        "Players targeting trials and tournament selection",
        "Students needing balanced fitness and cricket practice"
    ], FONT_REG(24), "#dcefff", card_w - 70, bullet_fill=GOLD, line_gap=8)
    pages.append(page)

    # 4 Coaching model
    page, draw = base_page(4, total, "Coaching Model")
    y = section_title(draw, 270, "How We Train")
    y = draw_bullets(draw, MARGIN, y, [
        "Assessment-based onboarding to understand the player's age, skill level, and immediate goals.",
        "Technical correction using repeat drills for batting, bowling, and fielding movement.",
        "Group practice balanced with individual observation and improvement notes.",
        "Video analysis support for selected batches to improve action and shot execution.",
        "Theory support to build cricket IQ, decision-making, and match temperament."
    ], FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, bullet_fill=RED, line_gap=10)
    y += 20
    draw.rounded_rectangle((MARGIN, y, PAGE_W - MARGIN, y + 310), radius=30, fill="#eefaff")
    draw.text((MARGIN + 28, y + 28), "Silent Features", font=FONT_BOLD(31), fill=BLUE)
    draw_bullets(draw, MARGIN + 28, y + 86, [
        "Personal training and group training",
        "Fitness programs and cricket conditioning",
        "Video analysis and skill-based review",
        "Special theory classes for skill development",
        "Domestic and international tours opportunity guidance",
        "Chance to play district, state, national, international, and county cricket"
    ], FONT_REG(25), TEXT, PAGE_W - 2 * MARGIN - 60, bullet_fill=CYAN, line_gap=8)
    pages.append(page)

    # 5 Training schedule
    page, draw = base_page(5, total, "Training Time and Session Planning")
    y = section_title(draw, 270, "Session Structure")
    card_w = (PAGE_W - 2 * MARGIN - 28) // 2
    left = (MARGIN, y, MARGIN + card_w, y + 480)
    right = (MARGIN + card_w + 28, y, PAGE_W - MARGIN, y + 480)
    for box, title, fill_color in [(left, "Morning Session", "#f2faff"), (right, "Evening Session", "#fff7ed")]:
        draw.rounded_rectangle(box, radius=28, fill=fill_color, outline="#dbeafe", width=3)
        draw.text((box[0] + 28, box[1] + 26), title, font=FONT_BOLD(31), fill=BLUE)
    draw_bullets(draw, left[0] + 28, left[1] + 90, [
        "Warm-up and movement activation",
        "Skill stations for batting, bowling, and fielding",
        "Fitness and coordination segment",
        "Focused nets for technical repetition"
    ], FONT_REG(24), TEXT, card_w - 56, bullet_fill=CYAN, line_gap=7)
    draw_bullets(draw, right[0] + 28, right[1] + 90, [
        "Match scenarios and net pressure routines",
        "Specialized role sessions for batters and bowlers",
        "Throwdowns, catching, and game finishing drills",
        "Cool-down and performance feedback"
    ], FONT_REG(24), TEXT, card_w - 56, bullet_fill=RED, line_gap=7)
    y += 540
    y = section_title(draw, y, "Recommended Routine", accent=RED)
    draw_multiline(draw, MARGIN, y, (
        "Players are encouraged to maintain attendance discipline, hydration, personal kit readiness, "
        "and recovery habits. Dedicated batch timing can be adjusted seasonally based on tournament workload."
    ), FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, 12)
    pages.append(page)

    # 6 Facilities
    page, draw = base_page(6, total, "Facilities and Practice Environment")
    y = section_title(draw, 270, "Practice Environment")
    card_h = 240
    facility_cards = [
        ("Net Practice", "Structured net training for batting, bowling, and match scenarios."),
        ("Fielding Zone", "Reaction work, catching technique, ground fielding, and throwing drills."),
        ("Fitness Corner", "Mobility, agility, body control, and conditioning support."),
        ("Video Review", "Selected session analysis to improve posture, release, and shot flow."),
    ]
    for idx, (title, body) in enumerate(facility_cards):
        row = idx // 2
        col = idx % 2
        x = MARGIN + col * ((PAGE_W - 2 * MARGIN - 30) // 2 + 30)
        top = y + row * (card_h + 26)
        w = (PAGE_W - 2 * MARGIN - 30) // 2
        draw.rounded_rectangle((x, top, x + w, top + card_h), radius=28, fill="white", outline="#dbeafe", width=3)
        draw.text((x + 24, top + 22), title, font=FONT_BOLD(29), fill=BLUE)
        draw_multiline(draw, x + 24, top + 88, body, FONT_REG(24), TEXT, w - 48, 9)
    y = y + 2 * (card_h + 26) + 18
    draw.rounded_rectangle((MARGIN, y, PAGE_W - MARGIN, y + 240), radius=30, fill="#0f3d77")
    draw.text((MARGIN + 30, y + 30), "Why Families Prefer the Academy", font=FONT_BOLD(32), fill="white")
    draw_bullets(draw, MARGIN + 30, y + 95, [
        "Focused discipline with athlete-friendly supervision",
        "Goal-driven coaching with tournament awareness",
        "Balanced emphasis on skills, fitness, and confidence"
    ], FONT_REG(25), "#ddf1ff", PAGE_W - 2 * MARGIN - 60, bullet_fill=GOLD, line_gap=8)
    pages.append(page)

    # 7 Development pathway
    page, draw = base_page(7, total, "Player Growth Pathway")
    y = section_title(draw, 270, "Player Journey")
    steps = [
        ("Step 1", "Assessment and onboarding"),
        ("Step 2", "Foundation skill building"),
        ("Step 3", "Match routine and role clarity"),
        ("Step 4", "Competitive exposure and review"),
        ("Step 5", "Higher-level preparation"),
    ]
    step_w = PAGE_W - 2 * MARGIN
    current_y = y
    for label, body in steps:
        draw.rounded_rectangle((MARGIN, current_y, MARGIN + step_w, current_y + 120), radius=26, fill="white", outline="#dbeafe", width=3)
        draw.ellipse((MARGIN + 24, current_y + 26, MARGIN + 92, current_y + 94), fill=RED)
        draw.text((MARGIN + 44, current_y + 40), label[-1], font=FONT_BOLD(30), fill="white")
        draw.text((MARGIN + 122, current_y + 28), label, font=FONT_BOLD(28), fill=BLUE)
        draw.text((MARGIN + 122, current_y + 66), body, font=FONT_REG(24), fill=TEXT)
        current_y += 140
    draw_multiline(draw, MARGIN, current_y + 24, (
        "The academy aims to support players who want to improve steadily and remain prepared for school competitions, "
        "club matches, district opportunities, and performance-focused selections."
    ), FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, 11)
    pages.append(page)

    # 8 Parent support and discipline
    page, draw = base_page(8, total, "Discipline, Safety, and Parent Support")
    y = section_title(draw, 270, "Code of Growth")
    y = draw_bullets(draw, MARGIN, y, [
        "Players should report on time with proper kit and a positive training attitude.",
        "Respect for coaches, fellow trainees, equipment, and facility rules is mandatory.",
        "Attendance continuity helps maintain improvement and match readiness.",
        "Parents are encouraged to support rest, hydration, nutrition, and discipline at home.",
        "Any medical concern should be informed in advance for safer participation."
    ], FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, bullet_fill=CYAN, line_gap=10)
    y += 24
    draw.rounded_rectangle((MARGIN, y, PAGE_W - MARGIN, y + 320), radius=30, fill="#fff7ed", outline="#fed7aa", width=3)
    draw.text((MARGIN + 30, y + 30), "Support for Families", font=FONT_BOLD(31), fill="#9a3412")
    draw_bullets(draw, MARGIN + 30, y + 92, [
        "Simple admission process and batch guidance",
        "Clear communication for tournament and training updates",
        "Helpline support through call and WhatsApp",
        "Documents and brochure available for easy sharing"
    ], FONT_REG(25), TEXT, PAGE_W - 2 * MARGIN - 60, bullet_fill=GOLD, line_gap=8)
    pages.append(page)

    # 9 Admission
    page, draw = base_page(9, total, "Admission and Required Documents")
    y = section_title(draw, 270, "Admission Process")
    y = draw_bullets(draw, MARGIN, y, [
        "Choose the suitable sports category and preferred batch.",
        "Submit the admission form with student and guardian details.",
        "Share required identification and contact information.",
        "Confirm timing, fee structure, and starting date with academy support.",
        "Attend the first session with sports kit and readiness."
    ], FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN, bullet_fill=RED, line_gap=10)
    y += 20
    card_w = (PAGE_W - 2 * MARGIN - 26) // 2
    for i, (title, items) in enumerate([
        ("Required Details", [
            "Student name and date of birth",
            "Guardian name and mobile number",
            "Address and Aadhaar number",
            "Blood group and medical notes"
        ]),
        ("Useful Documents", [
            "Passport-size photo",
            "Basic identity proof",
            "Previous sports details if available",
            "Emergency contact information"
        ])
    ]):
        x = MARGIN + i * (card_w + 26)
        draw.rounded_rectangle((x, y, x + card_w, y + 300), radius=28, fill="white", outline="#dbeafe", width=3)
        draw.text((x + 24, y + 24), title, font=FONT_BOLD(30), fill=BLUE)
        draw_bullets(draw, x + 24, y + 86, items, FONT_REG(24), TEXT, card_w - 48, bullet_fill=CYAN, line_gap=7)
    pages.append(page)

    # 10 Contact
    page, draw = base_page(10, total, "Contact and Next Step")
    y = section_title(draw, 270, "Connect With Us")
    draw.rounded_rectangle((MARGIN, y, PAGE_W - MARGIN, y + 680), radius=34, fill="white", outline="#dbeafe", width=3)
    draw.text((MARGIN + 30, y + 30), "Vedant Cricket Club", font=FONT_BOLD(40), fill=BLUE)
    draw.text((MARGIN + 30, y + 96), "Nizamudinpura, Bhiti-Mau", font=FONT_REG(30), fill=TEXT)
    draw.text((MARGIN + 30, y + 150), "Mobiles: 9455051375 / 9453300575", font=FONT_REG(30), fill=TEXT)
    draw.text((MARGIN + 30, y + 204), "WhatsApp: 9455051375 / 9453300575", font=FONT_REG(30), fill=TEXT)
    draw.text((MARGIN + 30, y + 258), "Email: vedantcricketckubmau@gmail.com", font=FONT_REG(30), fill=TEXT)
    draw.text((MARGIN + 30, y + 338), "Why Join Now", font=FONT_BOLD(32), fill=RED)
    draw_bullets(draw, MARGIN + 30, y + 398, [
        "Admission open and athlete-friendly batch planning available",
        "Structured cricket learning with fitness and confidence development",
        "Supportive club environment with tournament-focused energy"
    ], FONT_REG(25), TEXT, PAGE_W - 2 * MARGIN - 60, bullet_fill=GOLD, line_gap=8)
    draw.rounded_rectangle((MARGIN + 30, y + 560, PAGE_W - MARGIN - 30, y + 640), radius=24, fill=BLUE)
    draw.text((MARGIN + 56, y + 586), "Get admission, begin training, and grow with the club.", font=FONT_BOLD(28), fill="white")
    pages.append(page)
    return pages


def bilingual_section(draw, top, english_title, english_items, hindi_title, hindi_items):
    section_w = (PAGE_W - 2 * MARGIN - 32) // 2
    left = (MARGIN, top, MARGIN + section_w, top + 560)
    right = (MARGIN + section_w + 32, top, PAGE_W - MARGIN, top + 560)
    for box in [left, right]:
        draw.rounded_rectangle(box, radius=28, fill="white", outline="#dbeafe", width=3)
    draw.text((left[0] + 24, left[1] + 22), english_title, font=FONT_BOLD(30), fill=BLUE)
    draw_bullets(draw, left[0] + 24, left[1] + 84, english_items, FONT_REG(24), TEXT, section_w - 48, bullet_fill=CYAN, line_gap=7)
    draw.text((right[0] + 24, right[1] + 22), hindi_title, font=FONT_HI(30), fill=BLUE)
    draw_bullets(draw, right[0] + 24, right[1] + 84, hindi_items, FONT_HI(24), TEXT, section_w - 48, bullet_fill=RED, line_gap=7)


def tournament_rule_pages():
    pages = []
    total = 5

    sections = [
        (
            "Tournament Rules 2026",
            "Official match, conduct, and reporting guidelines for Vedant Cricket Club Championship.",
            [
                "Venue: Nizamudinpura, Bhiti-Mau",
                "Organizer: Vedant Cricket Club",
                "Helpline: 9455051375 / 9453300575",
                "Email: vedantcricketckubmau@gmail.com"
            ]
        ),
        (
            "Registration and Eligibility",
            "Teams must complete the registration process properly before being accepted into the event.",
            [
                "Team registration must be completed before the official deadline.",
                "Only approved players listed by the team management will be allowed to play.",
                "Every player should carry a valid photo ID during reporting.",
                "The organizer may verify age, name, or player identity if required.",
                "Late or incomplete registration may be rejected by management.",
                "The organizing committee may refuse any entry in the interest of fair competition."
            ]
        ),
        (
            "Match Format and Reporting",
            "All teams should follow reporting, toss, and match-readiness instructions without delay.",
            [
                "Reporting time is 45 minutes before the scheduled match start.",
                "The toss should take place 20 minutes before the start of play.",
                "Standard format is 20 overs per side unless revised officially.",
                "Overs, interruptions, or revised conditions will be announced by management.",
                "Players must remain ready with proper dress and playing equipment.",
                "Delay from either team may lead to penalty or walkover."
            ]
        ),
        (
            "Discipline and Disputes",
            "Fair play and respect are mandatory for players, team officials, and support staff.",
            [
                "Umpire decisions will be treated as final and binding during the match.",
                "Abusive language, misconduct, or unfair play can lead to warning or disqualification.",
                "Team officials are expected to maintain discipline on and off the field.",
                "A written protest, if any, should be submitted within 30 minutes after the match.",
                "Management reserves the right to settle disputes in the interest of the tournament.",
                "Fair play and respect for opponents are mandatory throughout the event."
            ]
        ),
        (
            "Safety, Awards, and Final Notes",
            "Please stay updated and follow tournament communication for smooth conduct of the event.",
            [
                "Prize distribution and special awards will be announced by the organizers.",
                "Players should follow basic safety and hydration practices during the event.",
                "Weather or technical changes may affect schedule or match conditions.",
                "Teams are advised to stay connected with the official contact numbers for updates.",
                "Participation in the tournament means acceptance of these rules.",
                "The organizer reserves the right to make necessary changes for smooth conduct."
            ]
        ),
    ]

    for page_no, (title, intro, bullets) in enumerate(sections, start=1):
        page, draw = base_page(page_no, total, "Tournament Rules 2026")
        draw.rounded_rectangle((MARGIN, 286, PAGE_W - MARGIN, PAGE_H - 150), radius=34, fill="white", outline="#dbeafe", width=3)
        draw.text((MARGIN + 34, 340), title.upper() if page_no == 1 else title, font=FONT_BOLD(48 if page_no == 1 else 42), fill=BLUE)
        draw_multiline(draw, MARGIN + 34, 430, intro, FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN - 68, 10)
        draw.line((MARGIN + 34, 525, PAGE_W - MARGIN - 34, 525), fill="#dbeafe", width=3)
        draw_bullets(draw, MARGIN + 38, 570, bullets, FONT_REG(27), TEXT, PAGE_W - 2 * MARGIN - 76, bullet_fill=CYAN if page_no % 2 else RED, line_gap=9)

        if page_no == 5:
            draw.rounded_rectangle((MARGIN + 34, 1265, PAGE_W - MARGIN - 34, 1398), radius=22, fill="#eef8ff", outline="#dbeafe", width=2)
            draw.text((MARGIN + 60, 1306), "Contact", font=FONT_BOLD(28), fill=BLUE)
            draw.text((MARGIN + 60, 1356), "9455051375  |  9453300575  |  vedantcricketckubmau@gmail.com", font=FONT_REG(24), fill=TEXT)
        pages.append(page)
    return pages


def tournament_registration_form_pages():
    pages = []
    total = 1
    page, draw = base_page(1, total, "Tournament Registration Form 2026")
    draw.rounded_rectangle((MARGIN, 270, PAGE_W - MARGIN, PAGE_H - 150), radius=34, fill="white", outline="#dbeafe", width=3)
    draw.text((MARGIN + 34, 320), "TOURNAMENT REGISTRATION FORM", font=FONT_BOLD(44), fill=BLUE)
    draw.text((MARGIN + 34, 382), "Vedant Cricket Club Championship", font=FONT_REG(28), fill=TEXT)
    draw.text((PAGE_W - MARGIN - 210, 332), "Date: ____ / ____ / 20____", font=FONT_REG(22), fill=MUTED)

    def line_field(x, y, label, x_end, label_w=220):
        draw.text((x, y), label, font=FONT_REG(22), fill=TEXT)
        draw.line((x + label_w, y + 28, x_end, y + 28), fill="#94a3b8", width=2)

    def section_box(x, y, w, h, title):
        draw.rounded_rectangle((x, y, x + w, y + h), radius=20, outline="#bfdbfe", width=2, fill="#fbfdff")
        draw.text((x + 20, y + 16), title, font=FONT_BOLD(25), fill=BLUE)

    left_x = MARGIN + 34
    right_x = PAGE_W // 2 + 18
    box_w = 500

    section_box(left_x, 452, box_w, 248, "Team Details")
    line_field(left_x + 20, 512, "Team Name", left_x + box_w - 20)
    line_field(left_x + 20, 558, "Category", left_x + box_w - 20)
    line_field(left_x + 20, 604, "Captain Name", left_x + box_w - 20)
    line_field(left_x + 20, 650, "Manager / Coach", left_x + box_w - 20)

    section_box(right_x, 452, box_w, 248, "Contact Details")
    line_field(right_x + 20, 512, "Captain Mobile", right_x + box_w - 20)
    line_field(right_x + 20, 558, "Alternative Mobile", right_x + box_w - 20)
    line_field(right_x + 20, 604, "WhatsApp Number", right_x + box_w - 20)
    line_field(right_x + 20, 650, "Email ID", right_x + box_w - 20)

    section_box(left_x, 730, PAGE_W - 2 * MARGIN - 68, 214, "Address and Basic Information")
    line_field(left_x + 20, 790, "District / City", PAGE_W - MARGIN - 54, label_w=180)
    line_field(left_x + 20, 836, "Full Address", PAGE_W - MARGIN - 54, label_w=160)
    line_field(left_x + 20, 882, "ID Proof Reference", PAGE_W - MARGIN - 54, label_w=220)

    full_box_w = PAGE_W - 2 * MARGIN - 68
    right_bound = left_x + full_box_w - 24

    section_box(left_x, 972, full_box_w, 304, "Playing Squad")
    draw.text((left_x + 20, 1030), "Primary Squad", font=FONT_BOLD(21), fill=RED)
    draw.text((left_x + 590, 1030), "All Player Names", font=FONT_BOLD(21), fill=RED)
    draw.line((left_x + 550, 1016, left_x + 550, 1248), fill="#dbeafe", width=2)

    left_labels = ["1. Captain", "2. Vice Captain", "3. Player", "4. Player", "5. Player", "6. Player"]
    for idx, label in enumerate(left_labels):
        y = 1066 + idx * 32
        draw.text((left_x + 20, y), label, font=FONT_REG(21), fill=TEXT)
        draw.line((left_x + 160, y + 28, left_x + 520, y + 28), fill="#94a3b8", width=2)

    for idx in range(1, 8):
        y = 1066 + (idx - 1) * 32
        draw.text((left_x + 580, y), f"{idx}.", font=FONT_REG(21), fill=TEXT)
        draw.line((left_x + 620, y + 28, right_bound, y + 28), fill="#94a3b8", width=2)

    section_box(left_x, 1306, full_box_w, 124, "Declaration")
    draw_multiline(draw, left_x + 20, 1360, (
        "We confirm that the details given in this form are correct and our team agrees to follow all "
        "tournament rules, reporting instructions, and official decisions."
    ), FONT_REG(20), TEXT, full_box_w - 40, 6)

    sig_y = 1468
    for x, label in [
        (left_x + 20, "Captain Signature"),
        (left_x + 380, "Manager Signature"),
        (left_x + 700, "Seal / Date")
    ]:
        draw.line((x, sig_y, min(x + 220, right_bound), sig_y), fill="#94a3b8", width=2)
        draw.text((x, sig_y + 10), label, font=FONT_REG(20), fill=MUTED)

    footer_top = PAGE_H - 200
    draw.rounded_rectangle((MARGIN + 34, footer_top, PAGE_W - MARGIN - 34, PAGE_H - 128), radius=18, fill="#0f3d77")
    draw.text((MARGIN + 58, footer_top + 22), "Support: 9455051375 / 9453300575  |  vedantcricketckubmau@gmail.com", font=FONT_BOLD(22), fill="white")
    draw.text((MARGIN + 58, footer_top + 52), "Please submit this form with required details and documents.", font=FONT_REG(18), fill="#d8f4ff")
    pages.append(page)
    return pages


def main():
    DOCS.mkdir(exist_ok=True)
    academy_output = DOCS / "academy-brochure.pdf"
    rules_output = DOCS / "tournament-rules.pdf"
    registration_output = DOCS / "registration-form.pdf"
    save_pdf(academy_pages(), academy_output)
    save_pdf(tournament_rule_pages(), rules_output)
    save_pdf(tournament_registration_form_pages(), registration_output)
    print(f"Generated: {academy_output}")
    print(f"Generated: {rules_output}")
    print(f"Generated: {registration_output}")


if __name__ == "__main__":
    main()
