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
(1, 'announcement', 2, 'sect_announcement'),
(1, 'review', 3, 'sect_review'),
(1, 'sites', 4, 'sect_sites'),
(1, 'contact_info', 5, 'sect_contact_info');



-- Sections (About)
INSERT INTO sections (page_id, section_key, order_index, layout_id) VALUES
(2, 'about', 1, 'default');


-- Blocks (Home → Hero)
INSERT INTO blocks (section_id, block_type, content, lang, order_index) VALUES
(1, 'title', 'Into the bluest depths and towards newfound adventure!', 'en', 1),
(1, 'cta', 'Dive In', 'en', 2),
(1, 'text', '... and join our community of passionate divers.', 'en', 3),
(1, 'image', 'https://www.deepbluedivecenter.com/wp-content/uploads/Woman-Scuba-Diving-.png', 'en', 4),
(2, 'title', 'Announcement', 'en', 1),
(2, 'text', 'Book your next diving adventure with us and get 20% off!', 'en', 2),
(2, 'image', 'https://www.deepbluedivecenter.com/wp-content/uploads/Woman-Scuba-Diving-.png', 'en', 3),
(3, 'placeholder', 'reviews', '-', 1),
(4, 'title', 'Top Diving Sites', 'en', 1),
(4, 'placeholder', 'map', 'en', 2),
(5, 'title', 'Contact Us', 'en', 1),
(5, 'text', 'Email: mustafabilyaz@gmail.com', 'en', 2),
(5, 'text', 'Phone: +1234567890', 'en', 3),
(5, 'text', 'Address: 123 Ocean Drive, Dive City', 'en', 4);

