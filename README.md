![image](https://github.com/user-attachments/assets/ffee357f-d94e-4c1d-9675-63dbe26a750d)

# Web-based Travlr Getaways Application
# **CS465 Project Software Design Document**

## Table of Contents
Contents
[**CS 465 Project Software Design Document**](#cs-465-project-software-design-document)

[Table of Contents](#table-of-contents)

[Document Revision History](#document-revision-history)

[Executive Summary](#executive-summary)

[Design Constraints](#design-constraints)

[System Architecture View](#system-architecture-view)

[Component Diagram](#component-diagram)

[Sequence Diagram](#sequence-diagram)

[Class Diagram](#class-diagram)

[API Endpoints](#api-endpoints)

[The User Interface](#the-user-interface)

## [Document Revision History](#document-revision)
| Version | Date       | Author         | Comments                                                                          |
|---------|------------|----------------|-----------------------------------------------------------------------------------|
| 1.0     | 09/22/24   | David Ruth     | Updated Executive Summary, Design Constraints, and Component Diagram description. |
| 1.1     | 10/24/24   | David Ruth     | Updated Sequence Diagram, Class Diagram, API Endpoints, User Interface.           |
| 2.0     | 10/25/24   | David Ruth     | Document Complete.                                                                |

## [Executive Summary]
The client Travlr Getaways is requesting a travel booking site for customers to book travel packages. Customers should have the ability to create an account, search for travel packages by location and price point, view their itineraries, and book reservations with the travel agency. The client also requests an admin-only site where their administrators can maintain a customer base, available travel packages, and pricing for each item and package.

The proposed solution is a full-stack web application using MEAN stack. The development environment will consist of the Node.js server and Express framework. The back-end will consist of the server containing the MongoDB NoSQL database. The MongoDB database will hold the required data, such as travel packages, pricing, and travel booking trips. The front-end consists of a customer-facing website using HTML, CSS, Javascript, and Angular. Customers can use this website for all the require needs, such as booking reservations. Administrator single-page applications (SPA) will use Angular to maintain the customer base and travel packages.

## [Design Constraints]
Using the MEAN stack for the development of this full-stack web application can have several constraints. MongoDB is a great choice for the database, but will require maintenance upkeep and data redundancy. If the database’s indexes are not properly implemented or have errors, the performance will lower and require fixing the errors before it can be restored. MongoDB has been documented to duplicate data as well, leading to data redundancy. This happens because MongoDB lacks certain functionalities like joins. Without these, more storage is required and can become a problem long-term.

Node.js also suffers performance on CPU-intensive tasks due to its single-thread event loop. Handling multiple instances can be handled with other tools and this will relieve some of the performance issues.

There are security vulnerabilities with the use of MEAN stack. Javascript is vulnerable to injection attacks for instance and will require using policies such as Content Security Policy. MongoDB is also vulnerable to injection attacks.

The use of MEAN stack also requires technical knowledge to further scale or make modifications. The different multiple environments, such as Node, Angular, and MongoDB, require dependencies and compatibility are up to date and managed.

## [System Architecture View]

### Component Diagram

![image](https://github.com/user-attachments/assets/ead57597-cef1-4e32-910c-17ab8162a5b4)

The Client represents the front-end of the web-based application. The Client Session is the connection to the Server where data can be received and sent. The Angular.js framework provides the interactions between the components of the Client. The Web Browser will display the interactive web-pages to the user. The Traveler Portfolio contains the organization of information to be displayed through the Web Browser. This consists of graphics pulled from the Graphic Library and information pulled from the Database.

The Database is a MongoDB, NoSQL database containing the information needed for the Client, such as travel itineraries, pricing, etc.

The Sever is a Node.js server and represents the back-end of the web-based application. The Express framework provides the interactions from Server to Front-End. The Authentication Server validates users and the Client Session proceeds to connect to the Server Session. Mongoose ODM handles the storing and retrieving of data to the MongoDB database.

### Sequence Diagram

![image](https://github.com/user-attachments/assets/3d1d915e-1d76-4b2f-9072-95e047c3328c)

Referring to the sequence diagram above, the web application follows a structure flow to process and respond to the user’s interactions. The user inputs a route on the Angular client-side, which is then processed by the browser to return a view/template. The request also interacts with the Angular client-side controller, which will handle the navigation and HTTP requests. It checks the route and sends an HTTP request to the server-side.

On the Express server-side, the HTTP requests are received and routed to the server controllers. These handle data requests from the MongoDB database.

The MongoDB database holds data on trips, admins, and users. The server controllers requests data and the database returns an JSON package back.

These JSON packages are sent through the server, formatted, and to the client-side Angular client. It is then rendered to the SPA with the components and services.

## [Class Diagram]

![image](https://github.com/user-attachments/assets/f823da1a-a5bb-4228-ae0e-7e60decd7252)

Itinerary: Aggregates to multiple classes for booking information. These attributes are ‘totalprice’, ‘totalmiles’, and ‘stopover’.

MemberAccount: Contains attributes for member accounts. These are member numbers, frequent airlines, member status, and member club.

Membership_Admin: Handles MemberAccount with various functions. These are crediting points, getting points, and validating membership.

Traveler_Agent: Handles booking process with hotel, flight, and cruise services. These functions are booking packages, flights, hotels, and cruises.

TravelerInfo: Contains attributes for travelers. This is through the companion number.

TripInfo: Contains attributes for trips. These are starting date, returning date, origin, and destination of a trip.

CruiseInfo: Contains attributes for cruises. These are the name, cabin type, and price for a cruise seat.

FlightInfo: Contains attributes for flights. These are the name, seat class, and price for a flight seat.

HotelInfo: Contains attributes for hotels. These are the name, star, location, rooms requested, and price for hotels.

HotelBooking: Contain functions for booking hotels. It facilitates the booking through the traveler and hotel info.

FlightBooking: Contains functions for booking flights. It facilitates the booking through the traveler and flight info.

CruiseBooking: Contains functions for booking cruises. It facilitates the booking through the traveler and cruise info.

## [API Endpoints]

| **Method** | **Purpose**                     | **URL**                            | **Notes**                                                                                |
|------------|---------------------------------|------------------------------------|------------------------------------------------------------------------------------------|
| **GET**    | Retrieve list of blogs          | /api/blogs                         | Returns all active blog posts                                                            |
| **GET**    | Retrieve list of ‘latest’ posts | /api/latest                        | Returns all active ‘latest’ posts                                                        |
| **GET**    | Retrieve list of meals          | /api/meals                         | Returns all active meals                                                                 |
| **GET**    | Retrieve list of news posts     | /api/news                          | Returns all active news posts                                                            |
| **GET**    | Retrieve list of rooms          | /api/rooms                         | Returns all active rooms                                                                 |
| **GET**    | Retrieve list of testimonials   | /api/testimonials                  | Returns all active testimonials                                                          |
| **GET**    | Retrieve list of trips          | /api/trips                         | Returns all active trips                                                                 |
| **GET**    | Retrieve single blog            | /api/blogs/:blogCode               | Returns single blog instance, identified by the title passed to the request URL          |
| **GET**    | Retrieve single ‘latest’ post   | /api/latest/:latestCode            | Returns single ‘latest’ post instance, identified by the title passed to the request URL |
| **GET**    | Retrieve single meal            | /api/meals/:mealCode               | Returns single meal instance, identified by the mealName passed to the request URL       |
| **GET**    | Retrieve single news post       | /api/news/:newsCode                | Returns single poster, identified by the posterName passed to the request URL            |
| **GET**    | Retrieve single room            | /api/rooms/:roomCode               | Returns single room instance, identified by the name passed to the request URL           |
| **GET**    | Retrieve single testimonial     | /api/testimonials/:testimonialCode | Returns single testimonial instance, identified by the person passed to the request URL  |
| **GET**    | Retrieve single trip            | /api/trips/:tripCode               | Returns single trip instance, identified by the code passed to the request URL           |
| **POST**   | Create single blog              | /api/blogs/                        | Creates single blog instance                                                             |
| **POST**   | Create single ‘latest’ post     | /api/latest/                       | Creates single ‘latest’ post instance                                                    |
| **POST**   | Create single meal              | /api/meals/                        | Creates single meal instance                                                             |
| **POST**   | Create single news post         | /api/news/                         | Creates single poster                                                                    |
| **POST**   | Create single room              | /api/rooms/                        | Creates single room instance                                                             |
| **POST**   | Create single testimonial       | /api/testimonials/                 | Creates single testimonial instance                                                      |
| **POST**   | Create single trip              | /api/trips/                        | Creates single trip instance                                                             |
| **PUT**    | Update single blog              | /api/blogs/:blogCode               | Updates single blog instance, identified by the title passed to the request URL          |
| **PUT**    | Update single ‘latest’ post     | /api/latest/:latestCode            | Updates single ‘latest’ post instance, identified by the title passed to the request URL |
| **PUT**    | Update single meal              | /api/meals/:mealCode               | Updates single meal instance, identified by the mealName passed to the request URL       |
| **PUT**    | Update single news post         | /api/news/:newsCode                | Updates single poster, identified by the posterName passed to the request URL            |
| **PUT**    | Update single room              | /api/rooms/:roomCode               | Updates single room instance, identified by the name passed to the request URL           |
| **PUT**    | Update single testimonial       | /api/testimonials/:testimonialCode | Updates single testimonial instance, identified by the person passed to the request URL  |
| **PUT**    | Update single trip              | /api/trips/:tripCode               | Updates single trip instance, identified by the code passed to the request URL           |
| **DELETE** | Delete single blog              | /api/blogs/:blogCode               | Deletes single blog instance, identified by the title passed to the request URL          |
| **DELETE** | Delete single ‘latest’ post     | /api/latest/:latestCode            | Deletes single ‘latest’ post instance, identified by the title passed to the request URL |
| **DELETE** | Delete single meal              | /api/meals/:mealCode               | Deletes single meal instance, identified by the mealName passed to the request URL       |
| **DELETE** | Delete single news post         | /api/news/:newsCode                | Deletes single poster, identified by the posterName passed to the request URL            |
| **DELETE** | Delete single room              | /api/rooms/:roomCode               | Deletes single room instance, identified by the name passed to the request URL           |
| **DELETE** | Delete single testimonial       | /api/testimonials/:testimonialCode | Deletes single testimonial instance, identified by the person passed to the request URL  |
| **DELETE** | Delete single trip              | /api/trips/:tripCode               | Deletes single trip instance, identified by the code passed to the request URL           |

## [The User Interface]

### Main Page
Figure 1: Main Page, Logged Out
![image](https://github.com/user-attachments/assets/de114674-8c70-4d85-915a-d0b35b71cd49)

Figure 2: Log In Page
![image](https://github.com/user-attachments/assets/c67e0050-900f-4499-b1b8-91a2dde86109)

Figure 3: Main Page, Logged In
![image](https://github.com/user-attachments/assets/de7be628-1197-4c5e-9798-4c2367370777)

### Add Trip
Figure 4: Add Trip Page
![image](https://github.com/user-attachments/assets/9ffd2b74-f6cb-456e-94dd-ba94797e5a68)

Figure 5: Main Page With New Trip
![image](https://github.com/user-attachments/assets/cfbb1a7c-6dcb-4875-a813-4d64c068f294)

### Edit Trip
Figure 6: Edit Trip Page
![image](https://github.com/user-attachments/assets/5e2f1fc0-23c7-440c-ad67-be4aa7c31028)

Figure 7: Main Page With Edited Trip
![image](https://github.com/user-attachments/assets/bc8e0ab0-3552-40cb-a4b0-c0fa4b9aeee6)

## Summary of Angular Project Structure
Compared to the Express project structure, the Angular project structure is more dynamic and component-based front-end. Express is known for being focused around the API back-end. The directory of Angular contains folders for components, services, modules, and more. These different contained piece is a building block to provide the Angular application’s functionalities. The router module helps manage the connections between. This allows multiple components to run through single services.

The SPA differs from a simple web app because the interactions are handled client-side. With a simple web app, the page is reloaded upon every request. Angular allows these requests to happen dynamically to be called to the SPA, or single page application. Users will feel the SPA is more responsive and fluid. It also has better performance in navigation. With each component being contained, they can be called and reused.

The testing process to confirm the SPA’s functionality involves testing the individual GET and PUT functions with the API and database. This can involve the use of Postman and MongoDB to test HTTP requests such as GET, PUT, POST, etc. Tests can also be written for each function and service to generate logs through ‘console.log()’ and ‘.json({“message”:””}).
