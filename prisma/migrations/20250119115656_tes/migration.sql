-- CreateTable
CREATE TABLE "Tab" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB,

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);
