from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from sqlalchemy.orm import DeclarativeBase
import random
import inspect

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

    ProductID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Product_Type = db.Column(db.String(11), nullable=False, )
    Product_Name = db.Column(db.String(120), nullable=False)
    Brand = db.Column(db.String(50), nullable=True)
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
    user = 0
    try:
        password_from_db = WebsiteUser.query.filter_by(Email=email).first().Password
        user = WebsiteUser.query.filter_by(Email=email).first().UserID
        if password == password_from_db:
            msg = True
        else:
            msg = False
    except AttributeError:
        msg = False
    finally:
        return jsonify({'message': msg, 'user': user}), 200

@app.route('/getUser', methods=['GET'])
def get_user():
    UserID = request.args.get('UserID')
    user_name = WebsiteUser.query.filter_by(UserID=UserID).first().Name
    user_email = WebsiteUser.query.filter_by(UserID=UserID).first().Email
    return jsonify({"Name": user_name, "Email": user_email}), 200

@app.route('/items', methods=['GET'])
def get_items():
    query = request.args.get('query_type')
    query_results = []
    def dict_addition(dict, keys, values):
        for i in range(len(keys)):
            dict.update({keys[i]: values[i]})
        return dict
    if query == "Top 8":
        query_results = Product.query.order_by(Product.ProductID.desc()).limit(8).all()
        return jsonify({'message': [e.to_json() for e in query_results]}), 200
    elif query == "Cart Items":
        CustomerID = request.args.get('user')
        CartID = db.session.query(Cart).filter(Cart.CustomerID == CustomerID).first().CartID
        #sub_query = [q.ProductID for q in Orders.query.filter_by(CartID=CartID).all()]
        #print(sub_query)
        join_query = db.session.query(Product, Orders.Quantity).join(Orders, (Product.ProductID == Orders.ProductID)).filter_by(CartID=CartID).all()
        #print(join_query.filter(query.filter_by(ProductID=6).first()))
        #query_results = [Product.query.filter_by(ProductID=ProductID).first() for ProductID in sub_query]
        totalprice = sum([q[0].Price*q[1] for q in join_query])
        #print(query_results)
        return jsonify({'message': [dict_addition(e[0].to_json(), ['Quantity'], [e[1]]) for e in join_query],
                        'totalPrice': totalprice}), 200
    elif query == "All":
        query_results = Product.query.order_by(Product.ProductID).all()
        return jsonify({'message': [e.to_json() for e in query_results]}), 200
    
    elif query == "All+Quantity":
        join_query = db.session.query(Product, Orders.Quantity).join(Orders, (Product.ProductID == Orders.ProductID)).all()
        return jsonify({'message': [dict_addition(e[0].to_json(), ['Quantity'], [e[1]]) for e in join_query]}), 200
    
    elif query == "Orders":
        print("Getting ORders")
        results = db.session.query(
            WebsiteUser.Name,
            Product.Product_Name,
            Orders.Quantity,
            Product.Price,
            (Product.Price * Orders.Quantity).label('Sales_Profit')
        ).join(Cart, Cart.CustomerID == WebsiteUser.UserID
        ).join(Orders, Orders.CartID == Cart.CartID
        ).join(Product, Product.ProductID == Orders.ProductID
        ).all()
        #print([dict_addition({}, ['User', 'Product_Name', 'Quantity', 'Price'], res) for res in results])
        return  jsonify({"message":[dict_addition({}, ['User', 'Product_Name', 'Quantity', 'Price', 'Sales_Profit'], res) for res in results]}), 200

    elif query == "Search":
        search_string = request.args.get('search')
        keywords = search_string.split()
        products_found = []
        for keyword in keywords:
            product_query = db.session.query(Product).filter(
                or_(
                    Product.Product_Type.like(f'%{keyword}%'),
                    Product.Product_Name.like(f'%{keyword}%'),
                    Product.Brand.like(f'%{keyword}%')
                    )
                ).all()
            products_found += product_query
        return jsonify({'message': [e.to_json() for e in products_found]}), 200
        # return jsonify({'message': 'Search Query Returned'}), 200
    
    else:
        return jsonify({'message': 'Invalid Item Fetch Request'}), 200

@app.route('/addItem', methods=['POST'])
def add_to_products():
    data = request.get_json()
    brand = None
    if data.get("Brand") != "None":
        brand = data.get("Brand")    
    #print(round((data.get("Price")/100 * 100), 2))
    try:
        new_product = Product(
        Product_Type=data.get('Product_Type'),
        Product_Name = data.get('Product_Name'),
        Brand = brand,
        Price = round(float(data.get("Price")), 2),#round(float(data.get('Price')), 2),
        Product_Description = data.get('Product_Description'),
        Stock = int(data.get('Stock')),
        Rating = int(data.get('Rating')),
        Image_url = data.get('Image_url')
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'New product added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
    
@app.route('/cacheProduct', methods=['GET'])
def get_product():
    print(request.args.get('ProductID'))
    selected_prod = Product.query.filter_by(ProductID=request.args.get('ProductID')).first()
    return selected_prod.to_json(), 200

@app.route('/addToCart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    ProductID = data.get("data").get("ProductID")
    CustomerID = data.get("user")

    #query to get CARTID via join
    CartID = db.session.query(Cart).filter(Cart.CustomerID == CustomerID).first().CartID
    print(CartID, ProductID)

    new_order = Orders(CartID=CartID, ProductID = ProductID, Quantity = 1)
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"Msg": "Order entered in cart"})

@app.route('/removeFromCart', methods=['POST'])
def delete_from_cart():
    data = request.get_json()
    print(data)
    ProductID = data.get("ProductID")
    CustomerID = data.get("user")

    #query to get CARTID via join
    CartID = db.session.query(Cart).filter(Cart.CustomerID == CustomerID).first().CartID
    #print(CartID, ProductID)

    order_to_be_removed = db.session.query(Orders).filter(Orders.CartID == CartID,
                                                          Orders.ProductID == ProductID).first()
    print(order_to_be_removed)
    db.session.delete(order_to_be_removed)
    db.session.commit()
    return jsonify({"Msg": "Order successfully removed from cart"})

@app.route('/changeQuantity', methods=['POST'])
def changeQuantity():
    data = request.get_json()
    print(data)
    ProductID = data.get("ProductID")
    CustomerID = data.get("user")
    Quantity = data.get("quantity")

    #query to get CARTID via join
    CartID = db.session.query(Cart).filter(Cart.CustomerID == CustomerID).first().CartID
    #print(CartID, ProductID)
    order_update = db.session.query(Orders).filter(Orders.CartID == CartID,
                                                   Orders.ProductID == ProductID).update({'Quantity': Quantity})
    db.session.commit()
    return jsonify({"Msg": "Quantity Successfully Updated"})


# Running app
if __name__ == '__main__':
    app.run(debug=True)