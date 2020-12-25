DROP DATABASE products_list;

CREATE Database products_list;
use products_list;

DROP TABLE IF EXISTS PRODUCT;
CREATE TABLE IF NOT EXISTS PRODUCT(
    ID INTEGER auto_increment  PRIMARY KEY , 
    PRODUCT_NAME VARCHAR(250), 
    PRODUCT_DESCRIPTION VARCHAR(250), 
    PRODUCT_PRICE FLOAT
);
INSERT INTO PRODUCT(
    PRODUCT_NAME,
    PRODUCT_DESCRIPTION,
    PRODUCT_PRICE
) VALUES(
    'Product Name 1',
    'Product Description 1',
    132.5
),
(
    'Product Name 2',
    'Product Description 2',
    152.65
),
(
    'Product Name 3',
    'Product Description 3',
    192.5
),
(
    'Product Name 4',
    'Product Description 4',
    170.25
),
(
    'Product Name 5',
    'Product Description 5',
    125.55
),
(
    'Product Name 6',
    'Product Description 6',
    172.5
),
(
    'Product Name 7',
    'Product Description 7',
    182.5
),
(
    'Product Name 8',
    'Product Description 8',
    181.55
),
(
    'Product Name 9',
    'Product Description 9',
    192.25
),
(
    'Product Name 10',
    'Product Description 10',
    130.5
),
(
    'Product Name 11',
    'Product Description 11',
    131.5
),
(
    'Product Name 12',
    'Product Description 12',
    182.5
),
(
    'Product Name 13',
    'Product Description 13',
    290.35
),
(
    'Product Name 14',
    'Product Description 14',
    280.5
),
(
    'Product Name 15',
    'Product Description 15',
    220.25
),
(
    'Product Name 16',
    'Product Description 16',
    130.5
),
(
    'Product Name 17',
    'Product Description 17',
    192.75
),
(
    'Product Name 18',
    'Product Description 18',
    182.5
),
(
    'Product Name 19',
    'Product Description 19',
    322.5
),
(
    'Product Name 20',
    'Product Description 20',
    260.5
),
(
    'Product Name 21',
    'Product Description 21',
    382.5
),
(
    'Product Name 22',
    'Product Description 22',
    380.5
),
(
    'Product Name 23',
    'Product Description 23',
    332.5
),
(
    'Product Name 24',
    'Product Description 24',
    280.5
),
(
    'Product Name 25',
    'Product Description 25',
    380.5
),
(
    'Product Name 26',
    'Product Description 26',
    132.5
),
(
    'Product Name 27',
    'Product Description 27',
    332.5
),
(
    'Product Name 28',
    'Product Description 28',
    280.5
),
(
    'Product Name 29',
    'Product Description 29',
    380.5
),
(
    'Product Name 30',
    'Product Description 30',
    132.5
),
(
    'Product Name 31',
    'Product Description 31',
    332.5
),
(
    'Product Name 32',
    'Product Description 32',
    352.65
),
(
    'Product Name 33',
    'Product Description 33',
    492.5
),
(
    'Product Name 34',
    'Product Description 34',
    160.25
),
(
    'Product Name 35',
    'Product Description 35',
    165.55
),
(
    'Product Name 36',
    'Product Description 36',
    272.5
),
(
    'Product Name 37',
    'Product Description 37',
    282.5
),
(
    'Product Name 38',
    'Product Description 38',
    281.55
),
(
    'Product Name 39',
    'Product Description 39',
    292.25
),
(
    'Product Name 40',
    'Product Description 40',
    230.5
)
