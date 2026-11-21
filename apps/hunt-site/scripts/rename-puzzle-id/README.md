Note: You should manually check that API routes and special puzzle-specific databases still work.

1. Update `renaming.csv`.
2. Dry-run `./rename-folders.sh`. If that looks good, run `./rename-folders.sh --apply`.
3. Dry-run `./rename-files.sh`. If that looks good, run `./rename-files.sh --apply`.
4. Dry-run `./replace-slugs.sh`. If that looks good, run `./replace-slugs.sh --apply`. Warning: if this is kebab case, you might need to manually add quotes around the puzzle id if it is used as a key in a Typescript map.
5. Dry-run `./replace-titles.sh`. If that looks good, run `./replace-titles.sh --apply`.
6. Run `./generate-rename-db.sh`.
7. Copy `rename-db.sql` into the SQL console on the dev database. Click "Run All."
8. Copy `rename-db.sql` into the SQL console on the prod database. Click "Run All."
