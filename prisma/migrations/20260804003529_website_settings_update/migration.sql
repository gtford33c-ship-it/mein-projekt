-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeTitle" TEXT NOT NULL DEFAULT 'TRINI Jugendtreff',
    "homeSubtitle" TEXT NOT NULL DEFAULT 'Gemeinsam erleben, gestalten und wachsen.',
    "homeImage" TEXT NOT NULL DEFAULT '',
    "aboutText" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "phone1" TEXT NOT NULL DEFAULT '',
    "phone2" TEXT NOT NULL DEFAULT '',
    "phone3" TEXT NOT NULL DEFAULT '',
    "phone4" TEXT NOT NULL DEFAULT '',
    "addressLine1" TEXT NOT NULL DEFAULT '',
    "addressLine2" TEXT NOT NULL DEFAULT '',
    "addressLine3" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "instagramUrl" TEXT NOT NULL DEFAULT '',
    "impressumText" TEXT NOT NULL DEFAULT '',
    "datenschutzText" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("address", "email", "homeImage", "homeSubtitle", "homeTitle", "id", "phone", "updatedAt") SELECT "address", "email", "homeImage", "homeSubtitle", "homeTitle", "id", "phone", "updatedAt" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
