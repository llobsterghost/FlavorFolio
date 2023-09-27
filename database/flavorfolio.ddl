DROP TABLE IF EXISTS favourite;
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
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


CREATE TABLE favourite (
        recipe_id VARCHAR(255) PRIMARY KEY NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);
