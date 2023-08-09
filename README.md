# Laravel Chat with Vue 3

![Project Preview](./preview.png)

Laravel Chat with Vue 3 is a real-time chat application built using Laravel for the backend and Vue 3 for the frontend. This project allows users to engage in real-time conversations and exchange messages seamlessly.

## Features

- Real-time messaging with WebSocket technology.
- User authentication and registration.
- Seamless integration of Laravel and Vue 3.
- User-friendly interface for easy communication.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP**: [Install PHP](https://www.php.net/manual/en/install.php) (>= 8.1) on your system.
- **Composer**: [Install Composer](https://getcomposer.org/download/) for managing PHP dependencies.
- **Node.js and npm**: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to manage frontend assets.
- **Pusher Account**: Create a [Pusher](https://pusher.com/) account and obtain your API keys.
- **Laravel Echo**: Familiarize yourself with [Laravel Echo](https://laravel.com/docs/8.x/broadcasting) for real-time events.
### 
## Installation

1. Clone the repository: `git clone https://github.com/abdimed/laravel-chat-vue3.git`
2. Navigate to the project directory: `cd laravel-chat-vue3`
3. Install backend dependencies: `composer install`
4. Install frontend dependencies: `npm install`
5. Create a copy of the `.env.example` file and rename it to `.env`
6. Configure your database and other environment variables in the `.env` file
7. Set up your Pusher account and update the `.env` file with Pusher credentials
8. Generate application key: `php artisan key:generate`
9. Run database migrations: `php artisan migrate`
10. Build the frontend assets: `npm run dev`
11. Start the development server: `php artisan serve`
12. Visit [http://localhost:8000](http://localhost:8000) in your browser to access the application.

## Usage

1. Register and log in to the application.
2. Start sending and receiving real-time messages with other users using Pusher.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a pull request.
