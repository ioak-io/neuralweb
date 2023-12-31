# Neuralweb - Zettelkasten-inspired Note-Taking Platform

A dynamic note-taking system designed to foster idea connections through clusters. It harnesses artificial intelligence to intuitively link related notes, transforming information into a coherent network of interconnected ideas.

## Key Features

AI-driven Linking: Seamlessly connects related notes, leveraging advanced AI algorithms for effortless idea association.

Network Visualization: Offers a visually captivating experience by representing notes as nodes in a network graph, enabling users to grasp intricate relationships effortlessly.

Custom Metadata: Flexibility to incorporate custom metadata attributes, allowing users to personalize their organizational structure.

Robust Search: Empowers users with a powerful search function to swiftly navigate through their notes and clusters.

## Objective

The primary goal of this application is to serve as a personalized 'second brain,' visually mapping and organizing users' ideas in a spatial coordinate system. By sidestepping the limitations of the brain's temporal representation, our platform constructs a spatial representation based on idea relatedness. This fosters a more intuitive and interconnected approach to idea management.

## Vision

Our platform aims to revolutionize the way individuals manage and interact with their ideas, providing a digital landscape that mirrors the complexity and connectivity of the human thought process.


## Supported Node.js and npm Versions

This project is developed and tested with the following versions:

- Node.js: v20.0.0 or higher
- npm: v10.0.0 or higher

## Prerequisites and dependencies
- Neuralweb REST API service module (https://github.com/ioak-io/neuralweb-service)

## Installation

1. Clone the repository: `git clone https://github.com/ioak-io/neuralweb.git`
2. Navigate to the project directory: `cd neuralweb`
3. Install dependencies: `npm install`

## Usage

1. Run the development server: `npm start`
2. Open your browser and go to `http://localhost:3000` to view the app.
3. To simplify local development, the application is by default configured to connect to remote Authlite server for authentication. You may use below shared user credentials to sign in to the app. You can also choose to setup your own local version of Authlite by changing the configuration in .env files (but usually an overkill and unneccesary setup, if you are not making any changes to the authentication layer)
    - username: jane.doe@ioak.org
    - password: suddenlylastsummer
4. Create a new company to get started

## Dependency Updates

The dependencies in this project are regularly reviewed and updated. The last check for updated versions was performed on 29th Dec 2023.

To check for updates and update the dependencies, run the following command: `npm outdated`

## License

This project is licensed under the [MIT License](LICENSE).

The MIT License is a permissive open-source license that allows you to use, modify, and distribute the code, even for commercial purposes, provided you include the original copyright notice and the disclaimer of warranty.

For more information, see the [MIT License](LICENSE) file.
