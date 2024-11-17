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

INSERT INTO products (
    id, name, description, ingredients, price, discount_percent, image_urls, stock_quantity, featured,
    nutritional_info, allergen_info, serving_suggestions, storage_instructions
) VALUES
('sourdough-loaf', 'Sourdough Loaf', 'A classic sourdough loaf with a crispy crust and chewy interior.', 'Flour, Water, Salt, Sourdough Starter', 5.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1664547606676-0a843bb498e7'], 50, true,
 'Calories: 150 per slice, Fat: 0.5g, Carbs: 30g, Protein: 5g', 'Contains: Gluten', 'Best served warm with a spread of butter.', 'Store in a paper bag at room temperature for up to 3 days.'),
('baguette', 'Baguette', 'A traditional French baguette, perfect for sandwiches or alongside soup.', 'Flour, Water, Salt, Yeast', 3.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1677686707023-9ac1e4f75a87'], 40, false,
 'Calories: 200 per piece, Fat: 1g, Carbs: 40g, Protein: 6g', 'Contains: Gluten', 'Great for sandwiches or dipped in olive oil.', 'Store in a paper bag at room temperature for up to 2 days.'),
('croissant', 'Croissant', 'Buttery and flaky croissants, freshly baked every morning.', 'Flour, Butter, Milk, Sugar, Yeast, Salt', 2.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1674562179816-04fda3958c12'], 60, true,
 'Calories: 250 per piece, Fat: 14g, Carbs: 27g, Protein: 5g', 'Contains: Gluten, Dairy', 'Enjoy warm, with or without a filling.', 'Store in an airtight container at room temperature for up to 2 days.'),
('chocolate-eclair', 'Chocolate Eclair', 'A rich and decadent eclair filled with vanilla cream and topped with chocolate.', 'Flour, Eggs, Butter, Chocolate, Cream', 3.99, 0.00, ARRAY['https://images.unsplash.com/photo-1613992258436-7d744cb20893'], 30, false,
 'Calories: 300 per piece, Fat: 18g, Carbs: 34g, Protein: 6g', 'Contains: Gluten, Dairy, Eggs', 'Best enjoyed fresh with a cup of coffee.', 'Keep refrigerated and consume within 2 days.'),
('vanilla-muffin', 'Vanilla Muffin', 'A soft and moist vanilla muffin, perfect with your morning coffee.', 'Flour, Sugar, Butter, Eggs, Vanilla Extract', 2.49, 0.00, ARRAY['https://images.unsplash.com/photo-1612009715317-595f87b5002a'], 70, false,
 'Calories: 220 per muffin, Fat: 10g, Carbs: 30g, Protein: 4g', 'Contains: Gluten, Dairy, Eggs', 'Perfect with your morning coffee or tea.', 'Store in an airtight container at room temperature for up to 3 days.'),
('blueberry-muffin', 'Blueberry Muffin', 'A delightful muffin loaded with fresh blueberries.', 'Flour, Sugar, Butter, Eggs, Blueberries', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1722251172903-cc8774501df7'], 65, true,
 'Calories: 240 per muffin, Fat: 12g, Carbs: 35g, Protein: 4g', 'Contains: Gluten, Dairy, Eggs', 'Enjoy with a dollop of butter or cream cheese.', 'Store in an airtight container at room temperature for up to 2 days.'),
('red-velvet-cake', 'Red Velvet Cake', 'A luxurious red velvet cake with cream cheese frosting.', 'Flour, Cocoa Powder, Buttermilk, Cream Cheese', 25.99, 10.00, ARRAY['https://plus.unsplash.com/premium_photo-1713920189785-48ef41e01824'], 20, true,
 'Calories: 400 per slice, Fat: 20g, Carbs: 50g, Protein: 6g', 'Contains: Gluten, Dairy, Eggs', 'Serve chilled with a glass of milk.', 'Keep refrigerated and consume within 5 days.'),
('wedding-cake', 'Wedding Cake', 'A beautiful multi-tiered cake for your special day.', 'Flour, Butter, Sugar, Eggs, Fondant', 150.00, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675720060105-ba50ca9e21a7'], 5, true,
 'Calories: 600 per slice, Fat: 25g, Carbs: 80g, Protein: 8g', 'Contains: Gluten, Dairy, Eggs', 'Best served at room temperature.', 'Keep refrigerated and consume within 7 days.'),
('birthday-cupcake', 'Birthday Cupcake', 'Colorful cupcakes perfect for any birthday celebration.', 'Flour, Sugar, Butter, Eggs, Food Coloring', 1.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1663839412209-77c3eba0cf59'], 100, false,
 'Calories: 180 per cupcake, Fat: 8g, Carbs: 24g, Protein: 2g', 'Contains: Gluten, Dairy, Eggs', 'Decorate with extra sprinkles for fun!', 'Store in an airtight container at room temperature for up to 3 days.'),
('chocolate-chip-cookie', 'Chocolate Chip Cookie', 'Chewy chocolate chip cookies with a crispy edge.', 'Flour, Butter, Sugar, Chocolate Chips', 1.49, 0.00, ARRAY['https://images.unsplash.com/photo-1621297075730-16b5bd8913cf'], 200, false,
 'Calories: 150 per cookie, Fat: 8g, Carbs: 20g, Protein: 2g', 'Contains: Gluten, Dairy', 'Great with a glass of milk.', 'Store in an airtight container for up to 5 days.'),
('macarons', 'Macarons', 'Delicate French macarons available in a variety of flavors.', 'Almond Flour, Egg Whites, Sugar, Food Coloring', 2.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675806021714-8f33e130a28a'], 50, true,
 'Calories: 100 per piece, Fat: 5g, Carbs: 12g, Protein: 2g', 'Contains: Nuts, Eggs', 'Enjoy as a light and elegant dessert.', 'Keep refrigerated and consume within 3 days.'),
('fruit-tart', 'Fruit Tart', 'A fresh fruit tart with a sweet pastry crust and creamy custard.', 'Flour, Butter, Sugar, Cream, Fresh Fruit', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1600477064324-92a31919ffd2'], 25, false,
 'Calories: 220 per slice, Fat: 12g, Carbs: 28g, Protein: 3g', 'Contains: Gluten, Dairy', 'Best served chilled with a drizzle of honey.', 'Keep refrigerated and consume within 2 days.'),
('cherry-pie', 'Cherry Pie', 'A classic cherry pie with a buttery, flaky crust.', 'Flour, Butter, Sugar, Cherries', 12.99, 5.00, ARRAY['https://plus.unsplash.com/premium_photo-1700072294825-f8d75b6fddbc'], 15, false,
 'Calories: 350 per slice, Fat: 15g, Carbs: 50g, Protein: 4g', 'Contains: Gluten, Dairy', 'Serve warm with a scoop of vanilla ice cream.', 'Keep refrigerated and consume within 4 days.'),
('pound-cake', 'Pound Cake', 'A dense and rich pound cake, perfect with tea or coffee.', 'Flour, Butter, Sugar, Eggs, Vanilla Extract', 6.99, 0.00, ARRAY['https://images.unsplash.com/photo-1534353875273-b5887cc1abf5'], 30, false,
 'Calories: 300 per slice, Fat: 15g, Carbs: 35g, Protein: 4g', 'Contains: Gluten, Dairy, Eggs', 'Pair with fresh berries and whipped cream.', 'Store in an airtight container for up to 5 days.'),
('lemon-bar', 'Lemon Bar', 'Tangy lemon bars with a sweet and buttery shortbread crust.', 'Flour, Butter, Sugar, Lemon Juice, Eggs', 3.49, 0.00, ARRAY['https://images.unsplash.com/photo-1528252941458-c1d19f902318'], 40, false,
 'Calories: 250 per piece, Fat: 10g, Carbs: 35g, Protein: 3g', 'Contains: Gluten, Dairy, Eggs', 'Enjoy with a dusting of powdered sugar.', 'Keep refrigerated and consume within 3 days.'),
('carrot-cake', 'Carrot Cake', 'Moist carrot cake with a creamy frosting, topped with walnuts.', 'Flour, Carrots, Walnuts, Cream Cheese', 18.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1714669899928-eb0b28430295'], 20, true,
 'Calories: 400 per slice, Fat: 20g, Carbs: 45g, Protein: 5g', 'Contains: Gluten, Dairy, Nuts, Eggs', 'Best served chilled or at room temperature.', 'Keep refrigerated and consume within 5 days.'),
('cinnamon-roll', 'Cinnamon Roll', 'Warm cinnamon rolls with a sweet cream cheese glaze.', 'Flour, Cinnamon, Sugar, Butter, Cream Cheese', 3.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1675871810408-db7e4e51b740'], 50, false,
 'Calories: 350 per roll, Fat: 15g, Carbs: 50g, Protein: 4g', 'Contains: Gluten, Dairy, Eggs', 'Enjoy warm for the best flavor.', 'Store in an airtight container for up to 3 days.'),
('pretzel', 'Pretzel', 'Soft and salty pretzels, perfect for a snack.', 'Flour, Water, Salt, Yeast', 1.99, 0.00, ARRAY['https://images.unsplash.com/photo-1509957879660-dd8846a0b43d'], 80, false,
 'Calories: 200 per pretzel, Fat: 2g, Carbs: 40g, Protein: 6g', 'Contains: Gluten', 'Dip in mustard or enjoy plain.', 'Store in a paper bag at room temperature for up to 2 days.'),
('chocolate-truffle', 'Chocolate Truffle', 'Decadent chocolate truffles, rich and smooth.', 'Chocolate, Cream, Cocoa Powder', 2.49, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1700072294901-bd776f350909'], 30, true,
 'Calories: 150 per truffle, Fat: 10g, Carbs: 15g, Protein: 2g', 'Contains: Dairy', 'Enjoy as a decadent dessert.', 'Keep refrigerated and consume within 5 days.'),
('pumpkin-pie', 'Pumpkin Pie', 'A spiced pumpkin pie, perfect for the holidays.', 'Pumpkin, Flour, Butter, Sugar, Spices', 14.99, 0.00, ARRAY['https://images.unsplash.com/photo-1637769712646-4dcd5b30092a'], 10, true,
 'Calories: 300 per slice, Fat: 12g, Carbs: 40g, Protein: 4g', 'Contains: Gluten, Dairy, Eggs', 'Serve chilled or warm with whipped cream.', 'Keep refrigerated and consume within 4 days.'),
('apple-strudel', 'Apple Strudel', 'A flaky pastry filled with spiced apples and raisins.', 'Flour, Apples, Sugar, Cinnamon, Raisins', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1657313938000-23c4322dbe22'], 25, false,
 'Calories: 250 per slice, Fat: 10g, Carbs: 35g, Protein: 3g', 'Contains: Gluten', 'Enjoy warm with a scoop of vanilla ice cream.', 'Keep refrigerated and consume within 3 days.'),
('raspberry-tart', 'Raspberry Tart', 'A delicate tart topped with fresh raspberries and glaze.', 'Flour, Butter, Sugar, Raspberries', 5.49, 0.00, ARRAY['https://images.unsplash.com/photo-1611338075094-a2926b902fc0'], 15, false,
 'Calories: 200 per tart, Fat: 10g, Carbs: 25g, Protein: 2g', 'Contains: Gluten, Dairy', 'Serve chilled for a refreshing treat.', 'Keep refrigerated and consume within 2 days.'),
('banana-bread', 'Banana Bread', 'Moist banana bread with a hint of cinnamon.', 'Bananas, Flour, Sugar, Butter, Cinnamon', 7.99, 0.00, ARRAY['https://images.unsplash.com/photo-1606101204735-85ad3a8bfd81'], 30, false,
 'Calories: 220 per slice, Fat: 8g, Carbs: 30g, Protein: 3g', 'Contains: Gluten, Dairy, Eggs', 'Best served warm with a spread of butter.', 'Store in an airtight container at room temperature for up to 3 days.'),
('vegan-brownie', 'Vegan Brownie', 'Rich and fudgy brownies made with plant-based ingredients.', 'Cocoa, Almond Milk, Flour, Sugar, Oil', 3.99, 0.00, ARRAY['https://images.unsplash.com/photo-1599320146195-0f5f509f16b4'], 40, true,
 'Calories: 180 per piece, Fat: 9g, Carbs: 24g, Protein: 2g', 'Contains: Nuts', 'Enjoy with a glass of almond milk.', 'Store in an airtight container for up to 4 days.'),
('gluten-free-cupcake', 'Gluten-Free Cupcake', 'Delicious gluten-free cupcakes with a creamy frosting.', 'Gluten-Free Flour, Sugar, Butter, Eggs', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd'], 30, false,
 'Calories: 150 per cupcake, Fat: 7g, Carbs: 20g, Protein: 2g', 'Contains: Dairy, Eggs', 'Decorate with fruit or enjoy plain.', 'Store in an airtight container for up to 3 days.'),
('birthday-cake', 'Birthday Cake', 'A fun and festive birthday cake with colorful sprinkles.', 'Flour, Butter, Sugar, Eggs, Sprinkles', 20.00, 5.00, ARRAY['https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8'], 10, true,
 'Calories: 400 per slice, Fat: 18g, Carbs: 50g, Protein: 6g', 'Contains: Gluten, Dairy, Eggs', 'Perfect for celebrations with a glass of milk.', 'Keep refrigerated and consume within 5 days.'),
('almond-croissant', 'Almond Croissant', 'Buttery croissants filled with rich almond paste.', 'Flour, Butter, Almond Paste, Sugar', 3.49, 0.00, ARRAY['https://images.unsplash.com/photo-1649542181703-33cc4f373b28'], 20, false,
 'Calories: 280 per piece, Fat: 15g, Carbs: 30g, Protein: 5g', 'Contains: Gluten, Dairy, Nuts', 'Enjoy warm with a dusting of powdered sugar.', 'Store in an airtight container for up to 2 days.'),
('mini-quiche', 'Mini Quiche', 'Savory mini quiches, perfect for breakfast or brunch.', 'Eggs, Cheese, Flour, Butter, Vegetables', 2.99, 0.00, ARRAY['https://images.unsplash.com/photo-1511896936-104afaf25887'], 50, false,
 'Calories: 180 per piece, Fat: 10g, Carbs: 15g, Protein: 7g', 'Contains: Gluten, Dairy, Eggs', 'Serve warm for the best flavor.', 'Keep refrigerated and consume within 3 days.'),
('focaccia', 'Focaccia', 'Italian focaccia bread with rosemary and sea salt.', 'Flour, Olive Oil, Salt, Rosemary', 4.99, 0.00, ARRAY['https://images.unsplash.com/photo-1711805064484-a77096f599a6'], 30, false,
 'Calories: 200 per slice, Fat: 8g, Carbs: 28g, Protein: 4g', 'Contains: Gluten', 'Dip in olive oil and balsamic vinegar.', 'Store in an airtight container for up to 3 days.'),
('easter-cookies', 'Easter Cookies', 'Colorful cookies decorated for the Easter holiday.', 'Flour, Sugar, Butter, Food Coloring', 1.99, 0.00, ARRAY['https://plus.unsplash.com/premium_photo-1710438379123-2d27dfd6a1b9'], 50, true,
 'Calories: 120 per cookie, Fat: 5g, Carbs: 18g, Protein: 1g', 'Contains: Gluten, Dairy', 'Perfect for holiday celebrations.', 'Store in an airtight container for up to 5 days.');

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

INSERT INTO users (id, first_name, last_name, email, password_hash, phone_number, address, city, country_code, role, created_at) VALUES
(100, 'Anh', 'Smith', 'anh.smith@example.com', 'hashed_password_1', '0123456789', '123 Main St', 'Hanoi', 'VN', 'user', now()),
(101, 'David', 'Nguyen', 'david.nguyen@example.com', 'hashed_password_2', '0987654321', '456 Elm St', 'Ho Chi Minh City', 'VN', 'user', now()),
(102, 'Emily', 'Tran', 'emily.tran@example.com', 'hashed_password_3', '0111222333', '789 Pine St', 'Da Nang', 'VN', 'user', now());

-- Inserting all product reviews for each product

-- Reviews for Sourdough Loaf
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('sourdough-loaf', 100, 5, 'The sourdough loaf held up beautifully for sandwiches and had the perfect crust-to-softness ratio.', now()),
('sourdough-loaf', 101, 4, 'A good loaf with a nice crust, though a bit too tangy for my preference.', now()),
('sourdough-loaf', 102, 5, 'We loved using this bread for avocado toast, absolutely delicious.', now()),
('sourdough-loaf', 100, 4, 'Great crust and chewy interior, but it dried out quickly if not stored properly.', now()),
('sourdough-loaf', 101, 5, 'Perfect for making grilled cheese sandwiches, the crust added a great texture.', now());

-- Reviews for Baguette
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('baguette', 102, 5, 'The baguette was fantastic for making bruschetta, perfect crunch!', now()),
('baguette', 100, 4, 'Good flavor but could have been a bit fluffier on the inside.', now()),
('baguette', 101, 5, 'Excellent for pairing with soups, the crust held up well without getting soggy.', now()),
('baguette', 102, 4, 'I enjoyed it with olive oil and balsamic vinegar, very authentic taste.', now()),
('baguette', 100, 5, 'Reminded me of the ones I had in France, great for charcuterie boards.', now());

-- Reviews for Croissant
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('croissant', 101, 5, 'The croissants were amazing with my morning coffee, so flaky and buttery.', now()),
('croissant', 102, 5, 'Perfectly baked with a rich buttery flavor, ideal for breakfast.', now()),
('croissant', 100, 4, 'Good, but a little too rich for my taste. Still paired well with jam.', now()),
('croissant', 101, 5, 'Best croissants I’ve had outside of Paris, my kids loved them.', now()),
('croissant', 102, 4, 'Great texture, but I prefer them warm right out of the oven.', now());

-- Reviews for Chocolate Eclair
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('chocolate-eclair', 100, 5, 'We ordered these for a birthday party, and they were a huge hit.', now()),
('chocolate-eclair', 101, 5, 'The cream filling was smooth and delicious, with the perfect amount of chocolate.', now()),
('chocolate-eclair', 102, 4, 'Very rich and decadent, great with a cup of tea.', now()),
('chocolate-eclair', 100, 5, 'Loved the contrast between the creamy filling and the chocolate topping.', now()),
('chocolate-eclair', 101, 4, 'Good overall, but could have used a bit more filling.', now());

-- Reviews for Vanilla Muffin
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('vanilla-muffin', 102, 5, 'Perfect with my morning coffee, soft and full of flavor.', now()),
('vanilla-muffin', 100, 4, 'A bit sweet for my taste but still very moist and fluffy.', now()),
('vanilla-muffin', 101, 5, 'The vanilla flavor was rich and authentic, loved it!', now()),
('vanilla-muffin', 102, 4, 'Great as a quick breakfast or snack, very satisfying.', now()),
('vanilla-muffin', 100, 5, 'Paired wonderfully with some fresh berries, a real treat.', now());

-- Reviews for Blueberry Muffin
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('blueberry-muffin', 101, 5, 'Loaded with fresh blueberries, perfect for a healthy snack.', now()),
('blueberry-muffin', 102, 5, 'Enjoyed with a dollop of cream cheese, highly recommend.', now()),
('blueberry-muffin', 100, 4, 'Very moist and flavorful, but I wish it had more blueberries.', now()),
('blueberry-muffin', 101, 5, 'Perfectly sweet and tangy, great for a mid-morning pick-me-up.', now()),
('blueberry-muffin', 102, 4, 'Delicious, but a bit crumbly compared to others I’ve tried.', now());

-- Reviews for Red Velvet Cake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('red-velvet-cake', 100, 5, 'We served this at a wedding reception, and everyone loved it.', now()),
('red-velvet-cake', 101, 5, 'Rich and decadent, the cream cheese frosting was perfect.', now()),
('red-velvet-cake', 102, 4, 'Very moist and flavorful, but a bit too sweet for my taste.', now()),
('red-velvet-cake', 100, 5, 'The texture was perfect, and the color was beautiful for events.', now()),
('red-velvet-cake', 101, 4, 'Great cake, but would have preferred a bit less frosting.', now());

-- Reviews for Wedding Cake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('wedding-cake', 102, 5, 'We ordered this for our wedding, and it looked and tasted amazing.', now()),
('wedding-cake', 100, 5, 'Beautiful design and delicious flavor, guests were impressed.', now()),
('wedding-cake', 101, 4, 'Stunning presentation, though a bit expensive.', now()),
('wedding-cake', 102, 5, 'The fondant was perfect, and the cake layers were moist.', now()),
('wedding-cake', 100, 4, 'Loved the flavor, but would have liked more customization options.', now());

-- Reviews for Birthday Cupcake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('birthday-cupcake', 101, 5, 'Perfect for birthday celebrations, the kids loved the colorful sprinkles.', now()),
('birthday-cupcake', 102, 5, 'Super moist and flavorful, a great party treat.', now()),
('birthday-cupcake', 100, 4, 'Fun and festive, but a bit too sweet for my liking.', now()),
('birthday-cupcake', 101, 5, 'Great for parties, and the frosting was spot on.', now()),
('birthday-cupcake', 102, 4, 'Loved the design and flavor, but could have used more variety.', now());

-- Reviews for Chocolate Chip Cookie
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('chocolate-chip-cookie', 100, 5, 'Chewy and delicious, just like homemade.', now()),
('chocolate-chip-cookie', 101, 5, 'Perfect with a glass of milk, highly recommend.', now()),
('chocolate-chip-cookie', 102, 4, 'Great flavor, but I prefer a crispier edge.', now()),
('chocolate-chip-cookie', 100, 5, 'Loved the generous chocolate chips, a real treat.', now()),
('chocolate-chip-cookie', 101, 4, 'Tasty, but could have been a bit more chewy in the middle.', now());

-- Reviews for Macarons
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('macarons', 102, 5, 'The best macarons I’ve had, delicate and flavorful.', now()),
('macarons', 100, 5, 'Perfect for a special occasion, great flavor variety.', now()),
('macarons', 101, 4, 'Lovely texture, but the flavors were a bit subtle.', now()),
('macarons', 102, 5, 'Great as a gift, the packaging was also very nice.', now()),
('macarons', 100, 4, 'Enjoyed them, but some were a bit too sweet for my taste.', now());

-- Reviews for Fruit Tart
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('fruit-tart', 101, 5, 'The perfect balance of sweet and tart, loved the fresh fruit.', now()),
('fruit-tart', 102, 5, 'Beautifully presented and delicious, great for a summer dessert.', now()),
('fruit-tart', 100, 4, 'Very tasty, but the crust was a bit too hard.', now()),
('fruit-tart', 101, 5, 'Refreshing and not overly sweet, loved it.', now()),
('fruit-tart', 102, 4, 'Great flavor, but would have liked more custard.', now());

-- Reviews for Cherry Pie
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('cherry-pie', 100, 5, 'Perfect for the holidays, everyone loved it.', now()),
('cherry-pie', 101, 5, 'Great flavor with just the right amount of tartness.', now()),
('cherry-pie', 102, 4, 'The crust was perfect, but the filling could have been thicker.', now()),
('cherry-pie', 100, 5, 'Loved it warm with a scoop of vanilla ice cream.', now()),
('cherry-pie', 101, 4, 'Tasty, but I prefer a sweeter filling.', now());

-- Reviews for Pound Cake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('pound-cake', 102, 5, 'Dense and flavorful, perfect with a cup of tea.', now()),
('pound-cake', 100, 5, 'Moist and rich, loved it with fresh berries.', now()),
('pound-cake', 101, 4, 'Delicious, but a bit heavy for my taste.', now()),
('pound-cake', 102, 5, 'Great texture and flavor, will buy again.', now()),
('pound-cake', 100, 4, 'Good, but could have used a touch more vanilla.', now());

-- Reviews for Lemon Bar
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('lemon-bar', 101, 5, 'Tangy and sweet, the perfect balance.', now()),
('lemon-bar', 102, 5, 'Loved the lemon flavor, great as a summer treat.', now()),
('lemon-bar', 100, 4, 'Very tasty, but the crust was a bit too thick.', now()),
('lemon-bar', 101, 5, 'Refreshing and not too sweet, highly recommend.', now()),
('lemon-bar', 102, 4, 'Good flavor, but a bit too tart for my preference.', now());

-- Reviews for Carrot Cake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('carrot-cake', 100, 5, 'Moist and full of flavor, the frosting was perfect.', now()),
('carrot-cake', 101, 5, 'Loved the walnuts on top, great texture.', now()),
('carrot-cake', 102, 4, 'Very tasty, but I prefer it with more spice.', now()),
('carrot-cake', 100, 5, 'Perfect for a family gathering, everyone enjoyed it.', now()),
('carrot-cake', 101, 4, 'Great cake, but the frosting was a bit too sweet.', now());

-- Reviews for Cinnamon Roll
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('cinnamon-roll', 102, 5, 'Warm and gooey, the cream cheese glaze was amazing.', now()),
('cinnamon-roll', 100, 5, 'Perfect for a Sunday brunch, very indulgent.', now()),
('cinnamon-roll', 101, 4, 'Delicious, but I wish there was more cinnamon filling.', now()),
('cinnamon-roll', 102, 5, 'Best when warm, loved every bite.', now()),
('cinnamon-roll', 100, 4, 'Very tasty, but a bit too rich for breakfast.', now());

-- Reviews for Pretzel
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('pretzel', 100, 5, 'Soft and salty, perfect with mustard.', now()),
('pretzel', 101, 5, 'Great snack, loved the chewy texture.', now()),
('pretzel', 102, 4, 'Tasty, but could have used a bit more salt.', now()),
('pretzel', 100, 5, 'Reminded me of pretzels in Germany, very authentic.', now()),
('pretzel', 101, 4, 'Good flavor, but a bit dry the next day.', now());

-- Reviews for Chocolate Truffle
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('chocolate-truffle', 102, 5, 'Rich and decadent, perfect for chocolate lovers.', now()),
('chocolate-truffle', 100, 5, 'Smooth and creamy, loved the cocoa dusting.', now()),
('chocolate-truffle', 101, 4, 'Very indulgent, but a bit too rich for me.', now()),
('chocolate-truffle', 102, 5, 'Great as a gift, beautifully packaged.', now()),
('chocolate-truffle', 100, 4, 'Good flavor, but I prefer a darker chocolate.', now());

-- Reviews for Pumpkin Pie
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('pumpkin-pie', 100, 5, 'Perfectly spiced, great for the holidays.', now()),
('pumpkin-pie', 101, 5, 'Loved it with a dollop of whipped cream.', now()),
('pumpkin-pie', 102, 4, 'Very tasty, but a bit too sweet for me.', now()),
('pumpkin-pie', 100, 5, 'Great texture and flavor, will buy again.', now()),
('pumpkin-pie', 101, 4, 'Delicious, but could have used more spice.', now());

-- Reviews for Apple Strudel
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('apple-strudel', 102, 5, 'Flaky and delicious, the apple filling was perfect.', now()),
('apple-strudel', 100, 5, 'Best served warm with ice cream, highly recommend.', now()),
('apple-strudel', 101, 4, 'Very tasty, but the pastry was a bit dry.', now()),
('apple-strudel', 102, 5, 'Reminded me of homemade strudel, loved it.', now()),
('apple-strudel', 100, 4, 'Great flavor, but could have used more raisins.', now());

-- Reviews for Raspberry Tart
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('raspberry-tart', 101, 5, 'Fresh and delicious, loved the raspberry glaze.', now()),
('raspberry-tart', 102, 5, 'Perfect for a summer dessert, very refreshing.', now()),
('raspberry-tart', 100, 4, 'Tasty, but the crust was a bit too hard.', now()),
('raspberry-tart', 101, 5, 'Beautiful presentation and great flavor.', now()),
('raspberry-tart', 102, 4, 'Good, but I wish it had more raspberries.', now());

-- Reviews for Banana Bread
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('banana-bread', 100, 5, 'Moist and flavorful, perfect with coffee.', now()),
('banana-bread', 101, 5, 'Great banana flavor, not too sweet.', now()),
('banana-bread', 102, 4, 'Very tasty, but a bit dense for my preference.', now()),
('banana-bread', 100, 5, 'Loved it warm with butter, very comforting.', now()),
('banana-bread', 101, 4, 'Good, but could have used more cinnamon.', now());

-- Reviews for Vegan Brownie
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('vegan-brownie', 102, 5, 'Rich and fudgy, you’d never guess it’s vegan.', now()),
('vegan-brownie', 100, 5, 'Perfect with almond milk, very indulgent.', now()),
('vegan-brownie', 101, 4, 'Great flavor, but a bit too dense for my liking.', now()),
('vegan-brownie', 102, 5, 'Loved it as a guilt-free dessert.', now()),
('vegan-brownie', 100, 4, 'Good, but could have used more chocolate chips.', now());

-- Reviews for Gluten-Free Cupcake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('gluten-free-cupcake', 101, 5, 'Moist and delicious, couldn’t tell it was gluten-free.', now()),
('gluten-free-cupcake', 102, 5, 'Perfect for those with dietary restrictions, very tasty.', now()),
('gluten-free-cupcake', 100, 4, 'Good flavor, but a bit crumbly.', now()),
('gluten-free-cupcake', 101, 5, 'Loved it with fresh fruit, highly recommend.', now()),
('gluten-free-cupcake', 102, 4, 'Great texture, but a bit too sweet for my taste.', now());

-- Reviews for Birthday Cake
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('birthday-cake', 100, 5, 'Perfect for a birthday celebration, everyone loved it.', now()),
('birthday-cake', 101, 5, 'The sprinkles made it so festive, great flavor.', now()),
('birthday-cake', 102, 4, 'Very tasty, but a bit too sweet for my preference.', now()),
('birthday-cake', 100, 5, 'Beautiful design and delicious, will order again.', now()),
('birthday-cake', 101, 4, 'Good cake, but the frosting was a bit too heavy.', now());

-- Reviews for Almond Croissant
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('almond-croissant', 102, 5, 'Rich and flavorful, the almond paste was perfect.', now()),
('almond-croissant', 100, 5, 'Great with my morning coffee, very indulgent.', now()),
('almond-croissant', 101, 4, 'Delicious, but a bit too sweet for my liking.', now()),
('almond-croissant', 102, 5, 'Loved the flaky texture and rich filling.', now()),
('almond-croissant', 100, 4, 'Good, but could have used more almond filling.', now());

-- Reviews for Mini Quiche
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('mini-quiche', 100, 5, 'Perfect for brunch, very flavorful.', now()),
('mini-quiche', 101, 5, 'Loved the savory flavor, great for a quick breakfast.', now()),
('mini-quiche', 102, 4, 'Tasty, but a bit dry when reheated.', now()),
('mini-quiche', 100, 5, 'Great as an appetizer, everyone enjoyed them.', now()),
('mini-quiche', 101, 4, 'Good flavor, but could have used more cheese.', now());

-- Reviews for Focaccia
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('focaccia', 102, 5, 'Soft and full of flavor, loved the rosemary.', now()),
('focaccia', 100, 5, 'Great for dipping in olive oil, very authentic.', now()),
('focaccia', 101, 4, 'Delicious, but a bit too salty.', now()),
('focaccia', 102, 5, 'Perfect with soup, will buy again.', now()),
('focaccia', 100, 4, 'Good, but could have used more olive oil.', now());

-- Reviews for Easter Cookies
INSERT INTO product_reviews (product_id, user_id, rating, comment, created_at) VALUES
('easter-cookies', 101, 5, 'Fun and festive, perfect for the holiday.', now()),
('easter-cookies', 102, 5, 'The kids loved decorating these, very tasty.', now()),
('easter-cookies', 100, 4, 'Good flavor, but a bit too sweet for me.', now()),
('easter-cookies', 101, 5, 'Great for parties, loved the colorful icing.', now()),
('easter-cookies', 102, 4, 'Very tasty, but could have used more variety.', now());
