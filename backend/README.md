# TaskForge backend starter

This folder contains the ASP.NET Core API starter and the local PostgreSQL setup. The frontend remains at the repository root.

## Tools installed

- .NET 10 SDK, selected because it is the current long-term support release.
- `dotnet-ef` 10.0.12, used later to create and apply Entity Framework migrations.
- Docker Desktop and Docker Compose for running PostgreSQL 18 locally.

## Start PostgreSQL

1. Open Docker Desktop and wait until it says the engine is running.
2. In PowerShell, from the repository root, run:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   Set-Location backend
   docker compose up -d
   docker compose ps
   ```

The database is available only on this computer at `localhost:5432`. The sample password is for local development only. The `.env` file is ignored by Git.

If Docker Desktop stays on “Starting,” restart Docker Desktop. This machine has WSL 2 enabled, but its Docker service did not start in the current session. If needed, open PowerShell as Administrator, run `Start-Service com.docker.service`, and reopen Docker Desktop.

To stop PostgreSQL while keeping its data, run `docker compose down` from `backend`. To delete the local database and all its data, run `docker compose down -v`.

## Run the API starter

From the repository root:

```powershell
Set-Location backend/TaskForge.Api
dotnet run
```

The starter is a basic API template. The next backend step is to add the TaskForge data model, EF Core context, Identity/JWT configuration, and API endpoints.

## Useful commands

```powershell
dotnet --version
dotnet ef --version
docker compose ps
```

The backend folder pins the .NET 10 SDK, so run .NET commands from inside `backend` or one of its subfolders.
