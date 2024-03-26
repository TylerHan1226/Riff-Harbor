
# RIFF HARBOR
  - Welcome to Riff Harbor – your premier destination for all things music! Our mission is to assist you in discovering the ideal instrument that perfectly complements your individual style and sonic expression. Let us guide you as you embark on your musical journey.

## URL
my url

## Data Schema
![data schema](./documents/Riff_Harbor_DB_schema.png)

## Feature List
  - Shopping (Orders & Checkout) 
    - Order List - CRUD
  - Instruments - CRUD
    - Instrument images
  - Search filter

# API Documentation
## USERS

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/auth
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,"
        }
      }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": null
      }
    ```

### Log In a User

Logs in a user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": "john1.smith@gmail.com",
        "password": "password"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,"
        }
      }
    ```

* Error response: Inccorect Password
  * Status code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": [
          "Password was incorrect."
        ]
      }
    ```

* Error response: Bad request
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required" || "Email provided not found."
        ],
        "password": [
          "This field is required" || "Password was incorrect."
        ]
      }
    ```

### Log Out a User

Logs out the current user, ending their session.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/auth/logout
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "User logged out"
      }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": "john1.smith@gmail.com",
        "username": "JohnSmith",
        "password": "password"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,"
        }
      }
    ```

* Error response: User already exists with the specified email or username
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": [
        "Email address is already in use."
      ],
      "username": [
        "Username is already in use."
      ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required" || "Email is invalid."
        ],
        "password": [
          "This field is required" || "Password must be at least 6 characters."
        ],
        "username": [
          "This field is required" || "Username must be at least 4 characters."
        ]
      }
    ```


## Instruments
### Get all instruments
* Require Authentication: False
* Request
  * Method: GET
  * URL: /api/instruments
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "Products": [
          {
            "id": 1,
            "seller_id": 1,
            "model": "Fender American Vintage II 1951 Telecaster",
            "color": "Butterscotch Blonde",
            "category": "Electric Guitar",
            "price": 2449.99,
            "details": "The Fender American Vintage II 1951 Telecaster is a premium electric guitar, meticulously crafted to capture the essence of the original 1951 Telecaster. With its vintage style and iconic sound, it's a true tribute to Fender's historic legacy.",
            "body": "Maple",
            "fingerBoard": "Maple",
            "make": "Fender",
            "is_used": false,
            "image_url": "url.png",
            "createdAt": "2024-01-20 20:00:00",
            "updatedAt": "2024-01-20 20:20:20",
          }
        ]
      }
    ```


### Get all instruments posted by current user
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/instruments/current
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "Products": [
          {
            "id": 1,
            "seller_id": 1,
            "model": "Fender American Vintage II 1951 Telecaster",
            "color": "Butterscotch Blonde",
            "category": "Electric Guitar",
            "price": 2449.99,
            "details": "The Fender American Vintage II 1951 Telecaster is a premium electric guitar, meticulously crafted to capture the essence of the original 1951 Telecaster. With its vintage style and iconic sound, it's a true tribute to Fender's historic legacy.",
            "body": "Maple",
            "fingerBoard": "Maple",
            "make": "Fender",
            "is_used": false,
            "image_url" : "img.png"
            "createdAt": "2024-01-20 20:00:00",
            "updatedAt": "2024-01-20 20:20:20",
          }
        ]
      }
    ```
* Error response: Couldn't find a instrument with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:


### Get a instrument by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/instruments/:instrumentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "id": 1,
        "seller_id": 1,
        "model": "Fender American Vintage II 1951 Telecaster",
        "color": "Butterscotch Blonde",
        "category": "Electric Guitar",
        "price": 2449.99,
        "details": "The Fender American Vintage II 1951 Telecaster is a premium electric guitar, meticulously crafted to capture the essence of the original 1951 Telecaster. With its vintage style and iconic sound, it's a true tribute to Fender's historic legacy.",
        "body": "Maple",
        "fingerBoard": "Maple",
        "make": "Fender",
        "is_used": false,
        "image_url" : "img.png"
        "createdAt": "2024-01-20 20:00:00",
        "updatedAt": "2024-01-20 20:20:20",
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

### Create a instrument
* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/products
  * Body:
    ```json
      {
        "model": "Fender American Ultra Stratocaster HSS",
        "color": "Arctic Pearl",
        "category": "Electric Guitar",
        "price": 2249.99,
        "details": "Iconic for 60+ years, the Fender American Ultra Strat HSS offers precision, performance, and tone. Modern design, Ultra Noiseless pickups, and versatile sound.",
        "body": "Alder",
        "fingerBoard": "Maple",
        "make": "Fender",
        "is_used": true,
        "image_url" : "img.png"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "id": 2,
        "seller_id": 1,
        "model": "Fender American Ultra Stratocaster HSS",
        "color": "Arctic Pearl",
        "category": "Electric Guitar",
        "price": 2249.99,
        "details": "Iconic for 60+ years, the Fender American Ultra Strat HSS offers precision, performance, and tone. Modern design, Ultra Noiseless pickups, and versatile sound.",
        "body": "Alder",
        "fingerBoard": "Maple",
        "make": "Fender",
        "is_used": true,
        "image_url" : "img.png",
        "createdAt": "2024-01-20 20:00:00",
        "updatedAt": "2024-01-20 20:20:20",
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "model": [
          "This field is required." || "Invalid category! Here is a list of allowed categories: ['Groceries', 'Electronics', 'Books', 'Beauty & Health', 'Handmade']"
        ],
        "color": [
          "This field is required." || "Color must be under 50 characters"
        ],
        "category": [
          "This field is required." || "Category must be one of the following: Electric Guitar, Acoustic Guitar, Bass, Drum, Amp, or Effects."
        ],
        "price": [
          "This field is required." || "Price must be greater than 0"
        ],
        "details": [
          "This field is required." || "Details must be greater than 25 characters"
        ],
        "body": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "fingerBoard": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "make": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "used": [
          "This field is required."
        ],
        "image_url": [
          "This field is required."
        ]
      }
    ```

### Update a instrument
* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/instruments/:instrumentId
  * Body:
    ```json
      {
        "model": "Fender American Ultra Stratocaster HSS NEW!",
        "color": "Arctic Pearl",
        "category": "Electric Guitar",
        "price": 3339.99,
        "details": "Iconic for 60+ years, the Fender American Ultra Strat HSS offers precision, performance, and tone. Modern design, Ultra Noiseless pickups, and versatile sound.",
        "body": "Alder",
        "fingerBoard": "Maple",
        "make": "Fender",
        "is_used": false,
        "image_url" : "img.png"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "id": 2,
        "seller_id": 1,
        "model": "Fender American Ultra Stratocaster HSS",
        "color": "Arctic Pearl",
        "category": "Electric Guitar",
        "price": 2249.99,
        "details": "Iconic for 60+ years, the Fender American Ultra Strat HSS offers precision, performance, and tone. Modern design, Ultra Noiseless pickups, and versatile sound.",
        "body": "Alder",
        "fingerBoard": "Maple",
        "make": "Fender",
        "is_used": true,
        "image_url" : "img.png",
        "createdAt": "2024-01-20 20:00:00",
        "updatedAt": "2024-01-20 20:20:20",
      }
    ```

* Error response: Instrument not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Instrument couldn't be found"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "model": [
          "This field is required." || "Invalid category! Here is a list of allowed categories: ['Groceries', 'Electronics', 'Books', 'Beauty & Health', 'Handmade']"
        ],
        "color": [
          "This field is required." || "Color must be under 50 characters"
        ],
        "category": [
          "This field is required." || "Category must be one of the following: Electric Guitar, Acoustic Guitar, Bass, Drum, Amp, or Effects."
        ],
        "price": [
          "This field is required." || "Price must be greater than 0"
        ],
        "details": [
          "This field is required." || "Details must be greater than 25 characters"
        ],
        "body": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "fingerBoard": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "make": [
          "This field is required." || "Details must be under 25 characters"
        ],
        "used": [
          "This field is required."
        ],
        "image_url": [
          "This field is required."
        ]
      }
    ```

### Delete a instrument by id

Delete an existing instrument by id.

* Require Authentication: True
* Require Authorization: True. (Must be the seller of the instrument)
* Request
  * Method: DELETE
  * URL: /api/instrument/:instrumentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully deleted instrument"
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Instrument couldn't be found"
      }
    ```


## Users
### Sign Up
- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
- When I'm on the `/signup` page:
  - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
  - I would like the website to log me in upon successful completion of the sign-up form, so that I can seamlessly access the site's functionality.
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (except my password), so that I can try again without needing to refill forms I entered valid data into.

### Log in
- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
- When I'm on the `/login` page:
  - I would like to be able to enter my email and password on a clearly laid out form.
  - When I enter invalid data on the log-up form:
    - I would like the website to inform me of the validations I failed to pass and repopulate the form with my valid entries (except my password), so that I can try again without needing to refill forms I entered valid data into.

### Demo User
- As an unregistered and unauthorized user, I would like an easy-to-find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
- When I'm on either the `/signup` or `/login` pages:
  - I can click on a Demo User button to log me in and allow me access as a normal user, so that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out
- As a logged-in user, I want to log out via an easy-to-find log out button on the navigation bar.
- While on any page of the site:
  - I can log out of my account and be redirected to the landing change.
  - So that I can easily log out to keep my information secure.


## Instrument
> Create, Read, Update, Delete
### Creating a Instrument
- As a logged-in user, I am able to create a new instrument for sell by providing relevant information such as name, price, details, etc.
- From any page, click the "Sell Your Gear" button to navigate to `/instruments/new`. Here, owners can:
  - Create a new instrument.
  - Add a images for the instrument in the create form.
  - Navigate to instrument detail page to add more images

### Viewing a Instrument
- As a logged-in or logged-out user
  - I can view all the stores  on the `/instruments` page.
  - I can view a selection of the store on the `/instruments/:instrumentId` page.
  <!-- - I can see the images of a store `/instruments/:instrumentId/images` -->

### Updating a Instrument
- As a logged-in user, when I'm on the `/instruments/:instrumentId`
  - I can click "Edit" on the instrument associated with the user to make changes to it.

### Deleting a Instrument
- When I'm on the `/instruments/:instrumentId`, I can click "Delete" to permanently delete a instrument I have created.


## Order List
> Create, Read, Update, Delete
### Creating a Order List
- As a logged-in user, I am able to create a order list for the instruments I want to buy.
- From either `/instruments` or `/instruments/:instrumentId`, click the "Add to Cart" button to navigate to add the item in your order list. Here, owners can:

### Viewing a Order List
- As a logged-in user, I can view all the items in my cart on the `user/:userId/order_list` page.
- You can see order history on the `user/:userId/order_history` page

### Updating a Order List
- As a logged-in user, when I'm on the `user/:userId/order_list`
  - I can change the amount of the item I want to buy
  - After I clicked the "check out" button, it will charge me the amount of the subtotal

### Deleting a Instrument
- When I'm on the `user/:userId/order_list`, I can click "Delete" to permanently delete a instrument I have added to the cart.


## Search
<!-- > Create, Read, Update, Delete -->
### Search
- As a logged-in or logged-out user
  - I can search instruments  on the `/` page, based on its make and category.



