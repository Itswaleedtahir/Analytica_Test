
# Analytica_Test

**Analytica_Test** is a web application that integrates a React-based frontend with a Node.js and Express backend. The application is designed to be deployed on an AWS EC2 instance, with Nginx serving as a reverse proxy to manage requests between the frontend and backend.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Live Demo

Access the live application at: [Analytica_Test](http://35.173.213.241/)

## Features

- **Frontend**: Built with React, providing a responsive user interface.
- **Backend**: Developed using Node.js and Express, offering RESTful API endpoints.
- **Data Management**: Utilizes MongoDB for data storage.
- **Deployment**: Hosted on an AWS EC2 instance with Nginx as a reverse proxy.

## Project Structure

```bash
Analytica_Test/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    ├── build/
    ├── package.json
```

- **backend/**: Contains the server-side code, including controllers, models, and routes.
- **frontend/**: Contains the client-side code, including React components and static assets.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB instance
- AWS EC2 instance
- Nginx

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd Analytica_Test/backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:

   ```bash
   touch .env
   ```

   Add the following variables:

   ```env
   PORT=6001
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```


3. Build the frontend for production:

   ```bash
   npm run build
   ```

## Configuration

### Nginx Configuration

Configure Nginx to serve the React frontend and proxy API requests to the backend. Update the Nginx configuration file (e.g., `/etc/nginx/nginx.conf`):

```nginx
server {
    listen 80;
    server_name _;

    root /path_to_project/Analytica_Test/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:6001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

After updating the configuration, test and restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Deployment

1. **AWS EC2 Instance**: Set up an EC2 instance with the necessary security groups to allow HTTP (port 80) and your backend port (e.g., 6001).

2. **Environment Variables**: Ensure all necessary environment variables are set on the server.

3. **Process Management**: Use a process manager like PM2 to keep the backend server running:

   ```bash
   pm2 start app.js --name "backend"
   ```

4. **Nginx**: Ensure Nginx is installed and configured as per the [Nginx Configuration](#nginx-configuration) section.

## Usage

Once deployed, access the application via the EC2 instance's public IP address:

```
http://35.173.213.241/
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
