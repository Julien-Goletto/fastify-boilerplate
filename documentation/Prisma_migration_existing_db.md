# Migrate existing db into prisma

## Initilize prisma
```zsh
npx prisma init --datasource-provider postgresql
```
Generates both .env file with DATABSE_URL and schema.prisma inside prisma folder.
Change DATABASE_URL to link to your existing db.

## Introspect the existing database and add a schema transcription out of it
[Introspection - Official doc](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgres)
```zsh
npx prisma db pull
```

## Initialize versionning
[Adding migrate - Official doc](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)
According to the official doc, this command line only should work... but it doesn't :
```zsh
prisma migrate dev --name initial-migration --create-only
```

To overcome this, you have to do it with a little more steps than expected :
```zsh
mkdir -p prisma/migrations/init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/init/migration.sql
npx prisma migrate resolve --applied init
npx prisma migrate dev
```
This lines create a migration manually and mark it as applied, then run migrate as expected.