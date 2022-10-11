-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "released_on" TIMESTAMPTZ(6) NOT NULL,
    "background_image" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_has_genre" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "game_has_genre_pkey" PRIMARY KEY ("game_id","genre_id")
);

-- CreateTable
CREATE TABLE "game_has_platform" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "game_has_platform_pkey" PRIMARY KEY ("game_id","platform_id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_prioritized" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "review_pkey" PRIMARY KEY ("game_id","user_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "pseudo" TEXT NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platform_name_key" ON "platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_pseudo_key" ON "user"("pseudo");

-- AddForeignKey
ALTER TABLE "game_has_genre" ADD CONSTRAINT "game_has_genre_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_has_genre" ADD CONSTRAINT "game_has_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_has_platform" ADD CONSTRAINT "game_has_platform_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_has_platform" ADD CONSTRAINT "game_has_platform_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

