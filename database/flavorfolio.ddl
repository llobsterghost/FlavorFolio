DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(255),
            cooked_counter INT DEFAULT 0,
            stars DECIMAL(2, 1) DEFAULT 0.0 CHECK (stars >= 0 AND stars <= 5),
            preptime INT NOT NULL,
            difficulty_level VARCHAR(255) NOT NULL,
            type VARCHAR(255),
            ingredients TEXT NOT NULL,
            preparation TEXT NOT NULL
);


CREATE TABLE favourites (
        recipe_id INT PRIMARY KEY,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

