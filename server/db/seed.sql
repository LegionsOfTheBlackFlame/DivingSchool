DELETE FROM blocks;
DELETE FROM sections;
DELETE FROM pages;

-- Pages
INSERT INTO pages (slug, title) VALUES
('home', 'Home Page'),
('about', 'About Us');

-- Sections (Home)
INSERT INTO sections ( page_id, section_key, order_index, layout_id) VALUES
(1,'hero', 1, 'sect_hero_split'),
(1, 'content', 2, 'sect_contact');


-- Sections (About)
INSERT INTO sections (page_id, section_key, order_index, layout_id) VALUES
(2, 'about', 1, 'default');


-- Blocks (Home → Hero)
INSERT INTO blocks (section_id, block_type, content, lang, order_index) VALUES
(1, 'title', 'Into the bluest depths and towards newfound adventure!', 'en', 1),
(1, 'cta', 'Dive In', 'en', 2),
(1, 'text', '... and join our community of passionate divers.', 'en', 3),
(1, 'image', 'https://www.deepbluedivecenter.com/wp-content/uploads/Woman-Scuba-Diving-.png', 'en', 4),
(2, 'title', 'Contact us', 'en', 1),
(2, 'text', 'Reach out regarding any questions:', 'en', 2);

-- Blocks (Home → Intro)
INSERT INTO blocks (section_id, block_type, content, lang, order_index) VALUES
(3, 'text', 'We offer world-class diving experiences.', 'en', 1);

-- Blocks (About → Hero)
INSERT INTO blocks (section_id, block_type, content, lang, order_index) VALUES
(3, 'text', 'Meet the people behind the masks', 'en', 2);