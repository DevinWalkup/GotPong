/*
  Warnings:

  - You are about to drop the column `LastPlayed` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "CurrentRound" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "LastPlayed",
ADD COLUMN     "LastRoundWon" INTEGER;
