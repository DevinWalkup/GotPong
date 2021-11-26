-- CreateTable
CREATE TABLE "Game" (
    "GameId" TEXT NOT NULL,
    "GameName" TEXT NOT NULL,
    "GameCode" TEXT NOT NULL,
    "ViewWinsAsRomanNumerals" BOOLEAN NOT NULL,
    "CreateDate" TEXT,
    "UpdateDate" TEXT,
    "DeletedDate" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("GameId")
);

-- CreateTable
CREATE TABLE "Player" (
    "PlayerId" TEXT NOT NULL,
    "PlayerName" TEXT NOT NULL,
    "PlayerColor" TEXT NOT NULL,
    "Wins" INTEGER NOT NULL DEFAULT 0,
    "GameId" TEXT NOT NULL,
    "CreateDate" TEXT,
    "UpdateDate" TEXT,
    "DeletedDate" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("PlayerId")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game"("GameId") ON DELETE RESTRICT ON UPDATE CASCADE;
