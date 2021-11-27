-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "PlayersPerRound" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "IsPlaying" BOOLEAN NOT NULL DEFAULT false;
