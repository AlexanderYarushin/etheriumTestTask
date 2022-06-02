docker run --name psql-container -p 5432:5432 -e POSTGRES_PASSWORD=root -d postgres
docker cp ./init.sql psql-container:/docker-entrypoint-initdb.d/init.sql
