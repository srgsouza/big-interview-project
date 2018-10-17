# Best in Grow Interview Project

The BiG interview project is a simple task (ToDo) implementation. You are to implement the backend API according to the specification as well as the front end web interface that uses the API.

The purpose of this test is to ensure understanding of the end-to-end nature of full stack cloud application development.

Instructions:
* Please use commits and commit messages to indicate when you are starting and when you are completed.
* There is no time limit for the test. Use your own discretion to determine how much time to spend. We will take into account the time spent when evaluating the code.

## API Server

A Node.js (with express) skeleton project is provided as a starting point for the server. If you choose to use another technology stack to implement the API server you will need to start from scratch.

To start the server run `npm start`

To test the running server run `curl http://localhost:8080/api`

Database design is beyond the scope of the project. Please mock the database interface and depend on the API accessing data that is stored in memory.

### API
A very simple RESTful API will provide all of the functionality needed to build the web client.

#### Task
Fields:
* string -- The task content that indicates what needs to be done
* boolean -- Whether or not the task has been completed

#### POST /tasks
Create a new task
#### GET /tasks
Return a list of all tasks. This endpoint must provide a way to scope the response to a single user.
#### GET /tasks/:task_id
Return a specific task
#### PUT /tasks/:task_id
Update a specific task
#### DELETE /tasks/:task_id
Delete a specific task

## Web Client

A React skeleton project is provided as a starting point for the client. If you choose to use another technology stack to implement the web client you will need to start from scratch.

To start the development server run `npm start`

### Features

* There should be some way of distinguishing users so that each visitor to the page has a different set of of tasks. This can be very naive and does not need a complicated user authentication scheme.
* The user should see a list of all tasks at the initial view
* The user should be able to add new tasks to the list
* The user should be able to complete and un-complete tasks in the list
* The user should be able to delete tasks from the list
* The user should be able to change the content of the task
