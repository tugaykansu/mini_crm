
## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Paths

/users: User List. \
    filter params: ?name=substr&email=substr&role=owner|admin|user&active=true|false

/users/add-user: Add User Modal on top of User List \
/users/filter-users: Filter Users Modal on top of User List \
/users/:id: Details of user with id 


