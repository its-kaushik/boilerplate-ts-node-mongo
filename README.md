# Boilerplate service

This is a boilerplate service, from which one can draw out new projects.

## The tech stack

We are using following things

1. **ExpressJS**: the web framework
2. **JOI**: the validation framework
3. **Typescript**: for type checking
4. **Mocha & Chai**: for unit testing
5. **Prettier**: for formatting the code
6. **ESLint**: for linting and code quality maintainence
7. **Nodemon**: for development purposes
8. **Docker**: for ease of setup
9. **Pre-Commit**: for pre-commit hooks

## Steps to customize it according to the project

1. Clone this repository on your system
2. Change the name of the project in **package.json**
3. Create a new repository on remote (github/gitlab, etc.)
4. Copy the SSH remote URL of the newly create remote repository
5. On your local, change the remotes to point to the newly created repository, by using the following command

```sh
git remote set-url origin <new-git-url>
```

## Project setup for development

In order to setup and run the project, you just need to install docker on your system.

Then, cd into your directory and run the following command

```sh
docker-compose up --build
```

This will run the required containers.

Next step is to run the script to generate public and private key-pairs for JWT token generation. The command is as follows:

**NOTE**: Before running this command, make sure you have a folder called **keys** in your root directory.

```sh
npm run generate-keys
```

This command will generate the keys and also, return secret on the console. Copy that, and save it in the **.env** file as **SECRET_KEY**.
