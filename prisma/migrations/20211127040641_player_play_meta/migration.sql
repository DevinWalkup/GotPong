-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "IsUpNext" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "LastPlayed" TEXT;
