
<!-- [![aa-projects-munch.png](https://i.postimg.cc/pV7s4077/aa-projects-munch.png)](https://postimg.cc/DmrQbc7d) -->
# RIFF HARBOR
  - Welcome to Riff Harbor – your premier destination for all things music! Our mission is to assist you in discovering the ideal instrument that perfectly complements your individual style and sonic expression. Let us guide you as you embark on your musical journey.

  - Feature List:
    - Shopping (Orders & Checkout) 
      - Order List - CRUD
    - Instruments - CRUD
      - Instrument images
    - Search filter

  - Customers can quickly find products by name via searchbox, or sort the products by categories. The customer can easily add or bookmark a product from any page, simple user interface to update each product quantity and checkout. Besides that, each product can be magnified for details view.

## URL
my url

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
  - Add images for the instruments you've created

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
