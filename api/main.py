import datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import mysql.connector
import uvicorn
import json
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_config = {
    "user": "uhhczpjjwxihfeow",
    "password": "poZCfmlofUeuvCnAERBX",
    "host": "bt4fgjruon3dlaapd0zb-mysql.services.clever-cloud.com",
    "database": "bt4fgjruon3dlaapd0zb"
}

class Product(BaseModel):
    id: int
    title: str
    description: str
    price: float
    discount_percentage: float
    rating: float
    stock: int
    brand: str
    category: str
    thumbnail: str

class ProductWithImages(BaseModel):
    id: int
    title: str
    description: str
    price: float
    discount_percentage: float
    rating: float
    stock: int
    brand: str
    category: str
    thumbnail: str
    images: List[str]

class SaleInput(BaseModel):
    product_id: int
    price: float

@app.get("/api/items", response_model=List[Product])
def get_items(q: Optional[str] = Query(None)):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM productos WHERE title LIKE %s OR description LIKE %s"
    cursor.execute(query, (f"%{q}%", f"%{q}%"))
    items = cursor.fetchall()
    conn.close()
    if not items:
        raise HTTPException(status_code=404, detail="No items found")
    return items

@app.get("/api/items/{item_id}", response_model=ProductWithImages)
def get_item(item_id: int):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM productos WHERE id = %s", (item_id,))
    item = cursor.fetchone()

    if not item:
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    cursor.execute("SELECT url FROM imagenes WHERE producto_id = %s", (item_id,))
    images = [row["url"] for row in cursor.fetchall()]

    # Agregar las imágenes al producto
    item["images"] = images
    conn.close()

    return item

@app.post("/api/addSale")
def add_sale(sale: SaleInput):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO ventas (producto_id, precio, fecha_venta) VALUES (%s, %s, %s)",
                       (sale.product_id, sale.price, datetime.datetime.now()))
        conn.commit()
        result = True
    except:
        conn.rollback()
        result = False
    finally:
        conn.close()
    return {"success": result}

@app.get("/api/sales")
def get_sales():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT ventas.id, ventas.precio, ventas.fecha_venta, 
               productos.title AS product_name, productos.description AS product_description, productos.thumbnail AS product_thumbnail
        FROM ventas
        JOIN productos ON ventas.producto_id = productos.id
    """)

    sales = cursor.fetchall()
    conn.close()

    if not sales:
        raise HTTPException(status_code=404, detail="No sales found")
    return sales


def load_database():
    with open('productos_json.json', 'r', encoding='utf-8') as file:
        products_data = json.load(file)

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    for product in products_data:
        producto_id = product['id']

        try:
            cursor.execute(
                """
                INSERT INTO productos (id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    producto_id,
                    product['title'],
                    product['description'],
                    product['price'],
                    product['discountPercentage'],
                    product['rating'],
                    product['stock'],
                    product['brand'],
                    product['category'],
                    product['thumbnail']
                )
            )
        except mysql.connector.Error as err:
            print(f"Error al insertar producto {producto_id}: {err}")

        for image_url in product['images']:
            try:
                cursor.execute(
                    "INSERT INTO imagenes (producto_id, url) VALUES (%s, %s)",
                    (producto_id, image_url)
                )
            except mysql.connector.Error as err:
                print(f"Error al insertar imagen para producto {producto_id}: {err}")


    conn.commit()
    print("Todas las imágenes se han insertado correctamente.")


if __name__ == "__main__":
    #load_database()
    uvicorn.run(app, host="0.0.0.0", port=8080)
