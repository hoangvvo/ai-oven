INSERT INTO collections (id, name, description, image_url) VALUES
('artisan-bread', 'Artisan Bread', 'Discover our curated selection of artisan bread, each a masterpiece of flavor and craftsmanship.', 'https://images.unsplash.com/photo-1588870410947-895d92561635'),
('exquisite-pastries', 'Exquisite Pastries', 'Indulge in our exquisite pastries crafted with the finest ingredients and techniques.', 'https://plus.unsplash.com/premium_photo-1663133750605-97df74d9d3a2'),
('gourmet-cakes', 'Gourmet Cakes', 'Experience our gourmet cakes, each a masterpiece of flavor and design.', 'https://plus.unsplash.com/premium_photo-1661431015513-68ea7322097a'),
('weddings', 'Weddings', 'Elegant cakes and delicate pastries for your special day.', 'https://images.unsplash.com/photo-1559373098-e1caaccae791'),
('birthdays', 'Birthdays', 'Customized cakes and colorful treats to celebrate another year.', 'https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8'),
('corporate-events', 'Corporate Events', 'Sophisticated pastries and finger foods for professional gatherings.', 'https://plus.unsplash.com/premium_photo-1723867267202-169dfe3b197a'),
('holidays', 'Holidays', 'Seasonal specialties to make your festivities even sweeter.', 'https://images.unsplash.com/photo-1608906457945-eae8eecf31a5'),
('cookies', 'Cookies', 'Delicious, freshly baked cookies in a variety of flavors.', 'https://plus.unsplash.com/premium_photo-1672073871234-7f2de18b9e5d'),
('muffins', 'Muffins', 'Moist and flavorful muffins, perfect for breakfast or a snack.', 'https://images.unsplash.com/photo-1553990810-0af264b1defb'),
('tarts', 'Tarts', 'Sweet and savory tarts, crafted with delicate, flaky crusts.', 'https://images.unsplash.com/photo-1601227209842-1ef43c72fcba');

INSERT INTO products (id, name, description, ingredients, price, discount_percent, image_urls, stock_quantity, featured) VALUES
('sourdough-loaf', 'Sourdough Loaf', 'A classic sourdough loaf with a crispy crust and chewy interior.', 'Flour, Water, Salt, Sourdough Starter', 5.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1664547606676-0a843bb498e7'], 50, true),
('baguette', 'Baguette', 'A traditional French baguette, perfect for sandwiches or alongside soup.', 'Flour, Water, Salt, Yeast', 3.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1677686707023-9ac1e4f75a87'], 40, false),
('croissant', 'Croissant', 'Buttery and flaky croissants, freshly baked every morning.', 'Flour, Butter, Milk, Sugar, Yeast, Salt', 2.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1674562179816-04fda3958c12'], 60, true),
('chocolate-eclair', 'Chocolate Eclair', 'A rich and decadent eclair filled with vanilla cream and topped with chocolate.', 'Flour, Eggs, Butter, Chocolate, Cream', 3.99, 0.00, ARRAY['https://images.unsplash.com/photo-1613992258436-7d744cb20893'], 30, false),
('vanilla-muffin', 'Vanilla Muffin', 'A soft and moist vanilla muffin, perfect with your morning coffee.', 'Flour, Sugar, Butter, Eggs, Vanilla Extract', 2.49, 0.00, ARRAY['https://images.unsplash.com/photo-1612009715317-595f87b5002a'], 70, false),
('blueberry-muffin', 'Blueberry Muffin', 'A delightful muffin loaded with fresh blueberries.', 'Flour, Sugar, Butter, Eggs, Blueberries', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1722251172903-cc8774501df7'], 65, true),
('red-velvet-cake', 'Red Velvet Cake', 'A luxurious red velvet cake with cream cheese frosting.', 'Flour, Cocoa Powder, Buttermilk, Cream Cheese', 25.99, 10.00, ARRAY['https://plus.unsplash.com/premium_photo-1713920189785-48ef41e01824'], 20, true),
('wedding-cake', 'Wedding Cake', 'A beautiful multi-tiered cake for your special day.', 'Flour, Butter, Sugar, Eggs, Fondant', 150.00, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675720060105-ba50ca9e21a7'], 5, true),
('birthday-cupcake', 'Birthday Cupcake', 'Colorful cupcakes perfect for any birthday celebration.', 'Flour, Sugar, Butter, Eggs, Food Coloring', 1.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1663839412209-77c3eba0cf59'], 100, false),
('chocolate-chip-cookie', 'Chocolate Chip Cookie', 'Chewy chocolate chip cookies with a crispy edge.', 'Flour, Butter, Sugar, Chocolate Chips', 1.49, 0.00, ARRAY['https://images.unsplash.com/photo-1621297075730-16b5bd8913cf'], 200, false),
('macarons', 'Macarons', 'Delicate French macarons available in a variety of flavors.', 'Almond Flour, Egg Whites, Sugar, Food Coloring', 2.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675806021714-8f33e130a28a'], 50, true),
('fruit-tart', 'Fruit Tart', 'A fresh fruit tart with a sweet pastry crust and creamy custard.', 'Flour, Butter, Sugar, Cream, Fresh Fruit', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1600477064324-92a31919ffd2'], 25, false),
('cherry-pie', 'Cherry Pie', 'A classic cherry pie with a buttery, flaky crust.', 'Flour, Butter, Sugar, Cherries', 12.99, 5.00, ARRAY['https://plus.unsplash.com/premium_photo-1700072294825-f8d75b6fddbc'], 15, false),
('pound-cake', 'Pound Cake', 'A dense and rich pound cake, perfect with tea or coffee.', 'Flour, Butter, Sugar, Eggs, Vanilla Extract', 6.99, 0.00, ARRAY['https://images.unsplash.com/photo-1534353875273-b5887cc1abf5'], 30, false),
('lemon-bar', 'Lemon Bar', 'Tangy lemon bars with a sweet and buttery shortbread crust.', 'Flour, Butter, Sugar, Lemon Juice, Eggs', 3.49, 0.00, ARRAY['https://images.unsplash.com/photo-1528252941458-c1d19f902318'], 40, false),
('carrot-cake', 'Carrot Cake', 'Moist carrot cake with a creamy frosting, topped with walnuts.', 'Flour, Carrots, Walnuts, Cream Cheese', 18.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1714669899928-eb0b28430295'], 20, true),
('cinnamon-roll', 'Cinnamon Roll', 'Warm cinnamon rolls with a sweet cream cheese glaze.', 'Flour, Cinnamon, Sugar, Butter, Cream Cheese', 3.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675871810408-db7e4e51b740'], 50, false),
('pretzel', 'Pretzel', 'Soft and salty pretzels, perfect for a snack.', 'Flour, Water, Salt, Yeast', 1.99, 0.00, ARRAY['https://images.unsplash.com/photo-1509957879660-dd8846a0b43d'], 80, false),
('chocolate-truffle', 'Chocolate Truffle', 'Decadent chocolate truffles, rich and smooth.', 'Chocolate, Cream, Cocoa Powder', 2.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1700072294901-bd776f350909'], 30, true),
('pumpkin-pie', 'Pumpkin Pie', 'A spiced pumpkin pie, perfect for the holidays.', 'Pumpkin, Flour, Butter, Sugar, Spices', 14.99, 0.00, ARRAY['https://images.unsplash.com/photo-1637769712646-4dcd5b30092a'], 10, true),
('apple-strudel', 'Apple Strudel', 'A flaky pastry filled with spiced apples and raisins.', 'Flour, Apples, Sugar, Cinnamon, Raisins', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1657313938000-23c4322dbe22'], 25, false),
('raspberry-tart', 'Raspberry Tart', 'A delicate tart topped with fresh raspberries and glaze.', 'Flour, Butter, Sugar, Raspberries', 5.49, 0.00, ARRAY['https://images.unsplash.com/photo-1611338075094-a2926b902fc0'], 15, false),
('banana-bread', 'Banana Bread', 'Moist banana bread with a hint of cinnamon.', 'Bananas, Flour, Sugar, Butter, Cinnamon', 7.99, 0.00, ARRAY['https://images.unsplash.com/photo-1606101204735-85ad3a8bfd81'], 30, false),
('vegan-brownie', 'Vegan Brownie', 'Rich and fudgy brownies made with plant-based ingredients.', 'Cocoa, Almond Milk, Flour, Sugar, Oil', 3.99, 0.00, ARRAY['https://images.unsplash.com/photo-1599320146195-0f5f509f16b4'], 40, true),
('gluten-free-cupcake', 'Gluten-Free Cupcake', 'Delicious gluten-free cupcakes with a creamy frosting.', 'Gluten-Free Flour, Sugar, Butter, Eggs', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd'], 30, false),
('birthday-cake', 'Birthday Cake', 'A fun and festive birthday cake with colorful sprinkles.', 'Flour, Butter, Sugar, Eggs, Sprinkles', 20.00, 5.00, ARRAY['https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8'], 10, true),
('almond-croissant', 'Almond Croissant', 'Buttery croissants filled with rich almond paste.', 'Flour, Butter, Almond Paste, Sugar', 3.49, 0.00, ARRAY['https://images.unsplash.com/photo-1649542181703-33cc4f373b28'], 20, false),
('mini-quiche', 'Mini Quiche', 'Savory mini quiches, perfect for breakfast or brunch.', 'Eggs, Cheese, Flour, Butter, Vegetables', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1511896936-104afaf25887'], 50, false),
('focaccia', 'Focaccia', 'Italian focaccia bread with rosemary and sea salt.', 'Flour, Olive Oil, Salt, Rosemary', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1711805064484-a77096f599a6'], 30, false),
('easter-cookies', 'Easter Cookies', 'Colorful cookies decorated for the Easter holiday.', 'Flour, Sugar, Butter, Food Coloring', 1.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1710438379123-2d27dfd6a1b9'], 50, true);

-- Inserting data into the product_collections table
INSERT INTO product_collections (product_id, collection_id) VALUES
('sourdough-loaf', 'artisan-bread'),
('baguette', 'artisan-bread'),
('focaccia', 'artisan-bread'),

('croissant', 'exquisite-pastries'),
('chocolate-eclair', 'exquisite-pastries'),
('almond-croissant', 'exquisite-pastries'),

('red-velvet-cake', 'gourmet-cakes'),
('wedding-cake', 'gourmet-cakes'),
('birthday-cake', 'gourmet-cakes'),
('carrot-cake', 'gourmet-cakes'),

('chocolate-chip-cookie', 'cookies'),
('easter-cookies', 'cookies'),
('macarons', 'cookies'),

('vanilla-muffin', 'muffins'),
('blueberry-muffin', 'muffins'),

('fruit-tart', 'tarts'),
('raspberry-tart', 'tarts'),
('cherry-pie', 'tarts'),

('pumpkin-pie', 'holidays'),
('easter-cookies', 'holidays'),

('birthday-cupcake', 'birthdays'),
('birthday-cake', 'birthdays'),

('wedding-cake', 'weddings'),

('mini-quiche', 'corporate-events'),

('chocolate-truffle', 'exquisite-pastries'),
('lemon-bar', 'exquisite-pastries'),
('cinnamon-roll', 'exquisite-pastries'),
('apple-strudel', 'tarts'),
('banana-bread', 'artisan-bread'),
('vegan-brownie', 'exquisite-pastries'),
('gluten-free-cupcake', 'birthdays'),
('pretzel', 'artisan-bread');
