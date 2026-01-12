DELETE FROM blocks;
DELETE FROM sections;
DELETE FROM pages;

-- Pages
INSERT INTO pages (id, slug, title) VALUES
(1, 'home', 'Home Page'),
(2, 'about', 'About Us');

-- Sections (Home)
INSERT INTO sections ( page_id, key, order_index, layout_id) VALUES
(1, 'hero', 1, 'sect_hero_split'),
(1, 'content', 2, 'default');


-- Sections (About)
INSERT INTO sections (page_id, key, order_index, layout_id) VALUES
(2, 'hero', 1, 'default'),
(2, 'team', 2, 'default'),
(2, 'contact', 3, 'default');

-- Blocks (Home → Hero)
INSERT INTO blocks (section_id, type, content, lang, order_index) VALUES
(1, 'title', 'Welcome to Diving School', 'en', 1),
(1, 'text', 'Discover the underwater world with us', 'en', 2),
(1, 'image', 'https://www.deepbluedivecenter.com/wp-content/uploads/Woman-Scuba-Diving-.png', 'en', 3),
(2, 'title', 'Introduction', 'en', 1),
(2, 'text', 'We offer world-class diving experiences.', 'en', 2);

-- Blocks (Home → Intro)
INSERT INTO blocks (section_id, type, content, lang, order_index) VALUES
(2, 'text', 'We offer world-class diving experiences.', 'en', 1);

-- Blocks (About → Hero)
INSERT INTO blocks (section_id, type, content, lang, order_index) VALUES
(4, 'text', 'Meet the people behind the masks', 'en', 1);