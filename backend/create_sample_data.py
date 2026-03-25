#!/usr/bin/env python
"""create_sample_data.py - Create 50 sample products with suppliers"""

import os
import sys
import django
from decimal import Decimal

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

from products.models import Product, Category
from django.contrib.auth import get_user_model

User = get_user_model()

def create_sample_data():
    """Create sample categories, products, and suppliers"""
    
    print("🌾 Creating Annapurna Platform Sample Data...")
    
    # Create categories
    categories_data = [
        {"name": "Organic Grains", "description": "Premium organic grains from Himalayan farms"},
        {"name": "Spices & Herbs", "description": "Authentic Nepalese spices and herbs"},
        {"name": "Dairy Products", "description": "Fresh dairy products from local farms"},
        {"name": "Honey & Sweeteners", "description": "Natural honey and traditional sweeteners"},
        {"name": "Tea & Beverages", "description": "Premium teas and traditional beverages"},
        {"name": "Handicrafts", "description": "Traditional Nepalese handicrafts and textiles"},
        {"name": "Health & Wellness", "description": "Natural health products and supplements"},
        {"name": "Snacks & Sweets", "description": "Traditional Nepalese snacks and sweets"},
    ]
    
    categories = {}
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data["name"],
            defaults={"description": cat_data["description"]}
        )
        categories[category.name] = category
        print(f"✅ {'Created' if created else 'Found'} category: {category.name}")
    
    # Sample suppliers (as users)
    suppliers_data = [
        {"name": "Himalayan Organic Farms", "email": "himalayan@annapurna.com", "location": "Pokhara"},
        {"name": "Kathmandu Spice Traders", "email": "spices@annapurna.com", "location": "Kathmandu"},
        {"name": "Mountain Dairy Co-op", "email": "dairy@annapurna.com", "location": "Lalitpur"},
        {"name": "Everest Honey Collective", "email": "honey@annapurna.com", "location": "Bhaktapur"},
        {"name": "Traditional Artisans Guild", "email": "artisans@annapurna.com", "location": "Patan"},
        {"name": "Natural Wellness Nepal", "email": "wellness@annapurna.com", "location": "Kirtipur"},
        {"name": "Valley Tea Estates", "email": "tea@annapurna.com", "location": "Ilam"},
        {"name": "Mountain Sweet Makers", "email": "sweets@annapurna.com", "location": "Banepa"},
    ]
    
    suppliers = {}
    for supplier_data in suppliers_data:
        user, created = User.objects.get_or_create(
            email=supplier_data["email"],
            defaults={
                "full_name": supplier_data["name"],
                "role": "supplier",
                "is_active": True,
                "is_verified": True,
            }
        )
        suppliers[supplier_data["name"]] = user
        print(f"✅ {'Created' if created else 'Found'} supplier: {supplier_data['name']}")
    
    # Create 50 sample products
    products_data = [
        # Organic Grains (10 products)
        {"name": "Premium Basmati Rice", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 89.99, "description": "Extra long grain aromatic basmati rice from Terai region", "stock": 150},
        {"name": "Mountain Red Rice", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 75.50, "description": "Nutritious red rice harvested from mountain terraces", "stock": 120},
        {"name": "Organic Millet Mix", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 45.99, "description": "Traditional millet blend rich in nutrients", "stock": 200},
        {"name": "Himalayan Buckwheat", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 62.75, "description": "High-altitude buckwheat, perfect for dhido", "stock": 80},
        {"name": "Organic Corn Flour", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 35.99, "description": "Stone-ground organic corn flour", "stock": 180},
        {"name": "Premium Wheat Flour", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 42.50, "description": "Organic whole wheat flour from local farms", "stock": 160},
        {"name": "Barley Grain", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 38.75, "description": "High-quality barley for traditional recipes", "stock": 140},
        {"name": "Quinoa Supergrain", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 125.99, "description": "Premium quinoa grown in mountain regions", "stock": 60},
        {"name": "Organic Oats", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 48.25, "description": "Rolled oats perfect for healthy breakfast", "stock": 100},
        {"name": "Ragi (Finger Millet)", "category": "Organic Grains", "supplier": "Himalayan Organic Farms", "price": 55.50, "description": "Traditional finger millet rich in calcium", "stock": 90},
        
        # Spices & Herbs (8 products)
        {"name": "Timur Pepper", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 28.99, "description": "Himalayan Sichuan pepper with unique citrus flavor", "stock": 75},
        {"name": "Organic Turmeric Powder", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 18.75, "description": "Pure organic turmeric powder from Terai", "stock": 120},
        {"name": "Cardamom Premium", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 45.99, "description": "Large green cardamom pods from Ilam", "stock": 50},
        {"name": "Cumin Seeds", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 15.50, "description": "Aromatic cumin seeds, sun-dried", "stock": 200},
        {"name": "Coriander Powder", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 12.99, "description": "Fresh coriander powder, ground daily", "stock": 150},
        {"name": "Mustard Seeds", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 22.75, "description": "Black mustard seeds for pickling", "stock": 80},
        {"name": "Fenugreek Seeds", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 19.99, "description": "Medicinal fenugreek seeds", "stock": 100},
        {"name": "Bay Leaves", "category": "Spices & Herbs", "supplier": "Kathmandu Spice Traders", "price": 8.99, "description": "Dried bay leaves for aromatic cooking", "stock": 180},
        
        # Dairy Products (6 products)
        {"name": "Organic Ghee", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 35.99, "description": "Pure clarified butter from grass-fed cows", "stock": 60},
        {"name": "Mountain Cheese", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 28.50, "description": "Artisanal cheese from highland cows", "stock": 40},
        {"name": "Fresh Yogurt", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 12.99, "description": "Traditional set yogurt in clay pots", "stock": 30},
        {"name": "Butter Salted", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 18.75, "description": "Salted butter from cream", "stock": 50},
        {"name": "Cottage Cheese", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 15.99, "description": "Fresh paneer made daily", "stock": 45},
        {"name": "Milk Powder", "category": "Dairy Products", "supplier": "Mountain Dairy Co-op", "price": 42.99, "description": "Full cream milk powder", "stock": 80},
        
        # Honey & Sweeteners (5 products)
        {"name": "Himalayan Wild Honey", "category": "Honey & Sweeteners", "supplier": "Everest Honey Collective", "price": 38.99, "description": "Wild honey from high-altitude flowers", "stock": 35},
        {"name": "Mustard Honey", "category": "Honey & Sweeteners", "supplier": "Everest Honey Collective", "price": 42.50, "description": "Unique honey from mustard flowers", "stock": 25},
        {"name": "Jaggery Blocks", "category": "Honey & Sweeteners", "supplier": "Mountain Sweet Makers", "price": 15.99, "description": "Traditional cane jaggery blocks", "stock": 100},
        {"name": "Sugar Cane Syrup", "category": "Honey & Sweeteners", "supplier": "Mountain Sweet Makers", "price": 18.75, "description": "Pure sugar cane syrup", "stock": 60},
        {"name": "Multiflora Honey", "category": "Honey & Sweeteners", "supplier": "Everest Honey Collective", "price": 35.50, "description": "Blend of seasonal flowers honey", "stock": 40},
        
        # Tea & Beverages (6 products)
        {"name": "Ilam Black Tea", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 25.99, "description": "Premium black tea from Ilam gardens", "stock": 80},
        {"name": "Green Tea Premium", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 32.50, "description": "Organic green tea leaves", "stock": 70},
        {"name": "Masala Tea Blend", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 28.75, "description": "Traditional spiced tea blend", "stock": 90},
        {"name": "White Tea Rare", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 45.99, "description": "Rare white tea buds", "stock": 30},
        {"name": "Oolong Tea", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 38.75, "description": "Semi-fermented oolong tea", "stock": 50},
        {"name": "Herbal Tea Mix", "category": "Tea & Beverages", "supplier": "Valley Tea Estates", "price": 22.99, "description": "Medicinal herbal tea blend", "stock": 110},
        
        # Handicrafts (5 products)
        {"name": "Pashmina Shawl", "category": "Handicrafts", "supplier": "Traditional Artisans Guild", "price": 125.99, "description": "Hand-woven pashmina shawl", "stock": 20},
        {"name": "Thangka Painting", "category": "Handicrafts", "supplier": "Traditional Artisans Guild", "price": 285.50, "description": "Traditional Buddhist thangka painting", "stock": 10},
        {"name": "Khukuri Knife", "category": "Handicrafts", "supplier": "Traditional Artisans Guild", "price": 75.99, "description": "Traditional Gurkha khukuri knife", "stock": 15},
        {"name": "Singing Bowl", "category": "Handicrafts", "supplier": "Traditional Artisans Guild", "price": 45.75, "description": "Meditation singing bowl", "stock": 25},
        {"name": "Prayer Flags Set", "category": "Handicrafts", "supplier": "Traditional Artisans Guild", "price": 28.99, "description": "Traditional prayer flags set", "stock": 40},
        
        # Health & Wellness (5 products)
        {"name": "Shilajit Resin", "category": "Health & Wellness", "supplier": "Natural Wellness Nepal", "price": 125.99, "description": "Pure Himalayan shilajit resin", "stock": 20},
        {"name": "Tulsi Holy Basil", "category": "Health & Wellness", "supplier": "Natural Wellness Nepal", "price": 18.99, "description": "Dried holy basil leaves", "stock": 60},
        {"name": "Ashwagandha Root", "category": "Health & Wellness", "supplier": "Natural Wellness Nepal", "price": 35.75, "description": "Premium ashwagandha root powder", "stock": 40},
        {"name": "Turmeric Capsules", "category": "Health & Wellness", "supplier": "Natural Wellness Nepal", "price": 28.50, "description": "Organic turmeric capsules", "stock": 80},
        {"name": "Neem Powder", "category": "Health & Wellness", "supplier": "Natural Wellness Nepal", "price": 22.99, "description": "Pure neem leaf powder", "stock": 70},
        
        # Snacks & Sweets (5 products)
        {"name": "Sel Roti Pack", "category": "Snacks & Sweets", "supplier": "Mountain Sweet Makers", "price": 12.99, "description": "Traditional sel roti sweet bread", "stock": 50},
        {"name": "Lakhamari", "category": "Snacks & Sweets", "supplier": "Mountain Sweet Makers", "price": 8.99, "description": "Crispy lakhamari sweets", "stock": 80},
        {"name": "Chiura Beaten Rice", "category": "Snacks & Sweets", "supplier": "Mountain Sweet Makers", "price": 6.99, "description": "Flattened beaten rice snack", "stock": 120},
        {"name": "Momo Sauce", "category": "Snacks & Sweets", "supplier": "Mountain Sweet Makers", "price": 15.50, "description": "Traditional momo dipping sauce", "stock": 90},
        {"name": "Achar Pickle Mix", "category": "Snacks & Sweets", "supplier": "Mountain Sweet Makers", "price": 18.75, "description": "Mixed vegetable pickle", "stock": 60},
    ]
    
    created_count = 0
    for i, product_data in enumerate(products_data, 1):
        category = categories[product_data["category"]]
        supplier = suppliers[product_data["supplier"]]
        
        product, created = Product.objects.get_or_create(
            name=product_data["name"],
            defaults={
                "category": category,
                "description": product_data["description"],
                "price": Decimal(str(product_data["price"])),
                "stock": product_data["stock"],
                "is_active": True,
                "is_featured": i <= 10,  # First 10 products are featured
                "slug": product_data["name"].lower().replace(" ", "-").replace("(", "").replace(")", ""),
            }
        )
        
        if created:
            created_count += 1
            print(f"✅ Created product {i}/50: {product.name} - ₹{product.price}")
        else:
            print(f"📦 Found product {i}/50: {product.name}")
    
    print(f"\n🎉 Successfully created {created_count} new products!")
    print(f"📊 Total products in database: {Product.objects.count()}")
    print(f"🏷️  Total categories: {Category.objects.count()}")
    print(f"👥 Total suppliers: {User.objects.filter(role='supplier').count()}")

if __name__ == "__main__":
    create_sample_data()
