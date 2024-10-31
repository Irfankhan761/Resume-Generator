# Resume Generator

This repository contains a Resume Generator built using a Docker-based setup. The project includes the following services:

- **Backend**: The backend service for the Resume Website.
- **Database (db)**: PostgreSQL database service.
- **pgAdmin**: Database management tool for PostgreSQL.
- **Website UI**: The frontend service for the Website.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Make a single directory for the project and required repository inside that folder which contains sub directory for each modules.

1. **Clone the docker and services repositories**:

   ```sh
   mkdir resume
   cd resume
   git clone https://github.com/Irfankhan761/Resume-Generator.git
   ```

2. **Build and Start the Services**:

   ```sh
   cd resume-docker
   docker-compose up --build
   ```

3. **Access the Services**:

   - **Backend**: http://localhost:3333
   - **pgAdmin**: http://localhost:5050
     - Default Email: `admin@admin.com`
     - Default Password: `admin`
   - **CMS UI**: http://localhost:5173

4. **Run DB Migration**
   Run the database migration

   ```sh
   docker-compose exec backend node ace migration:run
   ```

## Services Configuration

### Backend

- **Build Context**: `../resume-backend`
- **Dockerfile**: `Dockerfile`
- **Ports**: `3333:3333`
- **Volumes**:
  - `../resume-backend:/usr/src/app`
  - `backend-data:/usr/src/app/node_modules`
- **Environment Variables**:
  - `DB_CONNECTION=pg`
  - `DB_HOST=db`
  - `DB_PORT=5432`
  - `DB_USER=cms_user`
  - `DB_PASSWORD=password`
  - `DB_DATABASE=resume_website`

### Database (db)

- **Image**: `postgres:13`
- **Restart Policy**: `always`
- **Environment Variables**:
  - `POSTGRES_USER: resume_user`
  - `POSTGRES_PASSWORD: password`
  - `POSTGRES_DB: resume_website`
- **Volumes**:
  - `pgdata:/var/lib/postgresql/data`

### pgAdmin

- **Image**: `dpage/pgadmin4`
- **Restart Policy**: `always`
- **Ports**: `5050:80`
- **Environment Variables**:
  - `PGADMIN_DEFAULT_EMAIL: admin@admin.com`
  - `PGADMIN_DEFAULT_PASSWORD: admin`
  - `PGADMIN_CONFIG_SERVER_MODE: "False"`
- **Volumes**:
  - `pgadmin-data:/var/lib/pgadmin`
  - `./dbservers.json:/pgadmin4/servers.json`

### CMS UI

- **Build Context**: `../resume-website`
- **Dockerfile**: `Dockerfile`
- **Ports**: `5173:5173`
- **Volumes**:
  - `../resume-website:/app`
  - `resume-ui-data:/app/node_modules`
- **Command**: `["npm", "run", "start"]`
- **Restart Policy**: `always`

## Volumes

- **pgdata**: Stores the PostgreSQL data.
- **pgadmin-data**: Stores the pgAdmin data.
- **backend-data**: Node Modules for the Backend service.
- **website-ui-data**: Node modules for the Website UI service.

## Stopping the Services

To stop the services, run:

```sh
docker-compose down
```

## Additional Notes

- Ensure that the relative paths for the volumes are correctly set according to your directory structure.
- Modify the environment variables as per your requirements.

## License

Work in progress
