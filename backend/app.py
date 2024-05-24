from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import random

# Initializing flask app
app = Flask(__name__)
CORS(app)

# Goal for tmrw:
# Make test order objects and display them on cart page
# Vendor Page compeletion
server = "localhost:1433"
database = "EStore_Database"
username = "SA"
password = "Passw0rd???"

app.config['SQLALCHEMY_DATABASE_URI'] = f'mssql+pyodbc://{username}:{password}@{server}/{database}?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class WebsiteUser(db.Model):
    __tablename__ = 'WebsiteUser'

    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(120), nullable=False)
    Password = db.Column(db.String(120), nullable=False)
    Email = db.Column(db.String(120), nullable=False)
    isVendor = db.Column(db.Boolean, nullable=False)
    isCustomer = db.Column(db.Boolean, nullable=False)

class Vendor(db.Model):
    __tablename__ = 'Vendor'
    VendorID = db.Column(db.Integer, primary_key=True, autoincrement=False)

class Customer(db.Model):
    __tablename__ = 'Customer'

    CustomerID = db.Column(db.Integer, primary_key=True)
    Province = db.Column(db.String(50), nullable=False)
    City = db.Column(db.String(50), nullable=False)
    Address = db.Column(db.String(150), nullable=False)

class Product(db.Model):
    __tablename__ = 'Product'

    ProductID = db.Column(db.Integer, primary_key=True)
    Product_Type = db.Column(db.String(11), nullable=False, )
    Product_Name = db.Column(db.String(120), nullable=False)
    Brand = db.Column(db.String(50))
    Price = db.Column(db.Numeric(10, 2), nullable=False)
    Product_Description = db.Column(db.String)
    Stock = db.Column(db.Integer, nullable=False)
    Rating = db.Column(db.Integer, nullable=False)
    Image_url = db.Column(db.String(500), nullable=False)

    def to_json(self):
        return {
            'ProductID': self.ProductID,
            'Product_Type': self.Product_Type,
            'Product_Name': self.Product_Name,
            'Brand': self.Brand,
            'Price': float(self.Price),  # Convert to float for JSON compatibility
            'Product_Description': self.Product_Description,
            'Stock': self.Stock,
            'Rating': self.Rating,
            'Image_url': self.Image_url
        }        

class Cart(db.Model):
    __tablename__ = 'Cart'

    CartID = db.Column(db.Integer, primary_key=True)
    CustomerID = db.Column(db.Integer, db.ForeignKey('Customer.CustomerID'), nullable=False)
    Checkout_Time = db.Column(db.DateTime, nullable=False)
    Checkout_Balance = db.Column(db.Numeric(10, 2))

    # Relationship with Customer model
    customer = db.relationship('Customer', backref=db.backref('carts', lazy=True))

class Orders(db.Model):
    __tablename__ = 'Orders'

    CartID = db.Column(db.Integer, db.ForeignKey('Cart.CartID'), primary_key=True)
    ProductID = db.Column(db.Integer, db.ForeignKey('Product.ProductID'), primary_key=True)
    Quantity = db.Column(db.Integer, nullable=False)

    # Relationships
    cart = db.relationship('Cart', backref=db.backref('orders', lazy=True))
    product = db.relationship('Product', backref=db.backref('orders', lazy=True))

# Route for seeing a data
@app.route('/signup', methods = ['POST'])
def get_credentials():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    #print(f"Received: Name={name}, Email={email}, Password={password}")
    if WebsiteUser.query.filter_by(Email=email).first():
        print("Account Already Exists")
    else:
        new_user = WebsiteUser(Name=name, Email=email, Password=password, isVendor=True, isCustomer=True)
        db.session.add(new_user)
        db.session.commit()

        new_vendor = Vendor(VendorID=new_user.UserID)
        db.session.add(new_vendor)
        db.session.commit()

        # new_cart = Cart(CartID=random.randint(10000000000, 99999999999), CustomerID=CustomerID, Province=Province,
        #         City=City, Address=Address)
        # db.session.add(new_cart)
        # db.session.commit()

    # Respond to the client
    return jsonify({'message': 'Data received successfully'}), 200

@app.route('/login', methods=['GET'])
def check_credentials():
    email = request.args.get('email')
    password = request.args.get('password')
    try:
        password_from_db = WebsiteUser.query.filter_by(Email=email).first().Password
        if password == password_from_db:
            msg = True
        else:
            msg = False
    except AttributeError:
        msg = False
    finally:
        return jsonify({'message': msg}), 200
    
@app.route('/items', methods=['GET'])
def get_items():
    last_eight = Product.query.order_by(Product.ProductID.desc()).limit(8).all()
    return jsonify({'message': [e.to_json() for e in last_eight]}), 200

@app.route('/cacheProduct', methods=['GET'])
def get_product():
    print(request.args.get('ProductID'))
    selected_prod = Product.query.filter_by(ProductID=request.args.get('ProductID')).first()
    return selected_prod.to_json(), 200

@app.route('/addToCart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    ProductID = data.get("ProductID")
    CustomerID = data.get("CustomerID")
    Quantity = data.get("Quantity")

    #query to get CARTID via join
    CartID = db.session.query(Cart, Customer).join(Customer, Cart.CustomerID == Customer.CustomerID).filter(Cart.CustomerID == 6).first().CartID

    new_order = Orders(CartID=CartID, ProductID = ProductID, Quantity = Quantity)
    db.session.add(new_order)
    db.session.commit()
# Running app
if __name__ == '__main__':
    app.run(debug=True)