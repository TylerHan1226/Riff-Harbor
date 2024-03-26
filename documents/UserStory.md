
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
  - I can create a new instrument.
  - I can add a image for the each instrument in the create.

### Viewing a Instrument
- As a logged-in or logged-out user
  - I can view all the instruments  on the `/instruments` page.
  - I can view the instruments posted by me on the `/instruments/current` page.
  - I can view a selection of the instrument on the `/instruments/:instrumentId` page.

### Updating a Instrument
- As a logged-in user, when I'm on the `/instruments/:instrumentId/update`
  - I can click "Edit" on the instrument associated with the user to make changes to it.

### Deleting a Instrument
- When I'm on the `/instruments/:instrumentId`, I can click "Delete" to permanently delete a instrument I have created.


## Order Items
> Create, Read, Update, Delete
### Creating an Order Item
- As a logged-in user, I am able to create an Order Item for the instruments I want to buy.
- From either `/instruments` or `/instruments/:instrumentId`, click the "Add to Cart" button to navigate to add the item in your Order Item.

### Viewing an Order Item
- As a logged-in user, I can view all the current order items and my order history on the `/api/orderLists` page.
- As a logged-in user, I can view a specific Order Item (current or past) on the `/api/orderLists/:orderListId` page.

### Updating an Order Item
- As a logged-in user, when I open the Order Item `/api/orderLists/:orderListId`
  - I can change the amount of the order items I want to buy
  - After I clicked the "check out" button, it will ask me to confirm the subtotal

### Deleting an Order
- When I'm on the `/api/orderLists/:orderList`, I can either click "Checkout" to permanently remove all the order items in the cart, or change the quantity to 0 to remove the item.


## Search Filter
### Search Filter
- As a logged-in or logged-out user
  - I can search instruments  on the `/` page, based on its make and category.